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
import EmptySchema from "../schema/method/EmptySchema";
import InputSchema from "../schema/method/InputSchema";
import MatchAliasGroupSchema from "../schema/method/MatchAliasGroupSchema";
import NodeAppendSchema from "../schema/method/NodeAppendSchema";
import SingleSchema from "../schema/method/SingleSchema";
import SliceSchema from "../schema/method/SliceSchema";
import SpliceSchema from "../schema/method/SpliceSchema";

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
                    <NodeAppendSchema feedbackText="连接数据操作型路径" name="concat" />
                    <SliceSchema />
                    <NodeAppendSchema feedbackText="往数据操作路径推入某个片段路径" name="push" />
                    <SingleSchema feedbackText="从数据操作路径中弹出最后一个 key" name="pop" />
                    <SpliceSchema />
                    <SingleSchema feedbackText="遍历数据操作路径" name="forEach" />
                    <SingleSchema feedbackText="循环映射数据操作路径" name="map" />
                    <SingleSchema
                        feedbackText="reduce 方法法对路径中的每个元素执行一个由您提供的 reducer 函数(升序执行)，将其结果汇总为单个返回值。"
                        name="reduce"
                    />
                    <SingleSchema feedbackText="获取当前数据操作路径的父级路径" name="parent" />
                    <InputSchema
                        defaultValue="aa.bb"
                        feedbackText="用于判断给定数据操作路径是否为当前数据操作路径的子路径，检测的路径可以是匹配路径语法，但子路径不可以是匹配路径语法。includes 和 match (动态方法) 的区别在于 includes 只适用于用匹配路径去匹配数据路径，反之报错"
                        inputTitle="子路径"
                        name="includes"
                    />
                    <SingleSchema feedbackText="基于正则提取数据做路径拼装" name="transform" />
                    <InputSchema
                        defaultValue="aa.*.cc"
                        feedbackText="使用路径匹配语法匹配当前路径，匹配的路径至少有一个是数据路径，虽然 match 支持匹配或被匹配路径任意一个可以包含 *，但在开发过程中建议将解析参数为匹配路径，匹配参数为数据路径，否则在开发环境下 match 只有第一次响应是正确的"
                        inputTitle="子路径"
                        name="match"
                    />
                    <MatchAliasGroupSchema />
                    <InputSchema
                        defaultValue='{ "aa": { "bb": { "cc": {} } } }'
                        feedbackText="基于当前路径判断指定数据是否存在"
                        inputTitle="手写 JSON"
                        name="existIn"
                    />
                    <InputSchema
                        defaultValue='{ "aa": { "bb": { "cc": "value" } } }'
                        feedbackText="基于当前路径获取指定数据"
                        inputTitle="手写 JSON"
                        name="getIn"
                    />
                    <InputSchema
                        defaultValue="{}"
                        feedbackText="基于当前路径更新指定数据"
                        inputTitle="手写 JSON"
                        name="setIn"
                    />
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
