import {
  FieldDataSource,
  FormPathPattern,
  GeneralField,
  IFormProps,
  onFieldInit,
  onFieldReact,
} from "@formily/core";
import { action, observable } from "@formily/reactive";
import { fetchData } from "../server";

const asyncDataSource = (pattern: FormPathPattern, service: FormServerType) => {
  // 创建引用劫持响应式对象
  const keyword = observable.ref("");

  /**
   * 用于监听某个字段初始化的副作用钩子
   *  - 在调用 createField 的时候通过这个 hooks 为组件添加一个 Props，
   *  - 用于接收组件的 onSearch 回调，并赋值给 keyword
   */
  onFieldInit(pattern, field => {
    field.setComponentProps({
      onSearch: (value: string) => {
        keyword.value = value;
      },
    });
  });

  // 被动联动模式，当匹配的表单值发生改变，将值和表单回调在异步获取数据
  onFieldReact(pattern, field => {
    if ("loading" in field) field.loading = true;
    service({ keyword: keyword.value, field }).then(
      // action.bound 和普通的回调函数区别在于，它接收第二个参数，允许绑定上下文
      action.bound!((data: FieldDataSource) => {
        if ("dataSource" in field) field.dataSource = data;
        if ("loading" in field) field.loading = false;
      }),
    );
  });
};

const asyncSearch: IFormProps["effects"] = () => {
  asyncDataSource("select", async ({ keyword }) => {
    if (keyword === "") return [];
    return new Promise(resolve => fetchData(keyword, resolve));
  });
};

type FormServerType = (param: { keyword: string; field: GeneralField }) => Promise<FieldDataSource>;

export default asyncSearch;
