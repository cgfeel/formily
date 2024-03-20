import { Properties } from ".";

export const inputLength: Properties = {
    length_1: {
        required: true,
        title: '长度为5',
        type: 'string',
        "x-component": 'Input',
        "x-decorator": 'FormItem',
        "x-validator": { len: 5 }
    },
    length_2: {
        required: true,
        title: '长度为5',
        type: 'string',
        "x-component": 'Input',
        "x-decorator": 'FormItem',
        "x-validator": [{ len: 5 }]
    },
    maxlength_1: {
        maxLength: 5,
        required: true,
        title: '最大长度为5',
        type: 'string',
        "x-component": 'Input',
        "x-decorator": 'FormItem',
    },
    maxlength_2: {
        required: true,
        title: '最大长度为5',
        type: 'string',
        "x-component": 'Input',
        "x-decorator": 'FormItem',
        "x-validator": { max: 5 }
    },
    maxlength_3: {
        required: true,
        title: '最大长度为5',
        type: 'string',
        "x-component": 'Input',
        "x-decorator": 'FormItem',
        "x-validator": [{ max: 5 }]
    },
    minlength_1: {
        minLength: 5,
        required: true,
        title: '最大长度为5',
        type: 'string',
        "x-component": 'Input',
        "x-decorator": 'FormItem',
    },
    minlength_2: {
        required: true,
        title: '最大长度为5',
        type: 'string',
        "x-component": 'Input',
        "x-decorator": 'FormItem',
        "x-validator": { min: 5 }
    },
    minlength_3: {
        required: true,
        title: '最大长度为5',
        type: 'string',
        "x-component": 'Input',
        "x-decorator": 'FormItem',
        "x-validator": [{ min: 5 }]
    },
};

export const inputNumberRule: Properties = {
    whitespace: {
        required: true,
        title: '排除纯空白字符',
        type: "string",
        "x-component": "Input",
        "x-decorator": "FormItem",
        "x-validator": [{ whitespace: true }]
    },
    enum: {
        required: true,
        title: '枚举匹配',
        type: 'string',
        "x-component": "Input",
        "x-decorator": "FormItem",
        "x-validator": [{ enum: ['1', '2', '3'] }]
    },
    const: {
        required: true,
        const: "123",
        title: "常量匹配",
        type: "string",
        "x-component": "Input",
        "x-decorator": "FormItem",
    },
    multipleof: {
        multipleOf: 2,
        required: true,
        title: "整除匹配",
        type: "number",
        "x-component": "NumberPicker",
        "x-decorator": "FormItem",
    }
};

export const inputRequired: Properties = {
    required_1: {
        required: true,
        title: '必填',
        type: 'string',
        'x-component': 'Input',
        'x-decorator': 'FormItem',
    },
    required_2: {
        title: '必填',
        type: 'string',
        'x-component': 'Input',
        'x-decorator': 'FormItem',
        "x-validator": { required: true }
    },
    required_3: {
        title: '必填',
        type: 'string',
        'x-component': 'Input',
        'x-decorator': 'FormItem',
        "x-validator": [{ required: true }]
    },
};

export const numberMax: Properties = {
    max_1: {
        maximum: 5,
        required: true,
        title: '最大值(>5报错)',
        type: 'number',
        "x-component": 'NumberPicker',
        'x-decorator': 'FormItem',
    },
    max_2: {
        required: true,
        title: '最大值(>5报错)',
        type: 'number',
        "x-component": 'NumberPicker',
        'x-decorator': 'FormItem',
        "x-validator": { maximum: 5 }
    },
    max_3: {
        required: true,
        title: '最大值(>5报错)',
        type: 'number',
        "x-component": 'NumberPicker',
        'x-decorator': 'FormItem',
        "x-validator": [{ maximum: 5 }]
    },
    max_4: {
        exclusiveMaximum: 5,
        required: true,
        title: '最大值(>=5报错)',
        type: 'number',
        "x-component": 'NumberPicker',
        'x-decorator': 'FormItem',
    },
    max_5: {
        required: true,
        title: '最大值(>=5报错)',
        type: 'number',
        "x-component": 'NumberPicker',
        'x-decorator': 'FormItem',
        "x-validator": { exclusiveMaximum: 5 }
    },
    max_6: {
        required: true,
        title: '最大值(>=5报错)',
        type: 'number',
        "x-component": "NumberPicker",
        "x-decorator": "FormItem",
        "x-validator": [{ exclusiveMaximum: 5 }]
    },
};

export const numberMin: Properties = {
    min_1: {
        minimum: 5,
        required: true,
        title: '最小值(<5报错)',
        type: 'number',
        "x-component": 'NumberPicker',
        "x-decorator": "FormItem",
    },
    min_2: {
        required: true,
        title: '最小值(<5报错)',
        type: 'number',
        "x-component": 'NumberPicker',
        'x-decorator': 'FormItem',
        "x-validator": { minimum: 5 }
    },
    min_3: {
        required: true,
        title: '最小值(<5报错)',
        type: 'number',
        "x-component": 'NumberPicker',
        'x-decorator': 'FormItem',
        "x-validator": [{ minimum: 5 }]
    },
    min_4: {
        exclusiveMinimum: 5,
        required: true,
        title: '最小值(<=5报错)',
        type: 'number',
        "x-component": 'NumberPicker',
        'x-decorator': 'FormItem',
    },
    min_5: {
        required: true,
        title: '最小值(<=5报错)',
        type: 'number',
        "x-component": 'NumberPicker',
        'x-decorator': 'FormItem',
        "x-validator": { exclusiveMinimum: 5 }
    },
    min_6: {
        required: true,
        title: '最小值(<=5报错)',
        type: 'number',
        "x-component": 'NumberPicker',
        'x-decorator': 'FormItem',
        "x-validator": [{ exclusiveMinimum: 5 }]
    },
};