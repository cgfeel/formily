import { createForm } from "@formily/core";
import { TabsProps } from "antd";
import { Suspense, lazy } from "react";

const connectForm = createForm();
const mapPropsForm = createForm();
const mapReadForm = createForm();

const Connect = lazy(() => import("./shared/connect"));
const Observer = lazy(() => import("../reactive/ObserverCom"));
const ReactContext = lazy(() => import("./shared/ReactContext"));
const Schema = lazy(() => import("./shared/Schema"));

const sharedItems: Exclude<TabsProps["items"], undefined> = [
    {
        disabled: true,
        key: "shared",
        label: "Shared",
    },
    {
        key: "connect",
        label: "connect",
        children: (
            <Suspense fallback={<>Loading...</>}>
                <Connect
                    footer={
                        <div>
                            <p>
                                主要用于对第三方组件库的无侵入接入 <code>Formily</code>
                            </p>
                            <p>
                                入参传入第一个参数是要接入的组件，后面的参数都是组件映射器，每个映射器都是一个函数，通常我们会使用内置的{" "}
                                <code>mapProps</code> 和 <code>mapReadPretty</code> 映射器
                            </p>
                            <p>
                                <code>connect</code> 和 <code>observer</code> 的区别，<code>connect</code>{" "}
                                用于接入第三方组件，
                                <code>observer</code> 用于自定义组件
                            </p>
                        </div>
                    }
                    form={connectForm}
                    header={
                        <h2>
                            <code>connect</code>
                        </h2>
                    }
                />
            </Suspense>
        ),
    },
    {
        key: "context",
        label: "context",
        children: (
            <Suspense fallback={<>Loading...</>}>
                <ReactContext />
            </Suspense>
        ),
    },
    {
        key: "mapProps",
        label: "mapProps",
        children: (
            <Suspense fallback={<>Loading...</>}>
                <Connect
                    footer={
                        <div>
                            <p>
                                将 <a href="https://core.formilyjs.org/zh-CN/api/models/field">Field</a>{" "}
                                属性与组件属性映射的适配器函数，主要与 <code>connect</code> 函数搭配使用
                            </p>
                            <ul>
                                <li>
                                    参数可以传对象(<code>key</code> 是 <code>field</code> 的属性，<code>value</code>{" "}
                                    是组件的属性，如果 <code>value</code> 为<code>true</code>，代表映射的属性名相同)
                                </li>
                                <li>参数可以传函数，函数可以直接对属性做更复杂的映射</li>
                            </ul>
                        </div>
                    }
                    form={mapPropsForm}
                    header={
                        <h2>
                            <code>mapProps</code>
                        </h2>
                    }
                />
            </Suspense>
        ),
    },
    {
        key: "mapReadPretty",
        label: "mapReadPretty",
        children: (
            <Suspense fallback={<>Loading...</>}>
                <Connect
                    footer={
                        <div>
                            <p>
                                因为大多数第三方组件都不支持阅读态，如果想要快速支持阅读态的话，即可使用{" "}
                                <code>mapReadPretty</code> 函数来映射一个阅读态组件
                            </p>
                        </div>
                    }
                    form={mapReadForm}
                    header={
                        <h2>
                            <code>mapReadPretty</code>
                        </h2>
                    }
                    initialValue="Hello world"
                    pattern="readPretty"
                />
            </Suspense>
        ),
    },
    {
        key: "observer",
        label: "observer",
        children: (
            <Suspense fallback={<>Loading...</>}>
                <Observer
                    footer={
                        <div>
                            <h3>
                                <code>observer</code>
                            </h3>
                            <p>
                                <code>observer</code> 是一个 <code>HOC</code>，用于为 <code>react</code> 函数组件添加{" "}
                                <code>reactive</code> 特性。当一个组件内部使用了 <code>observable</code>{" "}
                                对象，而你希望组件响应 <code>observable</code> 对象的变化时使用。
                            </p>
                            <p>
                                注意：<code>observer</code> 只能接收 <code>callable</code> 函数组件，不支持{" "}
                                <code>React.forwardRef</code> | <code>React.memo</code> 等包裹的组件。
                            </p>
                            <h3>
                                <code>Observer</code>
                            </h3>
                            <p>
                                接收一个 <code>Function RenderProps</code>，只要在 <code>Function</code>{" "}
                                内部消费到的任何响应式数据，都会随数据变化而自动重新渲染，也更容易实现局部精确渲染
                            </p>
                            <p>
                                其实该 API 与 <code>FormConsumer</code> 的作用基本一致，只是 <code>FormConsumer</code>{" "}
                                在 <code>RenderProps</code> 参数中透出了当前上下文的 <code>form</code> 实例
                            </p>
                        </div>
                    }
                    header={
                        <h2>
                            <code>observer</code>
                        </h2>
                    }
                />
            </Suspense>
        ),
    },
    {
        key: "schema",
        label: "Schema",
        children: (
            <Suspense fallback={<>Loading...</>}>
                <Schema />
            </Suspense>
        ),
    },
];

export default sharedItems;
