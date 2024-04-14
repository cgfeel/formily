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
import { extraCode, fieldData } from "../action/methodAction";
import SchemaField from "../schema/SchemaPropertyField";
import ConcatSchema from "../schema/method/ConcatSchema";
import EmptySchema from "../schema/method/EmptySchema";
import SingleSchema from "../schema/method/SingleSchema";

const defaultSelect = [
    { tips: "点路径", value: "aa.bb.cc" },
    { tips: "局部匹配", value: "aa.bb.*" },
    { tips: "分组匹配", value: "*(aa,bb,cc)" },
];

const useStyles = createStyles(({ prefixCls }) => ({
    box: {
        [`.${prefixCls}-desc-item`]: {
            code: {
                backgroundColor: "transparent",
                border: "none",
                margin: 0,
                padding: 0,
            },
            pre: {
                overflowX: "auto",
                width: 500,
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
    const { styles } = useStyles();
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
                    <SingleSchema feedbackText="输出路径的完整字符串，支持匹配型路径与数据操作型路径" name="toString" />
                    <SingleSchema
                        feedbackText="输出路径的数组片段，仅支持数据操作型路径。文档没有及时更新，此方法名已修改"
                        name="toArr"
                    />
                    <ConcatSchema />
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
