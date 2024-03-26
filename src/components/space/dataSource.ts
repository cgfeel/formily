import { ISchema } from "@formily/react";

export const nameSchema: Exclude<ISchema['properties'], string> = {
    name: {
        title: '姓名',
        type: 'void',
        "x-component": "Space",
        "x-decorator": "FormItem",
        properties: {
            'first-name': {
                required: true,
                type: 'string',
                "x-component": 'Input',
                "x-decorator": 'FormItem',
            },
            'last-name': {
                required: true,
                type: 'string',
                "x-component": 'Input',
                "x-decorator": 'FormItem',
            },
        },
        "x-decorator-props": {
            asterisk: true,
            feedbackLayout: 'none',
        }
    }
};

export const textsSchema: Exclude<ISchema['properties'], string> = {
    texts: {
        title: '文本串联',
        type: 'void',
        "x-component": "Space",
        "x-decorator": "FormItem",
        properties: {
            aa: {
                required: true,
                type: 'string',
                "x-component": "Input",
                "x-decorator": "FormItem",
                "x-decorator-props": {
                    addonAfter: '单位'
                }
            },
            bb: {
                required: true,
                type: 'string',
                "x-component": "Input",
                "x-decorator": "FormItem",
                "x-decorator-props": {
                    addonAfter: '单位'
                }
            },
            cc: {
                required: true,
                type: 'string',
                "x-component": "Input",
                "x-decorator": "FormItem",
                "x-decorator-props": {
                    addonAfter: '单位'
                }
            },
        },
        "x-decorator-props": {
            asterisk: true,
            feedbackLayout: 'none',
        },
    }
};