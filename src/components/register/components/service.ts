import { ISchema } from "@formily/react";

export const schema: ISchema = {
  type: "object",
  properties: {
    username: {
      required: true,
      title: "用户名",
      type: "string",
      "x-component": "Input",
      "x-decorator": "FormItem",
    },
    password: {
      required: true,
      title: "密码",
      type: "string",
      "x-component": "Password",
      "x-decorator": "FormItem",
      "x-component-props": {
        autoComplete: "off",
        checkStrength: true,
      },
      "x-reactions": [
        {
          dependencies: [".confirm_password"],
          fulfill: {
            state: {
              selfErrors:
                "{{$deps[0] && $self.value && $self.value !== $deps[0] ? ['确认密码不匹配'] : []}}",
            },
          },
        },
      ],
    },
    confirm_password: {
      required: true,
      title: "确认密码",
      type: "string",
      "x-component": "Password",
      "x-decorator": "FormItem",
      "x-component-props": {
        autoComplete: "off",
        checkStrength: true,
      },
      "x-reactions": [
        {
          dependencies: [".password"],
          fulfill: {
            state: {
              selfErrors:
                "{{$deps[0] && $self.value && $self.value !== $deps[0] ? ['确认密码不匹配'] : []}}",
            },
          },
        },
      ],
    },
    name: {
      title: "姓名",
      type: "void",
      "x-component": "FormGrid",
      "x-decorator": "FormItem",
      properties: {
        firstName: {
          required: true,
          type: "string",
          "x-component": "Input",
          "x-decorator": "FormItem",
          "x-component-props": {
            placeholder: "姓",
          },
        },
        lastName: {
          required: true,
          type: "string",
          "x-component": "Input",
          "x-decorator": "FormItem",
          "x-component-props": {
            placeholder: "名",
          },
        },
      },
      "x-decorator-props": {
        feedbackLayout: "none",
      },
      "x-reactions": {
        dependencies: [".firstName#editable", ".lastName#editable"],
        when: "{{$deps[0] || $deps[1]}}",
        fulfill: {
          schema: {
            "x-decorator-props": { asterisk: true },
          },
        },
        otherwise: {
          schema: {
            "x-decorator-props": { asterisk: false },
          },
        },
      },
    },
    email: {
      required: true,
      title: "邮箱",
      type: "string",
      "x-component": "Input",
      "x-decorator": "FormItem",
      "x-validator": "email",
    },
    gender: {
      required: true,
      title: "性别",
      type: "string",
      "x-component": "Select",
      "x-decorator": "FormItem",
      enum: [
        {
          label: "男",
          value: 1,
        },
        {
          label: "女",
          value: 2,
        },
        {
          label: "第三性别",
          value: 3,
        },
      ],
    },
    birthday: {
      required: true,
      title: "生日",
      type: "string",
      "x-component": "DatePicker",
      "x-decorator": "FormItem",
    },
    address: {
      required: true,
      title: "地址",
      type: "string",
      "x-component": "Cascader",
      "x-decorator": "FormItem",
      "x-reactions": "{{fetchAddress}}",
    },
    idCard: {
      required: true,
      title: "身份证复印件",
      type: "string",
      "x-component": "IDUpload",
      "x-decorator": "FormItem",
    },
    contacts: {
      required: true,
      title: "联系人信息",
      type: "array",
      "x-component": "ArrayItems",
      "x-decorator": "FormItem",
      items: {
        type: "object",
        "x-component": "ArrayItems.Item",
        "x-value": "test", // 非必要，如果不设置，ObjectField节点会有一个value="[object Object]"
        properties: {
          sort: {
            type: "void",
            "x-component": "ArrayItems.SortHandle",
            "x-decorator": "FormItem",
          },
          popover: {
            title: "完善联系人信息",
            type: "void",
            "x-component": "FormLayout",
            "x-decorator": "Editable.Popover",
            properties: {
              name: {
                required: true,
                title: "姓名",
                type: "string",
                "x-component": "PopInput",
                "x-decorator": "FormItem",
              },
              email: {
                title: "邮箱",
                type: "string",
                "x-component": "PopInput",
                "x-decorator": "FormItem",
                "x-validator": [{ required: true }, "email"],
              },
              phone: {
                title: "手机号",
                type: "string",
                "x-component": "PopInput",
                "x-decorator": "FormItem",
                "x-validator": [{ required: true }, "phone"],
              },
            },
            "x-component-props": {
              layout: "vertical",
            },
            "x-reactions": [
              {
                dependencies: [".popover.name"],
                fulfill: {
                  schema: {
                    title: "{{$deps[0]}}",
                  },
                },
              },
            ],
          },
          remove: {
            type: "void",
            "x-component": "ArrayItems.Remove",
            "x-decorator": "FormItem",
          },
        },
      },
      properties: {
        addition: {
          title: "新增联系人",
          type: "void",
          "x-component": "ArrayItems.Addition",
        },
      },
    },
  },
};
