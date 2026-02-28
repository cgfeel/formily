import {
  createForm,
  isArrayFieldState,
  isDataFieldState,
  isFieldState,
  isFormState,
  isGeneralFieldState,
  isObjectFieldState,
  isVoidFieldState,
} from "@formily/core";
import { FC } from "react";
import Wraper from "./Wraper";

const form = createForm();
const group = {
  "form.getState()": form.getState(),
  "form.createField().getState()": form.createField({ name: "field" }).getState(),
  "form.createArrayField().getState()": form.createArrayField({ name: "array-field" }).getState(),
  "form.createObjectField().getState()": form
    .createObjectField({ name: "object-field" })
    .getState(),
  "form.createVoidField().getState()": form.createVoidField({ name: "void-field" }).getState(),
  "normal object: {}": {},
};

const list = [
  isFormState,
  isFieldState,
  isArrayFieldState,
  isObjectFieldState,
  isVoidFieldState,
  isGeneralFieldState,
  isDataFieldState,
];

const StateChecker: FC = () => (
  <Wraper
    footer={
      <div>
        <p>
          <strong>说明：</strong>
        </p>
        <ul>
          <li>
            <code>isFormState</code>：判断一个对象是否为 <code>IFormState</code> 对象
          </li>
          <li>
            <code>isFieldState</code>：判断一个对象是否为 <code>IFieldState</code> 对象
          </li>
          <li>
            <code>isArrayFieldState</code>：判断一个对象是否为 <code>IArrayFieldState</code> 对象
          </li>
          <li>
            <code>isObjectFieldState</code>：判断一个对象是否为 <code>IObjectFieldState</code> 对象
          </li>
          <li>
            <code>isVoidFieldState</code>：判断一个对象是否为 <code>IVoidFieldState</code> 对象
          </li>
          <li>
            <code>isGeneralFieldState</code>：判断一个对象是否为 <code>IFieldState</code>、
            <code>IArrayFieldState</code>、<code>IObjectFieldState</code>、
            <code>IVoidFieldState</code> 对象
          </li>
          <li>
            <code>isDataFieldState</code>：判断一个对象是否为 <code>IFieldState</code>、
            <code>IArrayFieldState</code>、<code>IObjectFieldState</code> 对象
          </li>
        </ul>
        <p>
          <strong>总结：</strong>
        </p>
        <ul>
          <li>
            <code>isField</code> 和 <code>isDataField</code> 返回是一样的，但{" "}
            <code>isFieldState</code> 和 <code>isDataFieldState</code> 是不一样的
          </li>
        </ul>
      </div>
    }
    header={<h2>表单对象检查</h2>}
    group={group}
    list={list}
  />
);

export default StateChecker;
