import { Properties } from ".";

export const schemaRules: Properties = {
  global_style_1: {
    required: true,
    title: "全局注册风格",
    type: "string",
    "x-component": "Input",
    "x-decorator": "FormItem",
    "x-validator": {
      global_1: true,
    },
  },
  global_style_2: {
    required: true,
    title: "全局注册风格",
    type: "string",
    "x-component": "Input",
    "x-decorator": "FormItem",
    "x-validator": {
      global_2: true,
      message: "后添加错误❎",
    },
  },
  global_style_3: {
    required: true,
    title: "全局注册风格",
    type: "string",
    "x-component": "Input",
    "x-decorator": "FormItem",
    "x-validator": {
      global_3: true,
      message: "后添加错误❎",
    },
  },
  global_style_4: {
    required: true,
    title: "全局注册风格",
    type: "number",
    "x-component": "NumberPicker",
    "x-decorator": "FormItem",
    "x-validator": {
      global_4: true,
    },
  },
  validator_style_1: {
    required: true,
    title: "局部定义风格",
    type: "string",
    "x-component": "Input",
    "x-decorator": "FormItem",
    "x-validator": "{{validator_1}}",
  },
  validator_style_2: {
    required: true,
    title: "局部定义风格",
    type: "string",
    "x-component": "Input",
    "x-decorator": "FormItem",
    "x-validator": {
      message: "后添加错误❎",
      validator: "{{validator_2}}",
    },
  },
  validator_style_3: {
    required: true,
    title: "局部定义风格",
    type: "string",
    "x-component": "Input",
    "x-decorator": "FormItem",
    "x-validator": {
      message: "后添加错误❎",
      validator: "{{validator_3}}",
    },
  },
  validator_style_4: {
    required: true,
    title: "局部定义风格",
    type: "number",
    "x-component": "NumberPicker",
    "x-decorator": "FormItem",
    "x-validator": "{{validator_4}}",
  },
};
