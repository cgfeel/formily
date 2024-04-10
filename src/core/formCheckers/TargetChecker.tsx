import {
    createForm,
    isArrayField,
    isDataField,
    isField,
    isForm,
    isGeneralField,
    isObjectField,
    isQuery,
    isVoidField,
} from "@formily/core";
import { FC } from "react";
import Wraper from "./Wraper";

const form = createForm();
const group = {
    "createForm()": form,
    "form.createField()": form.createField({ name: "field" }),
    "form.createArrayField()": form.createArrayField({ name: "array-field" }),
    "form.createObjectField()": form.createObjectField({ name: "object-field" }),
    "form.createVoidField()": form.createVoidField({ name: "void-field" }),
    "normal object: {}": {},
    "form.query()": form.query("target"),
};

const list = [isForm, isField, isArrayField, isObjectField, isVoidField, isGeneralField, isDataField, isQuery];
const TargetChecker: FC = () => (
    <Wraper
        footer={
            <div>
                <p>
                    <strong>说明：</strong>
                </p>
                <ul>
                    <li>
                        <code>isForm</code>：判断一个对象是否为 <code>Form</code> 对象
                    </li>
                    <li>
                        <code>isField</code>：判断一个对象是否为 <code>Field</code>、<code>ArrayField</code>、
                        <code>ObjectField</code> 对象
                    </li>
                    <li>
                        <code>isArrayField</code>：判断一个对象是否为 <code>ArrayField</code> 对象
                    </li>
                    <li>
                        <code>isObjectField</code>：判断一个对象是否为 <code>ObjectField</code> 对象
                    </li>
                    <li>
                        <code>isVoidField</code>：判断一个对象是否为 <code>VoidField</code> 对象
                    </li>
                    <li>
                        <code>isGeneralField</code>：判断一个对象是否为 <code>Field</code>、<code>ArrayField</code>、
                        <code>ObjectField</code>、<code>VoidField</code> 对象
                    </li>
                    <li>
                        <code>isDataField</code>：判断一个对象是否为 <code>Field</code>、<code>ArrayField</code>、
                        <code>ObjectField</code> 对象
                    </li>
                    <li>
                        <code>isQuery</code>：判断一个对象是否为 <code>Query</code> 对象
                    </li>
                </ul>
                <p>
                    <strong>总结：</strong>
                </p>
                <ul>
                    <li>
                        <code>isField</code> 和 <code>isDataField</code> 返回是一样的
                    </li>
                </ul>
            </div>
        }
        header={<h2>表单对象检查</h2>}
        group={group}
        list={list}
    />
);

export default TargetChecker;
