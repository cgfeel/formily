import { autorun, observable } from "@formily/reactive";
import { FC } from "react";
import ButtonRun from "./components/ButtonRun";
import Line from "./components/Line";
import Panel from "./components/Panel";
import { Button } from "antd";

const obs1 = observable({ aa: 0 });
const obs2 = observable({ aa: 0 });
const obs3 = observable({ aa: 0 });

const dispose1 = autorun(() => {
  console.log("autorun", obs1.aa);
});

const dispose2 = autorun(() => {
  const obsb = autorun.memo(() => observable({ bb: 0 }));
  console.log("autorun.memo", obs2.aa, obsb.bb++);
});

const dispose3 = autorun(() => {
  const obsc = autorun.memo(() => observable({ cc: 0 }));
  // console.log("effect out", obsc.cc);
  console.log("autorun.effect", obs3.aa, obsc.cc++);
  autorun.effect(() => {
    // console.log("effect inner", obsc.cc);
    obsc.cc++;
  }, []);
});

const Autorun: FC = () => (
  <Panel
    footer={
      <div>
        <p>从演示中知道：</p>
        <ul>
          <li>
            <code>observable</code> 创建的对象会在文件导入时立即声明，无需等待 <code>React</code>{" "}
            组件被调用
          </li>
          <li>
            <code>autorun</code> 返回一个方法，用于阻止 <code>observable</code> 对象后续更新
          </li>
          <li>
            和 <code>React</code> 不同，<code>autorun.memo</code>{" "}
            第二个依赖参数不传递，将提供默认值只在初始化响应一次，而非每一次
          </li>
          <li>
            而 <code>autorun.effect</code> 则需要传递依赖，否则会持续执行
          </li>
        </ul>
        <p>
          演示中 <code>effect</code> 执行顺序如下：
        </p>
        <ol>
          <li>初始化：a:0</li>
          <li>autorun：a:0, b:0 {"<-"} (autorun.memo)</li>
          <li>autorun：console.log(a:0, b:0++)</li>
          <li>autorun：{"effect(() => { a:0, b:1++ }, [])"}</li>
          <li>
            autorun：由于 <code>autorun.memo</code> {"<-"} 只允许初始执行一次，所以不再执行
          </li>
          <li>autorun：console.log(a:0, b:2++)</li>
          <li>
            autorun：由于 <code>autorun.effect</code> {"<-"} 只允许初始执行一次，所以不再执行
          </li>
          <li>-- 以上会在文件引入时立即执行，无需调用页面组件 --</li>
          <li>autorun：console.log(a:1, b:3++) {"<-"} (由：abs3.aa++ 触发)</li>
          <li>autorun：console.log(a:2, b:4++) {"<-"} (由：abs3.aa++ 触发)</li>
          <li>autorun：console.log(a:3, b:5++) {"<-"} (由：abs3.aa++ 触发)</li>
          <li>dispose 阻断后续请求</li>
        </ol>
      </div>
    }
    header={<h2>autorun</h2>}
  >
    <ButtonRun
      tips="autorun"
      onClick={() => {
        obs1.aa++;
        dispose1();
      }}
    >
      通过 dispose 阻止后续更新
    </ButtonRun>
    <Line tips="autorun.memo">
      <Button
        onClick={() => {
          if (obs2.aa++ === 2) dispose2();
        }}
      >
        累加 3 次停止
      </Button>
      <p>由于在文件导入时初始值 0 就已经响应输出了，所以点按钮从 1 开始，后面所有演示均如此</p>
    </Line>
    <ButtonRun
      tips="autorun.effect"
      onClick={() => {
        if (obs3.aa++ === 2) dispose3();
      }}
    >
      累加 3 次停止
    </ButtonRun>
  </Panel>
);

export default Autorun;
