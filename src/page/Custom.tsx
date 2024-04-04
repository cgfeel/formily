import { FC } from "react";
import FieldControlled from "../components/controlled/observerControlled/FieldControlled";
import CustomIndex from "../components/controlled/schemaControlled/custom";
import CustomCard from "../components/custom/CustomCard";
import IDcard from "../components/custom/IDcard";
import PriceInterval from "../components/custom/PriceInterval";
import MarkupSchema from "../components/formTab/MarkupSchema";

const Custom: FC = () => (
    <>
        <IDcard />
        <PriceInterval />
        <CustomCard />
        <MarkupSchema
            footer={
                <div>
                    <p>
                        由于 <code>@formily/antd-v5</code> 使用的 API 版本与现有的 <code>antd</code>{" "}
                        不一致，在此做了修复
                    </p>
                    <p>
                        受限：可包裹在 <code>schema</code> 中或 <code>Field</code>{" "}
                        中实现联动，如果要在外部实现联动可以通过 <code>observable</code>
                    </p>
                </div>
            }
            header={
                <h2>
                    修复 <code>@formily/antd-v5</code> 组件
                </h2>
            }
        />
        <FieldControlled
            footer={
                <p>
                    既可以在 <code>schema</code> 中使用，也可以在外部通过 <code>observable</code> 与表单内部字段联动
                </p>
            }
            header={
                <h2>
                    通过 <code>observer</code> 包裹组件
                </h2>
            }
        />
        <CustomIndex
            footer={
                <p>
                    通过 <code>hooks</code> 实现模型之前的联动
                </p>
            }
            header={
                <h2>
                    在 <code>observer</code> 组件中使用 <code>hooks</code>
                </h2>
            }
        />
    </>
);

export default Custom;
