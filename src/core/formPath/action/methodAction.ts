import { FormPath, GeneralField, isField } from "@formily/core";

const bothPathLimit = (field: GeneralField, path: string) => {
    const value = isField(field) ? field.value : '';
    const group = [value, path].filter(value => value ? FormPath.parse(value).isMatchPattern : false);

    return [value, group.length === 2 ? '❌ 至少需要有 1 个是数据路径' : ''];
};

const dataPathLimit = (field: GeneralField, path: string) => {
    if (!isField(field)) return ;
    if (FormPath.parse(path).isMatchPattern) {
        field.value =  '❌ 只能用于“数据路径”语法，当前路径是“匹配路径”语法';
        return ;
    }
    return field;
};

const groupPathLimit = (field: GeneralField, path: string) => {
    const group: string[] = [];
    let error = '';
    
    field.query(path).forEach(item => {
        const [value, feedback] = subPathLimit(item);
        if (feedback !== '') error = feedback;
        group.push(value);
    });
    return [group, error] as const;
};

const jsonLimit = (value: string): [object|undefined, string] => {
    try {
        return [JSON.parse(value), ''];
    } catch {
        return [void 0, '"❌ 不是有效的 JSON"'];
    }
};

const nodeValue = (field: GeneralField, name: string) => {
    const array: string[] = [];
    field.query(`.${name}.${name}-array.*`).forEach(item => isField(item) && !!item.value && array.push(item.value));

    return [array, String(field.query(`.${name}-input`).value())] as const;
};

const spliceValue = (field: GeneralField, path?: string) => {
    const index: number[] = [];
    const array: string[] = [];

    field.query(`${path||''}.splice-index.*`).forEach(item => isField(item) && index.push(parseInt(item.value)||0));
    field.query(`${path||''}.splice-array.*`).forEach(item => isField(item) && !!item.value && array.push(item.value));

    return [index, array] as const;
};

const subPathLimit = (field: GeneralField) => {
    const value = isField(field) ? String(field.value) : '';
    if (value !== '') {
        try {
            if (FormPath.parse(value).isMatchPattern) {
                return [value, '❌ 子路径只能用于“数据路径”语法，当前路径是“匹配路径”语法'];
            }
        } catch {
            return [value, '❌ 子路径解析失败，请检查语法是否正确'];
        }
    }
    return [value, ''];
};

