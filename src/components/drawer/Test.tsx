import { FC } from "react";
import { FormDrawer, FormItem, FormLayout, Input, Submit, Reset, FormButtonGroup } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import { Button } from "antd";

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
    },
});

const Test: FC = () => {
    return (
        <Button
            onClick={() => {
                FormDrawer("抽屉表单", () => {
                    return (
                        <FormLayout labelCol={6} wrapperCol={10}>
                            <SchemaField>
                                <SchemaField.String
                                    name="aaa"
                                    required
                                    title="输入框1"
                                    x-decorator="FormItem"
                                    x-component="Input"
                                />
                                <SchemaField.String
                                    name="bbb"
                                    required
                                    title="输入框2"
                                    x-decorator="FormItem"
                                    x-component="Input"
                                />
                                <SchemaField.String
                                    name="ccc"
                                    required
                                    title="输入框3"
                                    x-decorator="FormItem"
                                    x-component="Input"
                                />
                                <SchemaField.String
                                    name="ddd"
                                    required
                                    title="输入框4"
                                    x-decorator="FormItem"
                                    x-component="Input"
                                />
                            </SchemaField>
                            <FormButtonGroup align="right">
                                <Submit
                                    onSubmit={() => {
                                        return new Promise(resolve => {
                                            setTimeout(resolve, 1000);
                                        });
                                    }}
                                    onSubmitFailed={console.log}>
                                    提交
                                </Submit>
                                <Reset>重置</Reset>
                            </FormButtonGroup>
                        </FormLayout>
                    );
                })
                    .forOpen((props, next) => {
                        setTimeout(() => {
                            next();
                        }, 1000);
                    })
                    .open({
                        initialValues: {
                            aaa: "123",
                        },
                    })
                    .then(console.log);
            }}>
            点我打开表单
        </Button>
    );
};

export default Test;
