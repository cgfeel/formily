import { ISchema } from "@formily/react";

const collapseAdditionProps: ISchema["properties"] = {
    addition: {
        title: "添加条目",
        type: "void",
        "x-component": "ArrayCollapse.Addition",
    },
};

const collapsePanelProps: ISchema["properties"] = {
    index: {
        type: "void",
        "x-component": "ArrayCollapse.Index",
    },
    remove: {
        type: "void",
        "x-component": "ArrayCollapse.Remove",
    },
    moveUp: {
        type: "void",
        "x-component": "ArrayCollapse.MoveUp",
    },
    moveDown: {
        type: "void",
        "x-component": "ArrayCollapse.MoveDown",
    },
};

export const array: ISchema = {
    maximum: 3,
    type: "array",
    "x-component": "ArrayCollapse",
    "x-decorator": "FormItem",
    items: {
        type: "object",
        "x-component": "ArrayCollapse.CollapsePanel",
        properties: {
            ...collapsePanelProps,
            aa: {
                description: "AA 输入 123 时隐藏 BB",
                required: true,
                title: "AA",
                type: "string",
                "x-component": "Input",
                "x-decorator": "FormItem",
            },
            bb: {
                required: true,
                title: "BB",
                type: "string",
                "x-component": "Input",
                "x-decorator": "FormItem",
            },
            cc: {
                description: "CC 输入 123 时隐藏 DD",
                required: true,
                title: "CC",
                type: "string",
                "x-component": "Input",
                "x-decorator": "FormItem",
            },
            dd: {
                required: true,
                title: "DD",
                type: "string",
                "x-component": "Input",
                "x-decorator": "FormItem",
            },
        },
        "x-component-props": {
            header: "对象数组",
        },
    },
    properties: {
        ...collapseAdditionProps,
    },
};

export const array_unshift: ISchema = {
    maximum: 3,
    type: "array",
    "x-component": "ArrayCollapse",
    "x-decorator": "FormItem",
    items: {
        type: "object",
        "x-component": "ArrayCollapse.CollapsePanel",
        properties: {
            ...collapsePanelProps,
            aa: {
                description: "输入 123",
                required: true,
                title: "AA",
                type: "string",
                "x-component": "Input",
                "x-decorator": "FormItem",
            },
            bb: {
                required: true,
                type: "string",
                "x-component": "Input",
                "x-decorator": "FormItem",
                "x-reactions": [
                    {
                        dependencies: [".aa"],
                        when: "{{$deps[0] !== '123'}}",
                        fulfill: {
                            schema: {
                                title: "BB",
                                "x-disabled": true,
                            },
                        },
                        otherwise: {
                            schema: {
                                title: "Changed",
                                "x-disabled": false,
                            },
                        },
                    },
                ],
            },
        },
        "x-component-props": {
            header: " 对象数组 (unshift)",
        },
    },
    properties: {
        addition: {
            ...collapseAdditionProps.addition,
            title: "添加条目 (unshift)",
            "x-component-props": {
                method: "unshift",
            },
        },
    },
    "x-component-props": {
        defaultOpenPanelCount: 8,
    },
};

export const string_array: ISchema = {
    maximum: 3,
    type: "array",
    "x-component": "ArrayCollapse",
    "x-decorator": "FormItem",
    items: {
        type: "void",
        "x-component": "ArrayCollapse.CollapsePanel",
        properties: {
            ...collapsePanelProps,
            input: {
                required: true,
                title: "Input",
                type: "string",
                "x-component": "Input",
                "x-decorator": "FormItem",
            },
        },
        "x-component-props": {
            header: "字符串数组",
        },
    },
    properties: {
        ...collapseAdditionProps,
    },
    "x-component-props": {
        accordion: true,
        defaultOpenPanelCount: 3,
    },
};
