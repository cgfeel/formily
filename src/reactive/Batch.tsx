import { NumberPicker } from "@formily/antd-v5";
import { createForm, onFieldValueChange } from "@formily/core";
import { createSchemaField } from "@formily/react";
import { autorun, batch, observable } from "@formily/reactive";
import { FC } from "react";
import Form from "../components/form/form";
import FormItem from "../components/formItem/form-item";
import ButtonRun from "./components/ButtonRun";
import Line from "./components/Line";
import Panel from "./components/Panel";

const Delay = () =>
  new Promise<{ date: number }>(resolve => {
    setTimeout(() => resolve({ date: Date.now() }), 200);
  });

const obs = observable({ aa: 0, bb: 0, cc: "empty", dd: "empty" });
const form = createForm({
  effects: () => {
    onFieldValueChange("aa", field => {
      Delay().then(
        batch.bound!(({ date }) => {
          obs.aa += field.value;
          obs.cc = `form:${obs.aa}`;
          obs.bb += field.value * 2;
          obs.dd = `origin:${date}`;
        }),
      );
    });
    onFieldValueChange("bb", field => {
      batch.scope!(() => {
        obs.aa -= field.value;
        obs.cc = `form:${obs.aa}`;
        obs.bb -= field.value * 2;
        obs.dd = `origin:${obs.bb}`;
      });
    });
    onFieldValueChange("cc", field => {
      batch(() => {
        batch.endpoint!(() => {
          console.log("end in form");
        });
        batch.scope!(() => {
          obs.aa = field.value + Date.now();
        });
        obs.bb = field.value * 2 + Date.now();
        obs.dd = `origin:${obs.bb}`;
        batch.scope!(() => {
          obs.cc = `form:${obs.aa}`;
        });
      });
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    NumberPicker,
  },
});

autorun(() => {
  console.log("batch", obs.aa, obs.bb, obs.cc, obs.dd);
});

const Batch: FC = () => (
  <Panel
    footer={
      <div>
        <p>
          定义批量操作，内部可以收集依赖：在同一个任务事件中拆分成不同的微任务，通过堆栈分别执行
        </p>
        <p>
          第一个拆分演示，在 <code>betch</code> 中代码的顺序：
        </p>
        <ol>
          <li>
            在 <code>batch.bound</code> 中设置 <code>cc</code>；
          </li>
          <li>
            在 <code>batch.endpoint</code> 中设置结束回调；
          </li>
          <li>
            在 <code>batch.scope</code> 中设置 <code>aa</code>；
          </li>
          <li>
            最后设置 <code>bb</code> 和 <code>dd</code>；
          </li>
        </ol>
        <p>执行顺序如下：</p>
        <ol>
          <li>
            在 <code>batch.scope</code> 中设置 <code>aa</code>；
          </li>
          <li>
            设置 <code>bb</code> 和 <code>dd</code>；
          </li>
          <li>
            在 <code>batch.endpoint</code> 中设置结束回调；
          </li>
          <li>
            在 <code>batch.bound</code> 中设置 <code>cc</code>；
          </li>
        </ol>
        <p>结论：</p>
        <ol>
          <li>
            <code>batch.scope</code> 在 <code>batch</code> 堆了一个微任务，优先执行，如果把{" "}
            <code>batch.scope</code> 滞后也会随 <code>bb</code> 和 <code>dd</code> 一起设置，见{" "}
            <code>form</code> 中的 <code>batch</code> 示例；
          </li>
          <li>
            执行完压入的微任务之后开始执行 <code>batch</code> 中的 <code>bb</code> 和{" "}
            <code>dd</code>
          </li>
          <li>
            完成后调用 <code>batch.endpoint</code> 结束回调；
          </li>
          <li>
            由于 <code>batch.bound</code> 只接受 <code>Promis</code> 回调，所以会在{" "}
            <code>batch</code> 任务结束之后执行；
          </li>
        </ol>
        <p>
          <code>batch.scope</code> 和 <code>batch.bound</code> 在 <code>batch</code>{" "}
          外部调用和普通的函数基本一致，哪怕是在 <code>formily</code> 表单受控中使用，不同的是：
        </p>
        <ol>
          <li>
            <code>batch</code> 对象可以收集依赖
          </li>
          <li>
            <code>batch.bound</code> 只接受 <code>Promise</code>{" "}
            的回调，并且可以通过第二个参数绑定一个上下文
          </li>
        </ol>
      </div>
    }
    header={<h2>batch</h2>}
  >
    <ButtonRun
      tips="批量操作-拆分成不同的微任务"
      onClick={() =>
        batch(() => {
          Promise.resolve().then(
            batch.bound!(() => {
              obs.cc = "cccc";
            }),
          );
          batch.endpoint!(() => {
            console.log("end");
          });
          batch.scope!(() => {
            obs.aa = 123;
          });
          obs.bb = 321;
          obs.dd = "dddd";
        })
      }
    >
      click it
    </ButtonRun>
    <ButtonRun
      tips="批量操作-在同一个任务栈执行"
      onClick={() =>
        batch(() => {
          obs.aa = 0;
          obs.cc = "empty";
          obs.bb = 0;
          obs.dd = "empty";
        })
      }
    >
      click it
    </ButtonRun>
    <Line tips="表单测试">
      <Form layout="vertical" form={form}>
        <SchemaField>
          <SchemaField.Number
            name="aa"
            title="batch.bound"
            x-component="NumberPicker"
            x-decorator="FormItem"
          />
          <SchemaField.Number
            name="bb"
            title="batch.scope"
            x-component="NumberPicker"
            x-decorator="FormItem"
          />
          <SchemaField.Number
            name="cc"
            title="batch"
            x-component="NumberPicker"
            x-decorator="FormItem"
          />
        </SchemaField>
      </Form>
      <p>
        第一个 <code>batch.bound</code> 和 第二个 <code>batch.scope</code> 都在 <code>batch</code>{" "}
        外部执行
      </p>
    </Line>
  </Panel>
);

export default Batch;