const extraMethod: Record<string, ActionMethod> = {
    action_concat: (field, path) => {
        const [array, value] = nodeValue(field, 'concat');
        field.setDecoratorProps({ 
            extra: `FormPath.parse('${path}').concat(${array.length ? JSON.stringify(array) + ', ' : ''}'${value}');`, 
            feedbackError: FormPath.parse(path).isMatchPattern,
        });
    },
    action_deleteIn: (field, path) => {
        const input = String(field.query(".deleteIn.deleteIn-input").value()||"");
        const [data, feedback] = jsonLimit(input);

        field.setDecoratorProps({ 
            extra: `const target = ${feedback ? input : JSON.stringify(data, null, 2)};
FormPath.parse('${path}').deleteIn(target)`,
            feedbackError: feedback !== ''
        });
    },
    action_ensureIn: (field, path) => {
        const input = String(field.query(".ensureIn.ensureIn-input").get('value')||'');
        const value = String(field.query(".ensureIn.ensureIn-value").get('value')||'');

        const [data, feedback] = jsonLimit(input);
        field.setDecoratorProps({ 
            extra: `const target = ${feedback ? input : JSON.stringify(data, null, 2)};
FormPath.parse('${path}').ensureIn(target, '${value}')`,
            feedbackError: feedback !== ''
        });
    },
    action_existIn: (field, path) => {
        const input = String(field.query(".existIn.existIn-input").value()||"");
        const [data, feedback] = jsonLimit(input);

        field.setDecoratorProps({ 
            extra: `const target = ${feedback ? input : JSON.stringify(data, null, 2)};
FormPath.parse('${path}').existIn(target)`,
            feedbackError: feedback !== ''
        });
    },
    action_forEach: (field, path) => {
        field.setDecoratorProps({ 
            extra: `const keys = [];
FormPath.parse('${path}').forEach(key => keys.push(key));`,
            feedbackError: FormPath.parse(path).isMatchPattern
        });
    },
    action_getIn: (field, path) => {
        const input = String(field.query(".getIn.getIn-input").value()||"");
        const [data, feedback] = jsonLimit(input);

        field.setDecoratorProps({ 
            extra: `const target = ${feedback ? input : JSON.stringify(data, null, 2)};
FormPath.parse('${path}').getIn(target)`,
            feedbackError: feedback !== ''
        });
    },
    action_includes: (field, path) => {
        field.query('.includes.includes-input').take(input => {
            const [subpath, feedback] = subPathLimit(input);
            field.setDecoratorProps({ 
                extra: `FormPath.parse('${path}').includes('${subpath}');`, 
                feedbackError: feedback !== ''
            });
        });
    },
    action_map: (field, path) => {
        field.setDecoratorProps({ 
            extra: `FormPath.parse('${path}').map(key => \`\${key}~\`);`, 
            feedbackError: FormPath.parse(path).isMatchPattern
        });
    },
    action_match: (field, path) => {
        field.query('.match.match-input').take(input => {
            const [value, feedback] = bothPathLimit(input, path);
            field.setDecoratorProps({ 
                extra: `FormPath.parse('${path}').match('${value}');`, 
                feedbackError: feedback !== ''
            });
        });
    },
    action_matchAliasGroup: (field, path) => {
        const [[pattern = '', alias = ''], feedback] = groupPathLimit(field, '.matchAliasGroup.matchAliasGroup-array.*');
        field.setDecoratorProps({ 
            extra: `FormPath.parse('${path}').matchAliasGroup('${pattern}', '${alias}')`, 
            feedbackError: feedback !== ''
        });
    },
    action_parent: (field, path) => {
        field.setDecoratorProps({ 
            extra: `FormPath.parse('${path}').parent();`, 
            feedbackError: FormPath.parse(path).isMatchPattern,
        });
    },
    action_pop: (field, path) => {
        field.setDecoratorProps({ 
            extra: `FormPath.parse('${path}').pop();`, 
            feedbackError: FormPath.parse(path).isMatchPattern,
        });
    },
    action_push: (field, path) => {
        const [array, value] = nodeValue(field, 'push');
        field.setDecoratorProps({ 
            extra: `FormPath.parse('${path}').push(${array.length ? JSON.stringify(array) + ', ' : ''}'${value}');`, 
            feedbackError: FormPath.parse(path).isMatchPattern,
        });
    },
    action_reduce: (field, path) => {
        field.setDecoratorProps({ 
            extra: `FormPath.parse('${path}').reduce(count => ++count, 0);`, 
            feedbackError: FormPath.parse(path).isMatchPattern
        });
    },
    action_setIn: (field, path) => {
        const input = String(field.query(".setIn.setIn-input").get('value')||'');
        const value = String(field.query(".setIn.setIn-value").get('value')||'');

        const [data, feedback] = jsonLimit(input);
        field.setDecoratorProps({ 
            extra: `const target = ${feedback ? input : JSON.stringify(data, null, 2)};
FormPath.parse('${path}').setIn(target, '${value}')`,
            feedbackError: feedback !== ''
        });
    },
    action_splice: (field, path) => {
        const [[start, del], array] = spliceValue(field, '.splice');
        field.setDecoratorProps({ 
            extra: `FormPath.parse('${path}').splice(${start}, ${del}, '${array.join(', ')}');`, 
            feedbackError: FormPath.parse(path).isMatchPattern,
        });
    },
    action_slice: (field, path) => {
        const slice = Number(field.query('.slice-input').value()??1);
        field.setDecoratorProps({ 
            extra: `FormPath.parse('${path}').slice(${slice});`, 
            feedbackError: FormPath.parse(path).isMatchPattern,
        });
    },
    action_toArr: (field, path) => {
        field.setDecoratorProps({ extra: `FormPath.parse('${path}').toArr();` });
    },
    action_toString: (field, path) => {
        field.setDecoratorProps({ extra: `FormPath.parse('${path}').toString();` });
    },
    action_transform: (field, path) => {
        field.setDecoratorProps({ 
            extra: `FormPath.parse('${path}').transform(/\\w+/, path => \`yy.\${path}.zz\`);`, 
            feedbackError: FormPath.parse(path).isMatchPattern,
        });
    }
};

