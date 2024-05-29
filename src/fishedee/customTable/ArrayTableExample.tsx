import { Field, createForm } from "@formily/core";
import { FC } from "react";
import Wrapper from "../fieldAction/Wrapper";
import SchemaField from "./SchemaField";
import { FormConsumer } from "@formily/react";

const form = createForm({
    initialValues: {
        data: [
            { name: "小新", age: 5 },
            { name: "广志", age: 32 },
            { name: "美伢", age: 29 },
        ],
    },
});

const ArrayTableExample: FC = () => (
    <Wrapper
        footer={
            <div>
                <p>和文档不同的地方：</p>
                <ul>
                    <li>
                        文档采用原生 <code>table</code> 封装，这里选择了在 <code>ArrayBase</code> 基础上封装{" "}
                        <code>antd table</code>，因为考虑到了列表自增，采用 <code>ArrayBase</code> 更符合实际开发
                    </li>
                    <li>将文档所有特性整合到一个演示中</li>
                </ul>
                <p>演示功能：①实现自增表格控件；②实现表格控件父子、同行联动；③增加列表删除、上下移动操作</p>
                <p>
                    使用 <code>ArrayBase</code> 总结：
                </p>
                <ul>
                    <li>
                        创建一个自定义组件，将其通过 <code>observer</code> 包裹，并通过 <code>ArrayBase.mixin</code>{" "}
                        绑定在 <code>ArrayBase</code> 对象中
                    </li>
                    <li>
                        如果有需要提供对外渲染组件，如：<code>Addition</code>、<code>Remove</code>、<code>Copy</code>等
                    </li>
                    <li>
                        提供内部 <code>schema</code> 渲染逻辑，例如通过 <code>schema.reduceProperties</code> 遍历{" "}
                        <code>schema</code>、通过 <code>RecursionField</code> 渲染过滤的 <code>schema</code> 节点
                    </li>
                </ul>
                <p>
                    除此之外对于 <code>ArrayTable</code> 的模型要了解 <code>antd table</code> 的特性，可以先分成 2
                    个部分：
                </p>
                <ul>
                    <li>
                        首先是表格头部栏目，但在 <code>antd</code> 中并没有提供类似 <code>th</code> 这样的标签作为受控
                    </li>
                    <li>
                        其次就是单元格，在 <code>antd</code> 中可以通过 <code>column</code> 中的 <code>render</code>{" "}
                        为每个单元格包裹一个 <code>context</code>
                    </li>
                </ul>
                <p>
                    没有提供 <code>th</code> 的表头通过在表格外面渲染对应的虚拟节点实现受控，步骤如下：
                </p>
                <ul>
                    <li>
                        先将提供的 <code>schema</code> 初步计算出所需的 <code>colums</code>，演示中是通过{" "}
                        <code>compileColumns</code>，这个时候 <code>schema</code> 是没有挂载的，所以也没有{" "}
                        <code>display</code> 这个属性
                    </li>
                    <li>
                        然后将上面拿到的结果作为 <code>source</code> 通过 <code>RecursionField</code>{" "}
                        迭代并生成挂载节点，从而引发重新渲染，渲染过程中也同时会响应 <code>schema</code> 中的{" "}
                        <code>reactions</code>，做出相应结果；这时提供给 <code>Table</code> 组件的 <code>column</code>{" "}
                        为空
                    </li>
                    <li>
                        重新渲染再次调用 <code>compileColumns</code> 去计算 <code>column</code>，由于{" "}
                        <code>schema</code> 已挂载，所以 <code>display</code> 这个属性即默认的 <code>visible</code>
                    </li>
                    <li>
                        拿到上述结果计算出要展示的 <code>column</code>，演示中通过 <code>compileTableSource</code>
                    </li>
                </ul>
                <p>注意事项：</p>
                <ul>
                    <li>
                        表头受控通过外部渲染对应的 <code>schema</code>，这个时候 需要设置 <code>RecursionField</code>{" "}
                        属性 <code>onlyRenderSelf</code>，仅渲染自身，其路径是：
                        <code>{"{table-name}.{column-dataIndex}"}</code>
                    </li>
                    <li>
                        而单元格内部渲染的 <code>schema</code> 和表头一样，不同的是需要设置属性{" "}
                        <code>onlyRenderProperties</code>，这样路径则是{" "}
                        <code>{"{table-name}.{index}.{field-name}"}</code>
                    </li>
                    <li>
                        由于包裹 <code>Field</code> 的节点 <code>column</code>是 <code>VoidField</code>
                        ，所以匹配的时候可以忽略虚拟字段直接查找内部的字段
                    </li>
                    <li>
                        对于没有指定 <code>id</code> 的 <code>dataSource</code>，需要通过 <code>rowKey</code> 指定
                    </li>
                    <li>
                        由于每次增删改都是一个 <code>proxy</code>，所以更新 <code>Table</code> 的{" "}
                        <code>dataSource</code> 得靠背一个新对象
                    </li>
                </ul>
            </div>
        }
        form={form}
        header={<h2>Core.6.4-6.7: ArrayTable 列表组件</h2>}>
        <SchemaField scope={{ test: (field: Field) => console.log(field.path.toString()) }}>
            <SchemaField.Array name="data" x-component="ArrayField">
                <SchemaField.Object>
                    <SchemaField.Void
                        title="姓名"
                        x-component="ArrayField.Column"
                        x-reactions={{
                            dependencies: ["data"],
                            fulfill: {
                                schema: {
                                    "x-component-props.title": "{{'姓名：' + $deps[0].length + '行'}}",
                                },
                            },
                        }}>
                        <SchemaField.String name="name" x-component="Input" />
                    </SchemaField.Void>
                    <SchemaField.Void title="年龄" x-component="ArrayField.Column">
                        <SchemaField.String name="age" x-component="NumberPicker" />
                    </SchemaField.Void>
                    <SchemaField.Void title=" 姓名长度" x-component="ArrayField.Column">
                        <SchemaField.String
                            name="name-length"
                            x-component="Input"
                            x-pattern="readPretty"
                            x-reactions={{
                                dependencies: [".name"],
                                fulfill: {
                                    state: { value: "{{$deps[0]?.length||0}}" },
                                },
                            }}
                        />
                    </SchemaField.Void>
                    <SchemaField.Void title="操作" x-component="ArrayField.Column">
                        <SchemaField.Void x-component="ArrayField.Remove" />
                        <SchemaField.Void x-component="ArrayField.MoveDown" />
                        <SchemaField.Void x-component="ArrayField.MoveUp" />
                    </SchemaField.Void>
                </SchemaField.Object>
                <SchemaField.Void title="添加条目" x-component="ArrayField.Addition" />
            </SchemaField.Array>
        </SchemaField>
        <code className="consumer">
            <pre>
                <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
            </pre>
        </code>
    </Wrapper>
);

export default ArrayTableExample;
