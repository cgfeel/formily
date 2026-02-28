import { autorun, observable } from "@formily/reactive";
import { Button, Space } from "antd";
import { FC } from "react";
import ButtonRun from "./components/ButtonRun";
import Line from "./components/Line";
import Panel from "./components/Panel";

const obs1 = observable({ aa: { bb: 123 } });
const obs2 = observable.shallow({ aa: { bb: 123 } });
const obs3 = observable({ aa: 11, bb: 22 });

const computed1 = observable.computed(() => obs3.aa + obs3.bb);
const computed2 = observable.computed({
  get: () => `aa: ${obs3.aa}, bb: ${obs3.bb}`,
  set: value => {
    switch (value) {
      case "translate":
        obs3.bb++;
        break;
      case "double":
        obs3.aa *= 2;
    }
  },
});

const ref1 = observable.ref(1);
const ref2 = observable.ref({ aa: { bb: 123 } });

const box = observable.box(1);

autorun(() => {
  console.log("深度劫持响应式对象", obs1.aa.bb);
});

autorun(() => {
  console.log("浅劫持响应式对象", obs2.aa.bb);
});

autorun(() => {
  console.log("计算缓存器：直接计算", computed1.value);
});

autorun(() => {
  console.log("计算缓存器：get/set", computed2.value);
});

autorun(() => {
  console.log("引用劫持响应式对象1", ref1.value);
});

autorun(() => {
  console.log("引用劫持响应式对象2", ref2.value);
});

autorun(() => {
  console.log("引用劫持响应式对象box", box.get());
});

const Observable: FC = () => {
  return (
    <Panel
      footer={
        <div>
          <p>
            主要用于创建不同响应式行为的 <code>observable</code> 对象，同时可以作为{" "}
            <code>annotation</code> 给 <code>define</code> 用于标记响应式属性
          </p>
          <p>
            <code>observable.ref</code> 常用于表单初始化后作为组件挂起的事件响应处理，例如响应{" "}
            <code>TreeSelect</code> 组件下拉菜单点击触发的异步加载 [
            <a href="http://localhost:3000/async">查看</a>]
          </p>
        </div>
      }
      header={<h2>observable</h2>}
    >
      <ButtonRun
        tips="observable/observable.deep"
        onClick={() => {
          obs1.aa.bb = Date.now();
        }}
      >
        每次点击都更新
      </ButtonRun>
      <Line tips="observable.shallow">
        <Space direction="vertical">
          <Button
            onClick={() => {
              obs2.aa.bb = Date.now();
            }}
          >
            不响应 ({"obs2.aa.bb = Date.now()"})
          </Button>
          <Button
            onClick={() => {
              obs2.aa = { bb: Date.now() };
            }}
          >
            可响应 ({"obs2.aa = { bb: Date.now() }"})
          </Button>
        </Space>
        <p>只会对目标对象的第一级属性操作响应</p>
      </Line>
      <Line tips="observable.computed">
        <Space direction="vertical">
          <Button
            onClick={() => {
              obs3.aa++;
            }}
          >
            直接计算累加 aa ({"obs3.aa++"})
          </Button>
          <Button
            onClick={() => {
              computed2.value = "translate";
            }}
          >
            累加 bb ({'computed2.value = "translate"'})
          </Button>
          <Button
            onClick={() => {
              computed2.value = "double";
            }}
          >
            双倍 aa ({'computed2.value = "double"'})
          </Button>
        </Space>
        <p>通过 get/set 方法计算值。获取值什么类型，传递的值就应该是什么类型</p>
      </Line>
      <Line tips="observable.ref">
        <Space direction="vertical">
          <Button
            onClick={() => {
              ref1.value = Date.now();
            }}
          >
            简单数据类型直接赋值 ({"ref1.value = Date.now()"})
          </Button>
          <Button
            onClick={() => {
              ref2.value = { aa: { bb: Date.now() } };
            }}
          >
            复杂类型需要覆盖整个对象 ({"ref2.value = { aa: { bb: Date.now() } };"})
          </Button>
        </Space>
        <p>
          引用对象只能修改整改 <code>ref.value</code> 否则不会触发响应
        </p>
      </Line>
      <Line tips="observable.box">
        <Button
          onClick={() => {
            box.set(Date.now());
          }}
        >
          box.set
        </Button>
        <p>
          与 <code>ref</code> 相似，只是读写数据是通过 <code>get/set</code> 方法
        </p>
      </Line>
    </Panel>
  );
};

export default Observable;