const fieldMethod: Record<string, ActionMethod> = {
    action_concat: (field, path) => {
        const target = dataPathLimit(field, path);
        if (target !== void 0) {
            const [array, value] = nodeValue(field, 'concat');
            target.value = FormPath.parse(path).concat(array, value).toString();
        }
    },
    action_deleteIn: (field, path) => {
        isField(field) && field.query(".deleteIn-input").take(target => {
            if (isField(target)) {
                const [data, feedback] = jsonLimit(target.value);
                feedback === '' && FormPath.parse(path).deleteIn(data);
                field.value = feedback||JSON.stringify(FormPath.parse(path).getIn(data));
            }
        });
    },
    action_ensureIn: (field, path) => {
        if (isField(field)) {
            const input = String(field.query(".ensureIn-input").get('value')||'');
            const value = String(field.query(".ensureIn-value").get('value')||'');

            const [data, feedback] = jsonLimit(input);
            feedback === '' &&  FormPath.parse(path).setIn(data, value);

            field.value = feedback||JSON.stringify(FormPath.parse(path).getIn(data));
        }
    },
    action_existIn: (field, path) => {
        isField(field) && field.query(".existIn-input").take(target => {
            if (isField(target)) {
                const [data, feedback] = jsonLimit(target.value);
                field.value = feedback||String(FormPath.parse(path).existIn(data));
            }
        });
    },
    action_forEach: (field, path) => {
        const target = dataPathLimit(field, path);
        if (target !== void 0) {
            const keys: Array<string|number> = [];
            FormPath.parse(path).forEach(key => keys.push(key));

            target.value = JSON.stringify(keys);
        }
    },
    action_getIn: (field, path) => {
        isField(field) && field.query(".getIn-input").take(target => {
            if (isField(target)) {
                const [data, feedback] = jsonLimit(target.value);
                field.value = feedback||JSON.stringify(FormPath.parse(path).getIn(data));
            }
        });
    },
    action_includes: (field, path) => {
        isField(field) && field.query('.includes-input').take(input => {
            const [subpath, feedback] = subPathLimit(input);
            if (feedback === '') {
                field.value = FormPath.parse(path).includes(subpath) ? "true" : "false";
            } else {
                field.value = feedback;
            }
        });
    },
    action_map: (field, path) => {
        const target = dataPathLimit(field, path);
        if (target !== void 0) {
            target.value = FormPath.parse(path).map((key) => `${key}~`).toString();
        }
    },
    action_match: (field, path) => {
        isField(field) && field.query('.match-input').take(input => {
            const [value, feedback] = bothPathLimit(input, path);
            field.value = feedback || (FormPath.parse(path).match(value) ? 'true' : 'false');
        });
    },
    action_matchAliasGroup: (field, path) => {
        if (isField(field)) {
            const [[pattern = '', alias = ''], feedback] = groupPathLimit(field, '.matchAliasGroup-array.*');
            field.value = feedback ? feedback.replace('子', '匹配') : FormPath.parse(path).matchAliasGroup(pattern, alias) ? "true" : "false";
        }
    },
    action_parent: (field, path) => {
        const target = dataPathLimit(field, path);
        if (target !== void 0) {
            target.value = FormPath.parse(path).parent().toString();
        }
    },
    action_pop: (field, path) => {
        const target = dataPathLimit(field, path);
        if (target !== void 0) {
            target.value = FormPath.parse(path).pop().toString();
        }
    },
    action_push: (field, path) => {
        const target = dataPathLimit(field, path);
        if (target !== void 0) {
            const [array, value] = nodeValue(field, 'push');
            target.value = FormPath.parse(path).push(array, value).toString();
        }
    },
    action_reduce: (field, path) => {
        const target = dataPathLimit(field, path);
        if (target !== void 0) {
            target.value = FormPath.parse(path).reduce(count => ++count, 0).toString();
        }
    },
    action_setIn: (field, path) => {
        if (isField(field)) {
            const input = String(field.query(".setIn-input").get('value')||'');
            const value = String(field.query(".setIn-value").get('value')||'');

            const [data, feedback] = jsonLimit(input);
            feedback === '' &&  FormPath.parse(path).setIn(data, value);

            field.value = feedback||JSON.stringify(FormPath.parse(path).getIn(data));
        }
    },
    action_splice: (field, path) => {
        const target = dataPathLimit(field, path);
        if (target !== void 0) {
            const [[start, del], array] = spliceValue(field);
            target.value = FormPath.parse(path).splice(start, del, ...array).toString();
        }
    },
    action_slice: (field, path) => {
        const target = dataPathLimit(field, path);
        if (target !== void 0) {
            const slice = Number(target.query('.slice-input').value()??1);
            target.value = FormPath.parse(path).slice(slice).toString();
        }
    },
    action_toArr: (field, path) => {
        if (isField(field)) field.value = JSON.stringify(FormPath.parse(path).toArr(), null, 2);
    },
    action_toString: (field, path) => {
        if (isField(field)) field.value = FormPath.parse(path).toString();
    },
    action_transform: (field, path) => {
        const target = dataPathLimit(field, path);
        if (target !== void 0) {
            target.value = FormPath.parse(path).transform(/\w+/, path => `yy.${path}.zz`).toString();
        }
    }
};

// 留一个备用
const validatorMethod: Record<string, ValidatorMethod> = {
    action_concat1: (value) => {
        return !FormPath.parse(value).isMatchPattern;
    },
};

const validator = (value: string, method: string) => {
    try {
        FormPath.parse(value);
        if (method in validatorMethod) {
            return validatorMethod[method](value);
        }

        return true;
    } catch {
        return false;
    }
}

export const extraCode = (field: GeneralField) => {
    const name = field.path.toString();
    const method = `action_${name}`;

    if (method in extraMethod) {
        const path = field.query("path").value()||'';
        if (!!path && validator(path, method)) {
            field.display = "visible";
            extraMethod[method](field, path);
        } else {
            field.display = "none";
        }
    }
};

export const fieldData = (field: GeneralField, self?: boolean) => {
    const target = self ? field : field.parent;
    const { display } = target;

    const name = target.path.toString();
    const method = `action_${name}`;

    if (method in fieldMethod && display === "visible") {
        const path = field.query("path").value()||'';
        try {
            fieldMethod[method](field, path);
        } catch {
            if (isField(field)) field.value = '❌ 解析失败，请检查语法是否正确';
        }
    }
}

type ActionMethod = (field: GeneralField, path: string) => void;
type ValidatorMethod = (value: string) => boolean;