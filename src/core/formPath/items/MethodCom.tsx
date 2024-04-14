import {
    Field,
    FieldDataSource,
    FormPath,
    FormPathPattern,
    createForm,
    isField,
    onFieldInit,
    onFieldReact,
} from "@formily/core";
import { action, observable } from "@formily/reactive";
import { createStyles } from "antd-style";
import { FC, PropsWithChildren, useMemo } from "react";
import Wraper from "../Wraper";
import SchemaField, { EmptyNone } from "../schema/SchemaPropertyField";

const defaultSelect = [{ tips: "点路径", value: "aa.bb.cc" }];

const useStyles = createStyles({
    headerSelect: {
        width: "100%",
    },
    selectTips: {
        color: "#999",
    },
});

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

const MethodCom: FC = () => {
    const form = useMemo(
        () =>
            createForm({
                values: {
                    path: "aa.bb.cc",
                },
                effects: () => {
                    asyncDataSource("path", async ({ keyword }) => {
                        const defaultData = defaultSelect.map(({ tips, value }) => ({
                            label: <SelectItem tips={tips}>{value}</SelectItem>,
                            value,
                        }));
                        return keyword ? fetchSelect({ keyword, defaultData }) : defaultData;
                    });
                },
            }),
        [],
    );
    return (
        <Wraper form={form}>
            <SchemaField scope={{ validator }}>
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
                    <EmptyNone />
                    <SchemaField.Void
                        name="toString"
                        x-component="DescItem"
                        x-component-props={{
                            title: "test",
                            print: (
                                <SchemaField.String
                                    name="toString.print"
                                    title="输出"
                                    x-component="Input"
                                    x-decorator="FormItem"
                                    x-pattern="readPretty"
                                />
                            ),
                        }}
                    />
                    <SchemaField.Void x-component="DescItem" x-component-props={{ title: "test2" }}>
                        <SchemaField.String x-component="Input" />
                    </SchemaField.Void>
                </SchemaField.Void>
            </SchemaField>
        </Wraper>
    );
};

interface SelectItemProps {
    tips: string;
}

type fetchParams = {
    keyword: string;
    defaultData: FieldDataSource;
};

type SelectParams = {
    keyword: string;
    field: Field;
};

type SelectService = (params: SelectParams) => Promise<FieldDataSource>;

export default MethodCom;
