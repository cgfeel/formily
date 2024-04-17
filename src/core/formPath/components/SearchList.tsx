import {
    Field,
    FieldDataSource,
    Form,
    FormPath,
    FormPathPattern,
    GeneralField,
    isField,
    onFieldInit,
    onFieldReact,
} from "@formily/core";
import { action, observable } from "@formily/reactive";
import { createStyles } from "antd-style";
import { FC, PropsWithChildren } from "react";
import Wraper from "../Wraper";
import SchemaField from "../schema/SchemaPropertyField";
import EmptySchema from "../schema/method/EmptySchema";

const useStyles = createStyles(({ prefixCls }) => ({
    box: {
        [`.${prefixCls}-desc-item`]: {
            code: {
                backgroundColor: "transparent",
                border: "none",
                margin: 0,
                padding: 0,
            },
        },
    },
    selectTips: {
        color: "#999",
    },
}));

const asyncDataSource = (pattern: FormPathPattern, service: SelectService) => {
    const keyword = observable.ref("");
    onFieldInit(pattern, field => {
        field.setComponentProps({
            onSearch: (value: string) => {
                keyword.value = value;
            },
        });
    });

    onFieldReact(pattern, field => {
        if (!isField(field)) return;
        field.loading = true;
        service({ field, keyword: keyword.value }).then(
            action.bound?.(data => {
                field.dataSource = data;
                field.loading = false;
            }),
        );
    });
};

const fetchSelect = ({ keyword, defaultData }: fetchParams) =>
    new Promise<FieldDataSource>(resolve => {
        const data = [
            {
                label: <SelectItem tips="自定义路径">{keyword}</SelectItem>,
                value: keyword,
            },
        ];
        setTimeout(() => resolve([...data, ...defaultData]), 300);
    });

const searchEffects = (defaultSelect: ItemType[]) => {
    asyncDataSource("path", async ({ keyword }) => {
        const defaultData = defaultSelect.map(({ tips, value }) => ({
            label: <SelectItem tips={tips}>{value}</SelectItem>,
            value,
        }));
        return keyword ? fetchSelect({ keyword, defaultData }) : defaultData;
    });
};

const validator = (path: string) => {
    try {
        if (!path) return false;
        FormPath.parse(path);

        return true;
    } catch {
        return false;
    }
};

const SelectItem: FC<PropsWithChildren<SelectItemProps>> = ({ children, tips }) => {
    const { styles } = useStyles();
    return (
        <>
            {children}
            <span className={styles.selectTips}> - {tips}</span>
        </>
    );
};

const SelectList: FC<PropsWithChildren<SelectListProps>> = ({ children, form, extraCode, fieldData }) => {
    const { styles } = useStyles();
    return (
        <Wraper className={styles.box} form={form}>
            <SchemaField scope={{ extraCode, fieldData, validator }}>
                <SchemaField.Void x-component="Header">
                    <SchemaField.String
                        name="path"
                        x-component="Select"
                        x-decorator="FormItem"
                        x-component-props={{
                            allowClear: true,
                            filterOption: false,
                            placeholder: "请选择或输入查询的路径",
                            showSearch: true,
                            size: "large",
                        }}
                        x-validator={value => (!value || validator(value) ? "" : "不是有效路径")}
                    />
                </SchemaField.Void>
                <SchemaField.Void x-component="Card">
                    <EmptySchema />
                    {children}
                </SchemaField.Void>
            </SchemaField>
        </Wraper>
    );
};

interface SelectItemProps {
    tips: string;
}

type ActionFn = (field: GeneralField, self?: boolean) => void;

type fetchParams = {
    keyword: string;
    defaultData: FieldDataSource;
};

type ItemType = Record<"tips" | "value", string>;

type SelectParams = {
    keyword: string;
    field: Field;
};

type SelectService = (params: SelectParams) => Promise<FieldDataSource>;

export interface SelectListProps {
    form: Form;
    extraCode: ActionFn;
    fieldData: ActionFn;
}

export { searchEffects };

export default SelectList;
