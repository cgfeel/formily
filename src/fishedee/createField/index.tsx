import { FC } from "react";
import Panel from "../Panel";

const CreateField: FC = () => (
    <Panel header={<h2>core.7: 字段</h2>}>
        <p>fish 文档只介绍了路径和赋值，建议通过单元测试了解字段特性：</p>
        <ul>
            <li>
                <code>ArrayField</code>：./src/__test__/array.spec.ts
            </li>
            <li>
                <code>Field</code>：./src/__test__/field.spec.ts
            </li>
            <li>
                <code>ObjectField</code>：./src/__test__/object.spec.ts
            </li>
            <li>
                <code>VoidField</code>：./src/__test__/void.spec.ts
            </li>
        </ul>
    </Panel>
);

export default CreateField;
