import { FieldDataSource, FormPathPattern, GeneralField, IFormProps, onFieldReact } from "@formily/core";
import { action } from "@formily/reactive";
import { fetchLink } from "../server";

const asyncDataSource = (pattern: FormPathPattern, server: FormServerType) => {
    onFieldReact(pattern, boundData(server));
};

const asyncLinker: IFormProps['effects'] = () => {
    asyncDataSource('select', loadData);
};

const boundData = (server: FormServerType) => async (field: GeneralField) => {
    if ('loading' in field) field.loading = true;
    server(field).then(action.bound!((data: FieldDataSource) => {
        if ('dataSource' in field) field.dataSource = data;
        if ('loading' in field) field.loading = false;

        // 添加数据后默认展示第一个值
        if (data.length && 'value' in field) {
            field.value = data[0].value;
        }
        field.setComponentProps({ treeDefaultExpandAll: true });
    }));
}

const loadData = async (field: GeneralField) => {
    const linkage = field.query('linkage').get('value');
    if (!linkage) return [];

    const data = await fetchLink(linkage);
    return data;
};

type FormServerType = (field: GeneralField) => Promise<FieldDataSource>;

export { boundData, loadData };

export default asyncLinker;