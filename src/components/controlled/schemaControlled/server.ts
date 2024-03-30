import { ISchema } from "@formily/react";

export const schemaA: ISchema = {
    type: 'object',
    properties: {
        aa: {
            title: 'AA',
            type: 'string',
            "x-component": "Input",
            "x-decorator": "FormItem",
            "x-component-props": {
                placeholder: "Input",
            }
        }
    }
};

export const schemaB: ISchema = {
    type: 'object',
    properties: {
        aa: {
            title: "AA",
            type: "string",
            "x-component": "Select",
            "x-decorator": "FormItem",
            enum: [
                { label: '111', value: '111' },
                { label: '222', value: '222' },
            ],
            "x-component-props": {
                placeholder: "Select",
            }
        },
        bb: {
            title: 'BB',
            type: 'string',
            "x-component": "Input",
            "x-decorator": "FormItem",
            "x-component-props": {
                placeholder: "Input",
            }
        },
    }
};