import { Properties } from ".";

export const schemaFormat: Properties = {
    global_style_1: {
        required: true,
        title: '全局注册风格',
        type: 'string',
        "x-component": "Input",
        "x-decorator": "FormItem",
        "x-validator": {
            format: "custom_format",
            message: "错误❎",
        }
    },
    global_style_2: {
        required: true,
        title: '全局注册风格',
        type: 'string',
        "x-component": "Input",
        "x-decorator": "FormItem",
        "x-validator": "custom_format"
    },
    global_style_3: {
        required: true,
        title: '全局注册风格',
        type: 'string',
        "x-component": "Input",
        "x-decorator": "FormItem",
        "x-validator": ["custom_format"]
    },
    global_style_4: {
        required: true,
        title: '全局注册风格',
        type: 'string',
        "x-component": "Input",
        "x-decorator": "FormItem",
        "x-validator": [{
            format: "custom_format",
            message: "错误❎",
        }]
    },
    global_style_5: {
        format: "custom_format",
        required: true,
        title: '全局注册风格',
        type: 'string',
        "x-component": "Input",
        "x-decorator": "FormItem",
    },
    validator_style_1: {
        pattern: /123/,
        required: true,
        title: '局部定义风格',
        type: 'string',
        "x-component": "Input",
        "x-decorator": "FormItem",
    },
    validator_style_2: {
        pattern: "123",
        required: true,
        title: '局部定义风格',
        type: 'string',
        "x-component": "Input",
        "x-decorator": "FormItem",
    },
    validator_style_3: {
        required: true,
        title: '局部定义风格',
        type: 'string',
        "x-component": "Input",
        "x-decorator": "FormItem",
        "x-validator": {
            message: "错误❎",
            pattern: /123/,
        }
    },
    validator_style_4: {
        required: true,
        title: '局部定义风格',
        type: 'string',
        "x-component": "Input",
        "x-decorator": "FormItem",
        "x-validator": [{
            message: "错误❎",
            pattern: /123/,
        }]
    },
};