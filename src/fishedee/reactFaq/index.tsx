import { FC } from "react";
import SelectScope from "../../components/select/contrast/SelectScope";
import EffectError from "./EffectError";
import FieldOnChange from "./FieldOnChange";

const ReactFaq: FC = () => (
    <>
        <FieldOnChange />
        <SelectScope
            footer={
                <div>
                    <p>
                        文档错误之一：<code>scope</code> 在 <code>reaction</code> 中默认将 <code>Field</code> 传过去
                    </p>
                    <p>
                        即便是 <code>click</code>，该用就用，因为 <code>onFieldReact</code> 也不响应 <code>click</code>
                        ，大不了将 <code>$self</code>、<code>$deps</code> 传递过去
                    </p>
                </div>
            }
            header={
                <h2>
                    React.7.2: 使用 <code>scope</code>
                </h2>
            }
        />
        <EffectError />
    </>
);

export default ReactFaq;
