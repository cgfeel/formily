# Formily Demo

按照 `formily` 官方文档，最小化复现每个示例。本项目不提供线上预览，请直接在本地运行`npm install && npm run start`

**示例包含 4 个文档：**

-   `formily` 主文档：https://formilyjs.org/zh-CN
-   `@formily/reactive`：https://reactive.formilyjs.org/zh-CN
-   `@formily/core`：https://core.formilyjs.org/zh-CN
-   `@formily/react`：https://react.formilyjs.org/zh-CN

其中组件采用 `@formily/antd-v5` 为主文档作演示。不包含 `@formily/vue`，技术栈为 `React`，在 `formily` 中两者大同小异

**演示分两部分：**

-   页面演示：`src/page` 目录下，下载安装安装依赖后 `npm run start`
-   单元测试：`src/__test__` 目录下，下载安装安装依赖后 `npm run test`

所有示例根据自己理解添加了说明、并根据自己的理解补充示例；在文档最后补充两个作业：

-   一个第三方文档 fishedee 的 `formily` 总结做一套练习
-   补充一个掘金练习：自增对象

## 工程文件

主要的使用的包：

-   NodeJS：`v18.13.0`
-   脚手架：`Create React App` + `react-app-rewired` + `customize-cra`
-   表单和UI库：`formily ` + `antd` + `antd-style`
-   数据模拟：`mocker-api` + `mockjs`

> 启动项目前需要先安装一次依赖：`npm install`

和官方文档（以下简称“文档”）不同点：

-   采用`antd v5`作为默认演示，文档默认是v4
-   采用`antd-style`作为`css-in-js`框架，可以在这里查看详细演示 [[查看](https://github.com/cgfeel/ant-design-style)]
-   由于官方提供的`@formily/antd-v5`采用的版本是 `5.6`，很多 API 已发生变更，因此在演示组件中对部分组件重新修改
-   根据演示文件，根据自己的理解，重新调整了文件和目录结构
-   根据阅读的理解，添加个人附加案例

## 阅读说明

-   如上所述，`formily v2`的Api会将个人解读，通过源码注释写在源码
-   而`README.md`将会每个演示包含的注解，作为索引简要的罗列出来，方便查找
-   查找方法，每一个内容简介关联着对应示例，运行演示查找对应文件可以找到源码注释

## 示例

### 快速上手

-   URL：`/start`
-   目录：https://github.com/cgfeel/formily/blob/main/src/page/Start.tsx
-   包含章节：
    -   快速开始 [[查看](https://formilyjs.org/zh-CN/guide/quick-start)]

### 场景案例

#### 登录注册

-   URL：`/login`
-   目录：https://github.com/cgfeel/formily/blob/main/src/page/LoginRegister.tsx
-   包含章节：
    -   登录注册 [[查看](https://formilyjs.org/zh-CN/guide/scenes/login-register)]

**包含：**

通过`Markup Schema`创建登录：

-   验证模式：`createForm.validateFirst`
-   字段说明：`SchemaField.String`，及相关属性
    -   关联反应：`SchemaField.reactions`，主动受控和被动受控、受控依赖更新依赖组件状态
-   创建自定义表单组件

通过`Json Schema`创建登录

-   包含：`SchemaField.schema`，使用JSON配置表单验证及其优点

通过`JSX`创建登录：

-   包括：`jsx`和`schema`的不同，以及优缺点

通过`Markup Schema`创建注册：

-   组件：`ArrayItems`、`Cascader`、`DatePicker`、`Editable`、`FormGrid`、`FormItem`、`FormLayout`、`Password`、`Select`、自定义组件`IDUpload`
-   关联受控：作用域变量`$deps`、`$self`，受控行为、路径查找
-   虚拟节点：充当`<Form.Item>`，充当交互组件，虚拟节点和对象节点不同处

通过`Json Schema`创建注册：

-   通过`@emotion/styled`来设置组件样式，从而解决`Json Schema`配置中无法使用`antd-style`的Hooks来配置组件样式

通过`JSX`创建注册：

-   `Jsx` 自增控件路径查找
-   由于 `ArrayItems` 组件限定 `Schema` 场景，这里由 `ArrayField` + `ArrayBase`代替，包括代替方案存在的问题

通过`Markup Schema`修改密码

通过`Json Schema`修改密码：

-   `Json Schema`中的 `key` 和表单 `name` 的关系

通过`JSX`修改密码

---- 分割线 ----

#### 编辑详情

-   URL：`/edit-detail`
-   目录：https://github.com/cgfeel/formily/blob/main/src/page/EditDetail.tsx
-   包含章节：
    -   编辑详情 [[查看](https://formilyjs.org/zh-CN/guide/scenes/edit-detail)]
    -   `PreviewText` [[查看](https://antd.formilyjs.org/zh-CN/components/preview-text)]

**包含：**

通过组件`PreviewText.Placeholder`实现预览：

-   默认全局预览方式
-   局部预览方式（下方查询列表[[查看](#查询列表)]，个人补充了完整示例）
-   切换预览和编辑状态
-   表单组件根据可编辑状态受控响应（个人补充）
-   使用`useField`获取可编辑状态

巩固（个人补充）：

-   无论组件怎么拆分，每个表单声明`createForm`只能匹配一个`Form`
-   无法使用`useField`以及无法通过受控获取可编辑状态时，可消费`FormConsumer`获取实时状态

> 无法在`Filed`系列组件中通过`component`或`decorator`包裹的组件均无法受控、也不能使用`useField`，这也包过除此之外的所有 `React` 组件

---- 分割线 ----

#### 查询列表

-   URL：`/table`
-   目录：
    -   https://github.com/cgfeel/formily/blob/main/src/page/Grid.tsx
    -   https://github.com/cgfeel/formily/blob/main/src/page/Table.tsx
-   包含章节：
    -   查询列表 [[查看](https://formilyjs.org/zh-CN/guide/scenes/query-list)]
    -   `ArrayTable` [[查看](https://antd5.formilyjs.org/zh-CN/components/array-table)]
    -   `FormGrid` [[查看](https://antd5.formilyjs.org/zh-CN/components/form-grid)]

**包含：**

由于查询列表文档只提供了一个概念以及一个参考性的代码，这里按照要求实践：

-   `QueryList`：主要负责在顶层发请求
-   `QueryTable`：一个`ArrayTable`，主要就是解析 `Schema` 子树，自己拼装出 `Table` 需要的 `Columns` 数
-   `QueryForm`：负责查询筛选列表

为了实现这个需求，同时参考了两篇文档：

-   `ArrayTable`、`FormGrid`

概括：

-   `FormConsumer`消费数据更新改变提交状态
-   `ArrayTable`的使用方法及总结、`ArrayTable.Column`的使用方法及总结
-   `SchemaField`内的组件使用与`React`组件的不同
-   通过`createForm`实现主动受控和被动受控
-   受控中使用`when`
-   自定义组件`PriceInterval`，和之前的不同的是这里还自定义了组件的 `onChange`事件

---- 分割线 ----

#### 弹窗与抽屉

-   URL：`/dialog-drawer`
-   目录：https://github.com/cgfeel/formily/blob/main/src/page/DialogDrawer.tsx
-   包含章节：
    -   弹窗与抽屉 [[查看](https://formilyjs.org/zh-CN/guide/scenes/dialog-drawer)]
    -   `FormDialog` [[查看](https://antd5.formilyjs.org/zh-CN/components/form-dialog)]
    -   `FormDrawer` [[查看](https://antd5.formilyjs.org/zh-CN/components/form-drawer)]

**包含：**

演示了几个能力：

-   快速打开，关闭能力：通过`IFormDialog`对象触发`open`和`close`
-   中间件能力：`forCancel`、`forConfirm`、`forOpen`（`Drawer`仅支持`forOpen`）
-   渲染函数内可以响应式能力：`schema`和`Field`
-   上下文共享能力：仅限`Dialog`

个人补充：

-   性能调优，通过拆分`schema`和`Field`，具体见示例
-   `Dialog`和`Drawer`行为差异
-   修复`Drawer`适配问题

> **修复：** 截止于 24.03.18 `FormDrawer` 中使用 `antd v5` 的 `Dom` 结构和 `Api` 已发生更改，影响包括：`FormDrawer.Extra` 和 `FormDrawer.Footer` 无效；可以拷贝这个组件并替换组件路径：https://github.com/cgfeel/formily/blob/main/src/components/drawer/form-drawer/index.tsx

---- 分割线 ----

#### 分步表单

-   URL：`/step-form`
-   目录：https://github.com/cgfeel/formily/blob/main/src/page/StepForm.tsx
-   包含章节：
    -   分步表单 [[查看](https://formilyjs.org/zh-CN/guide/scenes/step-form)]
    -   `FormStep` [[查看](https://antd5.formilyjs.org/zh-CN/components/form-step)]

**包含：**

-   `FormStep.createFormStep`和`createForm`一样，每次声明只能匹配一个`form`
-   在前面登录示例中演示了`createSchemaField`设置`scope`，分步表单演示了后置动态设置`scope`

---- 分割线 ----

#### 选项卡、手风琴表单、自增选项卡、自增折叠表单

-   URL：`/tab-collapse`
-   目录：https://github.com/cgfeel/formily/blob/main/src/page/TabCollapse.tsx
-   包含章节：
    -   选项卡/手风琴表单 [[查看](https://formilyjs.org/zh-CN/guide/scenes/tab-form)]
    -   `FormCollapse` [[查看](https://antd5.formilyjs.org/zh-CN/components/form-collapse)]
    -   `FormTab` [[查看](https://antd5.formilyjs.org/zh-CN/components/form-tab)]
    -   `ArrayCollapse` [[查看](https://antd5.formilyjs.org/zh-CN/components/array-collapse)]
    -   `ArrayTabs` [[查看](https://antd5.formilyjs.org/zh-CN/components/array-tabs)]

**包含：**

-   `antd v5`对于选项卡、手风琴表单、自增选项卡、自增折叠表单 API 的调整，以及交互操作
-   巩固：`Json Schema` 中，对于需要为 `props` 传递上下文的情况，可以通过 `scope` 动态添加上下文对象
-   拆分 `Markup Schema`组件 及 `Json Schema`

**修复：**

截止于 24.03.20，`@formily/antd-v5`部分组件 API 已废弃，我将其修复包括有：

-   `FormTab`：不再支持 `TabPane` 改为 `items` [[查看](https://github.com/cgfeel/formily/blob/main/src/components/tab/form-tab/index.tsx)]
-   `FormCollapse`：`Api` 已发生更改，不再支持 `CollapsePane` 改为 `items` [[查看](https://github.com/cgfeel/formily/blob/main/src/components/formCollapse/form-collapse/index.tsx)]
-   `ArrayCollapse`：不再支持 `CollapsePane` 改为 `items` [[查看](https://github.com/cgfeel/formily/blob/main/src/components/arrayCollapse/array-collapse/index.tsx)]

如果使用过程中官方仍旧没有修复，请查看对应的文件，拷贝修复

---- 分割线 ----

### 进阶指南

#### 实现表单验证

-   URL：`/validate`
-   目录：https://github.com/cgfeel/formily/blob/main/src/page/Validate.tsx
-   包含章节：
    -   表单校验 [[查看](https://formilyjs.org/zh-CN/guide/advanced/validate)]

**包含：**

-   内置规则校验：`props`，`x-validator`对象、`x-validator`数组对象
-   内置格式校验：`props`，`x-validator`对象（字符、对象、字符数组、对象数组）
-   自定义规则校验：`registerValidateRules`
-   自定义格式校验：`registerValidateFormats`
-   异步校验：自定义规则校验 + `Promise`
-   联动校验：`reactions`
-   定义文案：`registerValidateLocale`

**和文档不同：**

-   自定义规则校验，`Json Schema`是通过`scope`这个 `props` 动态添加局部定义规则；这样更符合实际应用场景
-   联动校验通过 3 种不同的方式进行：`createForm`中的`effects`、`schema`中的`x-reactions`，`Field`中的`reactions` 函数

---- 分割线 ----

#### 实现表单布局

-   URL：`/layout`
-   目录：https://github.com/cgfeel/formily/blob/main/src/page/Layout.tsx
-   包含章节：
    -   实现表单布局 [[查看](https://formilyjs.org/zh-CN/guide/advanced/layout)]
    -   `FormLayout` [[查看](https://antd5.formilyjs.org/zh-CN/components/form-layout)]
    -   `FormItem` [[查看](https://antd5.formilyjs.org/zh-CN/components/form-item)]
    -   `FormGrid` [[查看](https://antd5.formilyjs.org/zh-CN/components/form-grid)]
    -   `Space` [[查看](https://antd5.formilyjs.org/zh-CN/components/space)]

**包含：**

-   `Schema`中使用自定义非表单组件
-   根据`antd v5.15.*`的 API 对组件进行修复
-   使用`antd v5`自带的`css-in-js`添加组件样式
-   通过联动修改`FormItem`的布局
-   为`Schema`动态添加`Component`

**组件修复：**

-   `Canscader`：将接口对应至 `antd v5` 最新的 API
-   `Form`：为 `FormLayout` 提供上下文支持
-   `FormButtonGroup`：适配 `FormLayout`
-   `FormItem`：
    -   适配 `FormLayout`，补充必选样式
    -   修复 `Select.multiple`、 `Switch` 在布局尺寸变更时的适配
-   `FormLayout`：
    -   补充 `layout: inline`布局支持，修复必选等接口
    -   添加布局样式支持

> 原本是想为 `@formily/antd-v5` 提交 PR，由于当前 `@formily/antd-v5` 依赖的是 `antd v5.6` 导致 API 不兼容，又不能修改工程依赖，所以采用这种方式进行修改

---- 分割线 ----

#### 实现异步数据源

-   URL：`/async`
-   目录：https://github.com/cgfeel/formily/blob/main/src/page/AsyncCom.tsx
-   包含章节：
    -   实现异步数据源 [[查看](https://formilyjs.org/zh-CN/guide/advanced/async)]
    -   `Select` [[查看](https://antd5.formilyjs.org/zh-CN/components/select)]
    -   `TreeSelect` [[查看](https://antd5.formilyjs.org/zh-CN/components/tree-select)]
    -   `Cascader` [[查看](https://antd5.formilyjs.org/zh-CN/components/cascader)]

**包含：**

-   `Select` 同步获取数据、异步搜索、异步联动的三种模式（下方注1）
-   `TreeSelect` 同步获取数据、异步联动的三种模式
-   `Cascader` 异步数据三种模式

> 注1：总结中，所有提到的三种模式分别为：`Markup Schema`、`Json Schema`、`Field Jsx`，如果没有单独说明，二种模式为：`Markup Schema`、`Json Schema`

**个人补充案例：**

-   `TreeSelect` 异步加载数据三种模式
-   `Cascader` 修复静态数据加载 [[查看](https://github.com/cgfeel/formily/blob/main/src/components/cascader/cascader/index.tsx)]
    -   适配 `antd v5` 最新版本中已废弃，而 `formily` 中又必须传入的属性
-   `Cascader` 异步加载数据三种模式
-   对比异步数据不同的加载方式

**异步数据加载方式：**

-   初始只加载一次
-   依赖输入内容每次加载：`field.query({path}).value()`
-   通过 `observable.ref` 创建引用劫持响应式对象
-   通过 `scope` 初始只加载一次
-   通过 `scope` 依赖输入内容每次加载

---- 分割线 ----

#### 实现表单受控

-   URL：`/controlled`
-   目录：https://github.com/cgfeel/formily/blob/main/src/page/Controlled.tsx
-   包含章节：
    -   实现表单受控 [[查看](https://formilyjs.org/zh-CN/guide/advanced/controlled)]

**几个受控模式：**

-   普通受控模式，随 React 组件生命周期，演示：只存在控制者、通过 `props` 受控、通过 `ref` 受控
-   响应式值受控：使用 `observable` 提供数据用于响应受控
-   `Schema` 整体受控：通过替换整个 `form` 和 `schema` 实现表单整体切换
-   `Schema` 片段联动：
    -   通过 `form.clearFormGraph` 回收字段模型，从而实现部分表单更新
    -   通过 `observer` 包裹函数组件响应字段更新，常用于自定义组件

**包含：**

-   修复文档普通受控模式的问题
-   最佳响应实践
-   反模式：和文档不同，这里分别从 3 个案例来演示受控逐步去掉响应的过程
-   补充 `form.setValues` 包含的 4 个类型的值的区别（文档并没有说明）

**巩固：**

-   在 `React` 组件中要响应表单数据，要么刷新整个表单；要么在受控组件上分别包裹 `observer` 响应对应的表单数据变化
-   而在受控表单中 (`SchemaField`)，则建议通过“响应式值受控”，这样不会多余消费 `React` 组件性能
-   关于响应函数
    -   `observable`：创建响应值，提供给控制者或 `Form.values`，它包含一个 `observable.ref`，在“实现异步数据源”有提到
    -   `observer`：响应组件的响应，用于在组件内容响应依赖数据的更新，暂且可以把它当作 `memo` 来理解
    -   `Observer`：用于在组件中提供一个响应区域，暂且可以把它当作 `useMemo` 来理解

**附加：**

在这个演示中，包含 4 个 `@formily/react` 内容：`RecursionField`、`useForm`、`useField`、`observer`，分别在演示备注中说明，稍后在具体章节再演示

---- 分割线 ----

#### 实现联动逻辑

-   URL：`/controlled`
-   目录：https://github.com/cgfeel/formily/blob/main/src/page/LinkAges.tsx
-   包含章节：
    -   实现联动逻辑 [[查看](https://formilyjs.org/zh-CN/guide/advanced/linkages)]

**总结：**

1.  一对一通过：路径匹配 [[查看](https://core.formilyjs.org/zh-CN/api/entry/form-path#formpathpattern)]
2.  一对多通过：通配符 `*()`，如：`*(.input1,input2)`
3.  依赖联动通过 `field.query` 或 `form.values` 或 `schema` 中使用 `dependencies`
4.  链式联动：依赖的字段可以层层匹配，例如：A 控制 B，B 控制 C，当 A 操作 B 的时候，C 也有可能受到响应变化，反之同理
5.  循环联动：和依赖联动是一样的，区别在于依赖字段之间可以相互操作，谨慎使用，可能会导致逻辑问题
6.  自身联动：将匹配的路径设为自身，或在被动联动中去掉路径
7.  异步联动：在联动 `hook` 回调中，可以接受异步函数作为方法，作为异步联动，例如：`fetch`

**包含：**

-   以上7 个模式的 `Effect` 和 `Schema` 方式，以及被动逻辑和联动逻辑分别演示

**主动和被动联动：**

-   `onFieldValueChange` 主动联动，`onFieldReact` 被动联动
-   也可以在 `schema` 响应中使用 `reactions`，区别在于：主动联动有 `target` 属性

**因此：**

1. 在 `schema` 中，只有主动联动才需要指定生命周期 `effect`
2. 主动联动适合监听某一个固定字段，所以路径从监控的指定字段开始匹配
3. 被动联动适合某一个字段受控于其他多个字段对齐的影响，所以路径从被监控的字段开始

**附加：**

`FormEffectHooks` 内容：`FieldEffectHooks`、`setFormState`、`setFieldState`、`SchemaReactions`、`FieldReaction`，稍后在具体章节再演示，也可以启动演示项目查看相关备注

---- 分割线 ----

#### 实现联动计算器

-   URL：`/calculator`
-   目录：https://github.com/cgfeel/formily/blob/main/src/page/Calculator.tsx
-   包含章节：
    -   实现联动计算器 [[查看](https://formilyjs.org/zh-CN/guide/advanced/calculator)]

**包含：**

联动逻辑运算 + 自增表单的一个练习，提供 `Markup Schema` 和 `Json Schema`

---- 分割线 ----

#### 实现自定义组件

-   URL：`/custom`
-   目录：https://github.com/cgfeel/formily/blob/main/src/page/Custom.tsx
-   包含章节：
    -   实现自定义组件 [[查看](https://formilyjs.org/zh-CN/guide/advanced/custom)]
    -   `connect` [[查看](https://react.formilyjs.org/zh-CN/api/shared/connect)]
    -   `mapProps` [[查看](https://react.formilyjs.org/zh-CN/api/shared/map-props)]
    -   `mapReadPretty` [[查看](https://react.formilyjs.org/zh-CN/api/shared/map-read-pretty)]

**包含：**

文档并没有提到具体内容，这里对前面所有内容归纳总结如下：

-   通过 `props` 转发给组件
-   定制 `antd` 组件
-   自定义非表单组件
-   修复 `@formily/antd-v5` 组件
-   通过 `observer` 包裹组件
-   在 `observer` 组件中使用 `hooks`
-   通过 `connect` 接入组件库

---- 分割线 ----

#### 数据解构、业务逻辑、打包

-   包含章节：
    -   前后端数据差异兼容方案 [[查看](https://formilyjs.org/zh-CN/guide/advanced/destructor)]
    -   管理业务逻辑 [[查看](https://formilyjs.org/zh-CN/guide/advanced/business-logic)]
    -   按需打包 [[查看](https://formilyjs.org/zh-CN/guide/advanced/build)]

**数据解构 (前后端数据差异兼容方案)：**

-   URL：`/destructor`
-   目录：https://github.com/cgfeel/formily/blob/main/src/page/Destructor.tsx

将 `name` 由普通的字符修改为 `[{name},{name}]` 这样的方式解构字段

**管理业务逻辑：** 无案例，总结如下

两种方式：

-   全局设定：`form` 中的 `effects`
-   局部设定：`JSX` 中使用 `reactions` 或 `schema` 中使用 `x-reactions`

局部设定有缺点：

-   优点：简单、直接写在字段上
-   存疑：文档提到多场景，多字段维护，但 `reactions` 是可以和 `scope` 结合使用的
-   缺点：不能逻辑复用，即便是 `scope` 结合使用的

全局设定有缺点：

-   优点：多字段处理，量化处理、逻辑复用、逻辑分离为单独文件
-   缺点：不能作为服务端配置

文档建议：

-   纯源码模式
    -   字段数量庞大，逻辑复杂，优先选择 `effects` 中定义逻辑
    -   字段数量少，逻辑简单，优先选择 `reactions` 中定义逻辑
-   `Schema` 模式
    -   不存在异步逻辑，优先选择结构化 `reactions` 定义逻辑
    -   存在异步逻辑，或者大量计算，优先选择函数态 `reactions` 定义逻辑

**按需打包：** 无案例，总结如下

-   `antd v5` 采用 `tree shaking` 方式，无需使用文档中提到的 `babel-plugin-import`
-   本项目是基于 `create-react-app`，如果需要配置 `Webpack` 还是建议添加这两个包：`react-app-rewired` `customize-cra`

---- 分割线 ----

### Reactive Library

-   URL：`/reactive`
-   目录：https://github.com/cgfeel/formily/blob/main/src/page/Reactive.tsx
-   包含章节：
    -   整个 API 文档 [[查看](https://reactive.formilyjs.org/zh-CN/api/observable)]

**总结：**

-   暂且可以将其作为表单中的 `mbox` 来看，不同之处在于 `reactive` 更注重于对响应对象的操作，其提供的 API 都围绕这方面
-   建议本地运行查看，这里只罗列索引，本地注释了详细备注

#### observable

创建响应对象

-   `observable/observable.deep`：深拷贝
-   `observable.shallow`：浅拷贝，响应对比
-   `observable.computed`：响应计算，直接计算，`get\set` 模式
-   `observable.ref`：引用响应劫持对象，只能用于修改对象的`value`才能发生响应
-   `observable.box`：`observable.ref` 的 `get\set` 模式

#### autorun

在演示中演示了执行过程的顺序

-   `autorun`：接收一个函数函数作为 `tracker`，并返回一个 `dispose` 函数用于停止响应
-   `autorun.memo`：在 `autorun` 内部创建一个响应对象
-   `autorun.effect`：在 `autorun` 内部的副作用处理

> `autorun` 的执行过程通过微任务来实现

#### reaction

在演示中演示了执行过程的顺序

-   在响应过程中个执行一个脏检查，并返回一个 `dispose` 函数用于停止响应
-   方法中 `tracker` 会随着响应数据更新调用，而 `subscriber` 只对更新数据有变化时才响应

#### batch

定义批量操作：在同一个任务事件中拆分成不同的微任务，通过堆栈分别执行

-   `batch.scope`：局部batch
-   `batch.abound`：异步 batch
-   `batch.endpoit`：结束回调

在演示中演示了：

-   `batch` 内部执行顺序
-   `batch` 外部执行响应

> `batch` 的执行过程通过微任务来实现

#### action

和 `batch` 一样，不同在于：

-   不收集依赖，关于依赖详细见演示
-   没有 `endpoint`

#### defined

手动定义领域模型，在文档中有个问题：

-   在定义的模型类中 `box` 初始值是数值，之后通过 `define` 修正为 `observable.box`
-   然而 `number` 类型是没有 `get\set` 操作的，这点对于 `vsc`、`eslint` 来说是不能理解的

修正：

-   直接将 `box` 类型通过 `observable.box` 声明，取消 `define` 类型覆盖

#### model

快速定义模型，详细见演示

#### observe

和 `autorun` 的不同：

-   监听 `observable` 对象的所有操作，`autorun` 只响应值的变化
-   不响应 `observable` 初始值

#### markRaw

两个特征

-   包裹对象，使其 `observable` 不响应
-   包裹类，使其类声明的对象都不受 `observable` 响应

#### markObservable

`observable` 不响应有 3 类：`React Node` 与带有 `toJSON`、`toJS` 方法的对象

两个特征：

-   包裹对象，使其 `observable` 响应
-   包裹类，使其类声明的对象受 `observable` 响应

#### raw

从 `observable` 对象中获取源数据

#### toJS

将 `observable` 转化为普通的 JS 对象，转换后的值不能用于依赖收集

#### untracked

函数内包裹的 `observable` 永远不会被收集依赖

#### hasCollected

用于检测某段执行逻辑是否存在依赖收集，演示中分别鉴定：

-   `toJS` 属性对象、`markObservable` 对象、正常的 `observable` 对象、`markRaw` 对象、`toJS`对象
-   只有 `markObservable` 对象、正常的 `observable` 对象能够正常依赖

#### Tracker

手动跟踪依赖，特征如下：

-   `tracker.track` 调用后不会重复执行
-   `Tracker` 构造中的 `scheduler` 声明后会随依赖值的变化而调用

借此每次跟踪结束后，需要通过 `scheduler` 来决定后续跟踪

#### Type Checker

-   `isObservable`：判断是否为 `observable` 对象，演示了 `observable` 和 `observable toJS`
-   `isAnnotation`：判断是否为 `Annotation` 对象，演示了 `action.bound` 和普通函数
-   `isSupportObservable`：是否可以被 `observable` 对象，演示了普通对象和带有 `toJS` 的对象

#### observer

在 `React` 中，将 `Function Component` 变成 `Reaction`

-   可以把 `observer` 和 `Observer` 的关系看作是 `memo` 和 `useMemo`
-   演示中将文档示例做了拆分，建议对照比较
-   没有记录 `vue` 部分，当前以 `React` 技术栈为主

更多往下查看单元测试

---- 分割线 ----

### Core Library

-   URL：`/core`
-   目录：https://github.com/cgfeel/formily/blob/main/src/page/Core.tsx
-   包含章节：
    -   整个 API 文档 [[查看](https://core.formilyjs.org/zh-CN/api/entry/create-form)]

我将使用 `formily` 将这个库里对应的对象和属性，做成在线工具的形式进行演示，建议本地运行上手操作

#### createForm

创建一个 `form` 对象，其对象属性可以直接通过本地演示操作查看效果

<img width="639" alt="image" src="https://github.com/cgfeel/formily/assets/578141/dd99e88c-2346-44b6-9c7b-451c86a6bf32">

#### Form Effect Hooks

表单生命周期

-   加载卸载：`onFormInit`、`onFormMount`、`onFormUnmount`
-   表单变化：`onFormReact`、`onFormValuesChange`、`onFormInitialValuesChange`、`onFormInputChange`
-   表单提交：`onFormSubmitStart`、`onFormSubmitSuccess`、`onFormSubmitEnd`、`onFormSubmitFailed`、`onFormSubmit`
-   提交验证：`onFormSubmitValidateStart`、`onFormSubmitValidateSuccess`、`onFormSubmitValidateFailed`、`onFormSubmitValidateEnd`
-   表单验证：`onFormValidateStart`、`onFormValidateEnd`、`onFormValidateSuccess`、`onFormValidateFailed`

生命周期顺序在本地演示说明，更多请本地运行查看：

<img width="507" alt="image" src="https://github.com/cgfeel/formily/assets/578141/9eb69c18-cdee-4536-967b-b5567e6c19d4">

#### Field Effect Hooks

-   加载卸载：`onFieldInit`、`onFieldMount`、`onFieldUnmount`
-   字段变化：`onFieldReact`、`onFieldChange`、`onFieldValueChange`、`onFieldInitialValueChange`、`onFieldInputValueChange`
-   字段验证：`onFieldValidateStart`、`onFieldValidateEnd`、`onFieldValidateFailed`、`onFieldValidateSuccess`

生命周期顺序在本地演示说明，更多请本地运行查看：

<img width="385" alt="image" src="https://github.com/cgfeel/formily/assets/578141/0a56834c-09aa-47f4-8914-a57986e011bc">

#### Form Hooks API

-   创建自定义钩子监听器：`createEffectHook`，详细见单元测试补充
-   创建一个副作用的上下文：`createEffectContext`，提供一个 `provide`，将组件中的能力托管出来，提供一个消费方 `consume` 在外部消费上下文托管对象
-   在表单生命周期中获取当前 `form` 对象：`useEffectForm`，可以搭配 `createEffectContext` 一起使用

#### Form Checkers

-   对象检查：`isForm`、`isField`、`isArrayField`、`isObjectField`、`isVoidField`、`isGeneralField`、`isDataField`、`isQuery`
-   状态检查：`isFormState`、`isFieldState`、`isArrayFieldState`、`isObjectFieldState`、`isVoidFieldState`、`isGeneralFieldState`、`isDataFieldState`

本地使用 `formily` 开发演示工具，更多请本地运行查看：

<img width="677" alt="image" src="https://github.com/cgfeel/formily/assets/578141/b8fa5ba1-68cf-4f4b-895c-5062c8816f82">

#### Form Path

本地使用 `formily` 开发演示工具

-   包含：属性、数据路径语法、匹配路径语法、方法、静态方法进
-   支持自定义路径匹配查询结果

更多请本地运行查看：

<img width="634" alt="image" src="https://github.com/cgfeel/formily/assets/578141/9cec78f8-de13-4208-bfd4-405515a30f0e">

<img width="637" alt="image" src="https://github.com/cgfeel/formily/assets/578141/ac7867d1-3e57-4c9f-a293-e9b30d6701f1">

#### Form Validator Registry

`formily` 验证格式、定制信息、定制模板、校验规则、语言等，包含：

-   `setValidateLanguage`：定制语言
-   `registerValidateFormats`：注册校验格式，包含全局注册、局部注册
-   `registerValidateLocale`：定制提示
-   `registerValidateMessageTemplateEngine`：定制信息模板
-   `registerValidateRules`：定制校验规则，包含全局定制、局部定制
-   `getValidateLocaleIOSCode`：获取内置存在的 `ISO Code`

更多往下查看单元测试

---- 分割线 ----

### React Library

-   URL：`/react`
-   目录：https://github.com/cgfeel/formily/blob/main/src/page/ReactLibrary.tsx
-   包含章节：
    -   整个 API 文档 [[查看](https://react.formilyjs.org/zh-CN/api/components/field)]

详细了解建议：查看本地演示或查看单元测试

#### Components

-   `Field`：普通字段
-   `ArrayField`：数组字段
-   `ObjectField`：对象字段
-   `VoidField`：虚拟字段
-   `SchemaField`：解析 `Schema`、渲染字段、提供 `scope`、传递上下文
-   `RecursionField`：递归渲染组件，主要有 2 种，将属性递归，组件自身递归。详细见单元测试
-   `FormProvider`：入口组件，传递上下文
-   `FormConsumer`：在 `SchemaField` 外部消费表单
-   `ExpressionScope`：自定义组件内部给 `json-schema` 表达式传递局部作用域
-   `RecordScope`：作用域注入组件一个有层级对象，主要三个变量：`$record`、`$index`、`$lookup`
-   `RecordsScope`：作用域注入组件一个对象集合，主要三个变量：`$records`

#### Hooks

-   `useExpressionScope`：自定义组件中读取表达式作用域
-   `useField`：自定义组件内读取当前字段属性，操作字段状态等
-   `useFieldSchema`：自定义组件中读取当前字段的 `Schema` 信息
-   `useForm`：自定义组件中读取当前 `Form` 实例
-   `useFormEffect`：自定义组件中往当前 `Form` 实例额外注入副作用逻辑
-   `userParentForm`：读取最近的 `Form` 或者 `ObjectField` 实例

**本地演示补充：**

-   `useExpressionScope` 包含各个层级作用域下发捕获
-   `useField` 和 `useFieldSchema` 区别
-   `userParentForm` 补充了父子表单交互示例

#### Shared

-   `connect`：第三方组件库的无侵入接入 `Formily`
-   `mapProps`：将 `Field` 属性与组件属性映射的适配器函数，主要与 `connect` 函数搭配使用
-   `mapReadPretty`：给组件赋予阅读状态，主要与 `connect` 函数搭配使用
-   `observer`：为 `react` 函数组件添加 `reactive` 特性

**需要通过单元测试了解：**

以下建议通过单元测试、`formily` 组件源码了解使用

-   `FormContext`：`Form` 上下文，可以获取当前 `Form` 实例
-   `FieldContext`：字段上下文，可以获取当前字段实例
-   `SchemaMarkupContext`：`Schema` 标签上下文
-   `SchemaContext`：字段 `Schema` 上下文
-   `SchemaExpressionScopeContext`：`Schema` 表达式作用域上下文
-   `SchemaOptionsContext`：`Schema` 全局参数上下文，主要用于获取从 `createSchemaField` 传入的参数
-   `Schema`：解析、转换、编译 `json-schema` 的能力

> 从 `@formily/react` 中可以导出 `Schema` 这个 `Class`，但是不希望使用 `@formily/react`，可以单独依赖 `@formily/json-schema` 这个包

更多往下查看单元测试

---- 分割线 ----

## 单元测试

### Reactive Library

内部方法不再当前研究范围，不包含测试用例：`array.spec.ts` [[查看](https://github.com/alibaba/formily/blob/formily_next/packages/reactive/src/__tests__/array.spec.ts)]

#### `action`

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/reactive/action.spec.ts

不可收集依赖的批量操作，具体特性见单元测试

`action` 批量操作普通用法：

-   不使用 `action` 每次修改 `observable` 都会响应一次
-   `action` 内部所有修改只记录一次响应
-   在 `track` 函数中使用 `action`
-   `action.bound` 绑定一个批量操作
-   在 `track` 函数中使用 `action.bound`
-   `action.scope` 在 `action` 中分批执行
-   使用 `action.socpe.bound`
-   在 `track` 函数中使用 `action.scope`
-   在 `track` 函数中使用 `action.scope.bound`

`define` 定义模型中使用 `action` 批量操作：

-   `define` 中使用 `action`
-   在 `track` 函数中使用模型 `action`
-   `define` 中使用 `action.bound`
-   `track` 函数中使用模型 `action.bound`
-   `define` 中使用 `action.scope`
-   `define` 中使用 `action.scope.bound`
-   `track` 函数中使用模型 `action.scope`
-   `track` 函数中使用模型 `action.scope.bound`
-   嵌套 `action` 批量操作在 `reaction` 中 `subscrible`
-   嵌套 `action` 和 `batch` 批量操作在 `reaction` 中 `subscrible`

#### `batch`

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/reactive/batch.spec.ts

定义批量操作，内部可以收集依赖

`batch` 批量操作普通用法：

-   不使用 `batch` 每次修改 `observable` 都会响应一次
-   `batch` 内部所有修改只记录一次响应
-   在 `track` 函数中使用 `batch`
-   `batch.bound` 绑定一个批量操作
-   在 `track` 函数中使用 `batch.bound`
-   `batch.scope` 在 `batch` 中分批执行
-   使用 `batch.socpe.bound`
-   在 `track` 函数中使用 `batch.scope`
-   在 `track` 函数中使用 `batch.socpe.bound`
-   在 `batch` 中抛出错误

`define` 定义模型中使用 `batch` 批量操作：

-   `define` 中使用 `batch`
-   在 `track` 函数中使用模型 `batch`
-   `define` 中使用 `batch.bound`
-   `track` 函数中使用模型 `batch.bound`
-   `define` 中使用 `batch.scope`
-   `define` 中使用 `batch.socpe.bound`
-   在 `track` 函数中使用模型 `batch.scope`
-   在 `track` 函数中使用 `batch.socpe.bound`

批量操作结束回调，`batch` 独有 `action` 没有：

-   `batch.endpoint` 注册批量执行结束回调
-   `batch.endpoint` 意外的结束 - 不提供回调也不会执行
-   直接使用 `batch.endpoint`

> `batch.endpoint` 不是微任务，而是单纯的回调函数

其他：

-   在 `reaction` 有效的收集依赖触发 `subscrible`
-   在 `reaction subscript` 中无效的依赖不会反向触发响应

参考：

> `reaction` 中 `subscrible` 不收集依赖 [[查看](#%E6%B5%85%E5%93%8D%E5%BA%94-autorunreaction)]

-   正常的情况：`track` 函数会收集依赖，其他中两个例子是通过 `autorun` 收集依赖触发 `reaction` 的 `track` 函数中的依赖进行响应
-   不正常的情况：在 `reaction` 的 `subscrible` 函数中会随着 `track` 函数响应触发调用，但在 `subscrible` 添加 `observable` 对象，试图更新反向触发响应是行不通的

#### `annotations` - `observable`

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/reactive/annotations.spec.ts

创建不同响应式行为的 `observable` 对象：

-   `observable` 创建劫持对象 - 默认深度劫持
-   `observable.shallow` 创建的是浅劫持响应式对象
-   `observable.box` 创建引用劫持响应式对象，带有 `get`/`set` 方法
-   `observable.ref` 创建引用劫持响应式对象
-   `action.bound` 中更新 `observable` 对象
-   非批量操作中更新 `observable` 对象
-   `observable.computed` 创建一个计算缓存器
-   创建一个链式 `observable.computed`
-   `model` 快速定义领域模型
-   `model` 中创建一个计算缓存器，计算数组长度
-   `model` 中创建一个计算缓存器，收集依赖
-   `observable.computed` 容错机制
-   `observable.computed` 接受一个带有 get 属性方法的对象
-   `untracked` 中使用 `observable.computed` 对象
-   `define` 定义一个类为领域模型

#### `observable` - `Map`

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/reactive/collections-map.spec.ts

劫持 `Map` 类型对象作为 `observable` 对象：

-   创建一个 `Map` 类型的 `observable` 对象
-   在 `autorun` 中响应 `map` 类型对象
-   在 `autorun` 中响应 `map.size`
-   在 `autorun` 中通过 `for of` 迭代 `map` 获取值
-   在 `autorun` 中通过 `forEach` 迭代 `map` 获取值
-   在 `autorun` 中通过 `for of` 迭代 `map.keys` 获取值
-   在 `autorun` 中通过 `for of` 迭代 `map.values` 获取值
-   在 `autorun` 中通过 `for of` 迭代 `map.entries` 获取值
-   在 `autorun` 中通过 `map.clear` 触发响应
-   在 `autorun` 中不响应错误的 `map` 自定义属性
-   在 `autorun` 中不响应未更新的数据
-   在 `autorun` 中不响应 `map` 类型原始数据
-   在 `autorun` 中不响应 `map` 类型原始数据迭代
-   在 `autorun` 中不响应 `map` 类型原始数据的增删操作
-   在 `autorun` 中不响应 `map` 类型原始数据长度
-   在 `autorun` 中不响应 `map` 类型原始数据添加
-   `map` 类型的 `observable` 对象中允许使用 `object` 作为 `key`
-   `map` 类型的 `observable` 对象中允许设置一个普通对象，或是 `observable` 对象作为 `value`
-   浅劫持 `map` 对象，不会响应对象的属性值修改

#### `observable` - `Set`

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/reactive/collections-set.spec.ts

劫持 `Set` 类型对象作为 `observable` 对象

-   创建一个 `set` 类型的 `observable` 对象
-   在 `autorun` 中响应 `set` 类型对象
-   在 `autorun` 中响应 `set.size`
-   在 `autorun` 中通过 `for of` 迭代 `set`
-   在 `autorun` 中通过 `forEach` 迭代 `set`
-   在 `autorun` 中通过 `for of` 迭代 `set.keys` 获取值
-   在 `autorun` 中通过 `for of` 迭代 `set.values` 获取值
-   在 `autorun` 中通过 `for of` 迭代 `set.entries` 获取值
-   在 `autorun` 中不响应 `set` 错误的自定义属性
-   在 `autorun` 中不响应没有变更的 `set` 对象
-   在 `autorun` 中不响应 `set` 类型原生数据迭代
-   在 `autorun` 中不响应 `set` 类型原生数据的新增、删除
-   在 `autorun` 中不响应 `set` 类型原生数据的 `set.size`
-   在 `autorun` 中不响应来自 `set` 类型原生数据添加的项目

#### `observable` - `WeakMap`

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/reactive/collections-weakmap.spec.ts

劫持 `WeakMap` 类型对象作为 `observable` 对象

-   创建一个 `WeakMap` 类型的 `observable` 对象
-   在 `autorun` 中响应 `WeakMap` 类型对象
-   在 `autorun` 中不响应 `WeakMap` 不合理的自定义属性更新
-   在 `autorun` 中不响应 `WeakMap` 中没有更新的属性
-   在 `autorun` 中不响应 `WeakMap` 原生对象
-   在 `autorun` 中不响应来自 `WeakMap` 原生对象增删操作

#### `observable` - `WeakSet`

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/reactive/collections-weakset.spec.ts

劫持 `WeakSet` 类型对象作为 `observable` 对象

-   创建一个 `WeakSet` 类型的 `observable` 对象
-   在 `autorun` 中响应 `WeakSet` 对象
-   在 `autorun` 中不响应 `WeakSet` 对象不合理的自定义属性更新
-   在 `autorun` 中不响应 `WeakSet` 对象没有更新的属性
-   在 `autorun` 中不响应 `WeakSet` 原生对象
-   在 `autorun` 中不响应来自 `WeakSet` 原生对象触发的增删操作

#### `observable` - `other`

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/reactive/observable.spec.ts

-   `array observable` 操作
-   `contains` 判断 `observable` 对象中是否包含指定对象
-   不能直接设置 `observable` 的 `__proto__`

#### 创建模型：`define`、`model`

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/reactive/define.spec.ts

手动定义领域模型

-   `define` + `observable`，响应手动定义领域模型
-   `define` + `observable.shallow`，响应手动定义浅劫持领域模型
-   `define` + `observable.box`，响应手动定义一个带有 `get`/`set` 方法的领域模型
-   `define` + `observable.ref`，响应手动定义一个领域模型的引用
-   `define` + `observable` + `batch`，批量操作中响应手动定义的领域模型
-   `define` + `observable.computed`，响应手动定义一个领域模型的计算缓存器
-   `define` 手动定义领域模型容错机制
-   `model` 快速定义领域模型

`model` 是快速定义一个模型

-   `getter`/`setter` 属性自动声明 `computed`
-   函数自动声明 `action`
-   普通属性自动声明 `observable`

`define` 需要手动定义对象，可以是对象，也可以是一个类，需要手动指定对象属性、方法作为 `observable`

#### 浅响应 `autorun`、`reaction`

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/reactive/autorun.spec.ts

接收一个 `tracker` 函数用于响应 `observable` 数据变化，他们都返回一个 `dispose` 函数用于停止响应。分别如下：

-   `autorun`：只接受 `tracker` 函数
-   `reaction`：
    -   接受 `tracker` 函数
    -   接受 `callback` 函数作为 `subscrible`
    -   接受一个属性用于初始化执行、脏检查等

除此之外在 `tracker` 函数中会自动收集 `observable` 依赖，除非：

-   使用了非 `observable` 对象
-   使用的对象被 `action`、`untracked` 包裹

注意：

-   浅响应只响应指定对象，对象下的属性除非指定情况下会收集，否则不会主动收集
-   `reaction` 可以通过 `equals` 脏检查将对象通过 `JSON.stringify` 转换成字符串作为深比较，但建议深比较通过下方的 `observe` 来响应

测试示例：

-   创建一个 `autorun`
-   创建一个 `reaction`，监听 `subscrible` 订阅
-   `reaction` 初始化后立即响应
-   `reaction` 中 `subscrible` 不收集依赖
-   `reaction` 中进行数据的脏检查
-   `reaction` 响应中浅比较 - 默认
-   `reaction` 响应中深比较
-   在 `autorun` 中递增 `observable` 对象
-   `autorun` 初始化收集的依赖决定后续响应情况
-   `autorun` 中间接递归响应 - 单向递归
-   `autorun` 中间接递归响应 - 批量操作递归
-   `autorun` 跳出响应前，通过头部赋值收集依赖
-   `autorun.memo` 在 `autorun` 中用于创建持久引用数据
-   使用 `observable` 对象创建一个 `autorun.memo`
-   `autorun.effect` 在 `autorun` 添加一个微任务，在响应结束前执行
-   `autorun.memo` 中添加依赖
-   `autorun.memo` 响应依赖更新以及 `autorun` 停止响应
-   `autorun.memo` 容错，传递无效值
-   在 `autorun` 外部使用 `autorun.memo` 会抛出错误
-   在 `autorun` 中不使用 `autorun.memo` 无效递增
-   `autorun.effect` 微任务的执行和结束回调
-   `autorun.effect` 结束前 `autorun` 已 `dispose`
-   `autorun.effect` 添加依赖
-   `autorun.effect` 不添加依赖默认为 `[{}]`，随 `autorun` 每次都响应
-   `autorun.effect` 在 `autorun` 外部使用将抛出错误
-   `autorun.effect` 容错
-   在 `batch` 内部停止 `autorun` 响应
-   `autorun` 依赖 `observable.computed` 计算的值
-   `autorun` 依赖 `observable.computed` 对象在 `delete` 后的响应
-   `autorun` 依赖 `observable.computed` 使用 `Set` 类型对象
-   `autorun` 依赖 `observable.computed` 删除 `Set` 类型子集
-   `autorun` 依赖 `observable.computed` 使用 `Map` 类型对象
-   `autorun` 依赖 `observable.computed` 删除 `Map` 类型子集
-   `autorun` 中有条件的依赖收集
-   `reaction` 中有条件的依赖收集、`subscrible`、`fireImmediately`

#### 浅响应 `Tracker`

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/reactive/tracker.spec.ts

在依赖发生变化时不会重复执行 `tracker` 函数，需要用户手动重复执行，只会触发 `scheduler`

-   `Tracker` 手动跟踪基础用法
-   `Tracker` 嵌套跟踪
-   `Tracker` 根据条件收集依赖
-   `Tracker` 共享跟踪调度器

#### 深响应 `observe`

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/reactive/observe.spec.ts

监听 `observable` 对象的所有操作，支持深度监听也支持浅监听

-   `observe` 深响应
-   `observe` 浅响应 - 第三个参数设置 `false`
-   `observe` 响应根节点替换
-   `observe` 通过 `dispose` 停止响应
-   `observe` 中 `track` 函数的使用给定的参数进行条件判断
-   `observe` 中动态树，见注 ②
-   `observe` 响应对象传递为函数将会抛错

注 ①：

> 当收集 `observable` 对象作为依赖进行响应的时候，修改的值没有变化，那么不会触发响应，这仅限于对象的值是原始类型数据；如果对象的值是引用类型的数据，由于引用的地址发生了改变，即便看上去值是一样的，依旧会触发响应，除非更新的对象也是同一个引用地址的值

注 ②：

-   `observable` 对象树中动态添加的 `observable` 节点，会响应深度修改
-   `observable` 对象树中静态存在的 `observable` 节点，只响应浅度修改

详细见单元测试代码

#### `observable` 对象检查、转换

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/reactive/externals.spec.ts

**`isSupportObservable`：**

判断可以作为 `observable` 对象的类型，可以作为 `observable` 对象的类型：

-   `observable` 对象
-   不在排除范围的对象：类声明对象、普通对象、`Array`、`Map`、`WeakMap`、`Set`、`WeakSet`

不可以作为响应劫持对象的类型：

-   `null`、`React Node`、`MomentJS` 对象、`JSON Schema`、带有 `toJS`/`toJSON` 方法的对象

**`isObservable`：**

判断对象是否为 `observable` 对象

**`makeRaw`：**

-   创建一个永远不可以作为 `observable` 的对象
-   标记一个类，使其声明的对象永远不可作为 `observable`

**`markObservable`：**

-   将一个带有 `toJS` 方法的对象作为 `observable`
-   `markObservable` 只能接受一个对象作为 `observable`，不能将函数转换为 `observable`

> `makeRaw` 的权重比 `markObservable` 高，无论是 `makeRaw` 包裹 `markObservable`，还是 `markObservable` 包裹 `makeRaw` 都不能够作为 `observable` 对象

补充：

-   递归 `observable` 并打印 `JS`

#### `hasCollected`

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/reactive/hasCollected.spec.ts

检测某段执行逻辑是否存在依赖收集

#### `untracker`

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/reactive/untracked.spec.ts

`untracker` 函数内部永远不会被依赖收集，和 `action` 一样，不同的是 `untracker` 不支持批量操作

-   `untracker` 函数内部永远不会被依赖收集
-   `untracker` 不提供参数什么也不会发生

---- 分割线 ----

### Core Library

内部方法不再当前研究范围，不包含测试用例：

-   `heart.spec.ts` [[查看](https://github.com/alibaba/formily/blob/formily_next/packages/core/src/__tests__/heart.spec.ts)]
-   `internals.spec.ts` [[查看](https://github.com/alibaba/formily/blob/formily_next/packages/core/src/__tests__/internals.spec.ts)]
-   `lifecycle.spec.ts` [[查看](https://github.com/alibaba/formily/blob/formily_next/packages/core/src/__tests__/lifecycle.spec.ts)]

#### Field

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/field.spec.ts

普通字段

-   创建字段：`createField`
-   创建带有属性的字段
-   字段值和展示状态：`display`、`value`
-   嵌套展示和表单模式：`display`、`pattern`
-   设置字段值、初始值：`setValue`、`setInitialValues`
-   设置字段加载状态和验证状态：`setLoading`、`setValidating`
-   设置字段组件和组件属性：`setComponent`、`setComponentProps`
-   设置装饰组件和装饰组件的属性：`setDecorator`、`setDecoratorProps`
-   响应式初始值：`reactions` + `field.initialValue`
-   字段验证状态、错误、警告、成功、有效、无效、验证状态、反馈信息：`selfValidate`、`errors`、`warnings`、`successes`、`valid`、`invalid`、`validateStatus`、`queryFeedbacks`
-   设置验证器：`setValidatorRule`
-   字段查询：`query`
-   初始值为空：`initialValue: ""`
-   有初始值的对象字段：`initialValue: { obj: {} }`
-   有初始值的数组对象：`initialValue: [1, 2]`
-   重置对象字段的初始值：`form.reset`
-   字段重置：`field.reset`
-   匹配路径：`field.match`
-   获取、设置字段状态：`setState`、`getState`
-   设置字段数据源：`setDataSource`
-   设置字段标题和介绍：`setTitle`、`setDescription`
-   必填字段，设置必填：`required`、`setRequired`
-   设置字段值的 data 和 content：`setData`、`setContent`
-   设置虚拟字段的 data 和 content：`setData`、`setContent`
-   设置字段验证状态：`setErrors`、`setWarnings`、`setSuccesss`、`setValidator`
-   字段联动：`reactions`
-   字段容错
-   初始值：`initialValue`
-   无索引数组路径计算，下标 0 创建字段 `0.input`：`[{ input: "123" }]`
-   无索引嵌套虚拟节点的数组路径计算，下标 0 创建虚拟节点 `column`，可以直接忽略，直接查找虚拟节点下的 `input`：`[{ input: "123" }]`
-   通过对象索引计算数组路径，下标 0 是对象节点，对象节点下的 `input`：`[{ input: "123" }]`
-   通过虚拟索引计算数组路径，下标 0 作为虚拟节点，节点下包含字段：`["123"]`
-   外层包裹一个虚拟节点并通过虚拟索引计算数组路径，可忽略外最层
-   在联动中收集依赖触发响应：`reaction` + `field.query`
-   嵌套字段隐藏和验证：`display`、`field.validate`
-   深度嵌套字段隐藏和验证：`display`、`form.validate`
-   深度嵌套字段隐藏和通过中间字段隐藏自身验证状态
-   字段卸载和验证状态：`field.onUnmount`、`field.validate`
-   数组字段下的自动清除：`form.setValues({ array: [] }`
-   对象字段下的自动清除：`obj1.setValue({})`，和数组字段不一样，建议看单元测试
-   初始值为空的字段：`initialValue: ""|null`
-   字段提交：`field.submit`
-   带有错误的字段提交
-   初始值和展示状态的关系：`initialValue`、`visible`
-   字段受控展示状态：`reactions` + `visible`
-   字段值和初始值受控：`reactions` + `initialValue`
-   字段名叫 `length`（`JS` 保护名称） 的初始值
-   字段名叫 `length`，动态分配初始值
-   嵌套字段的修改：`field.modified`、`field.selfModified`
-   连续验证字段:`field.setValidator([validator1, validator2])`
-   在自定义验证器中获取上下文字段和表单：`validator(_, __, _ctx) {}`
-   单方向联动：`reactions`
-   修改字段路径会重新计算字段值：`field.locate`
-   重置对象字段：`form.reset`
-   字段展示状态决定默认值是否有效：`onFieldReact` + `field.visible`
-   通过相邻路径查找值：`.{path}`
-   相对路径查找虚拟节点下的字段
-   表单值和字段值定义和覆盖：`initialValue`、`value`
-   销毁字段同时销毁值：`field.destroy`
-   字段校验只校验第一个非法规则：`validateFirst: true`
-   注销字段不再响应联动：`field.destroy` + `reactions`
-   父级设置 `readPretty` 会覆盖 `disabled`、`readOnly` 的子集 `pattern`
-   字段验证错误，不影响其他字段
-   字段注销后不再合并到表单值中：`field.destroy`
-   `onInput` 通过 `target` 传值：`field.onInput({ target })`
-   表单初始值忽略已注销的字段、隐藏的字段：`display: none`、`field.destroy`
-   字段 `actions`、字段方法注入 `inject`、调用 `invoke`
-   字段隐藏保留值 `display: hidden` 和不保留值 `display: none`
-   解构字段的展示状态：`{ name: [aa,bb] }`
-   `onInput` 修改规则：`field.onInput({ currentTarget, target });`
-   通过聚焦和失焦对无效的目标值触发验证：`validator: [{ triggerType }]`

#### ArrayField

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/array.spec.ts

数组字段：

-   创建数组字段：`createArrayField`
-   数组字段方法：`push`、`pop`、`unshift`、`remove`、`insert`、`move`、`shift`、`moveDown`、`moveUp`
-   数组字段下标操作和交换：`push`、`pop`、`unshift`、`remove`、`insert`、`move`
-   数组下标字段移动：`move`
-   查询数组字段下标路径：`form.query`、`form.fields`
-   数组字段中的虚拟子节点：`createVoidField` + `basePath`
-   交换数组字段的子集：`move`
-   数组字段容错
-   修改数组字段容错
-   数组字段通过 `move` API 移动子集
-   数组添加、删除、创建子字段触发回调：`onFormValuesChange`、`onFormInitialValuesChange`、`onFieldValueChange`
-   嵌套字段的 `indexes`，以及删除数组下的节点的坑点：`field.indexs`
-   数组字段的 `indexes` 需要避免无效的数字：`field.index`
-   在数组字段中没有字段的节点：`unshift({})`
-   数组节点中可以跳过虚拟节点，直接获取数据
-   数组字段清空：`form.reset("*")`、`form.reset("*", { forceClear: true })`
-   数组字段删除节点不会导致内存泄露：`remove` + `onFieldValueChange`
-   数组字段修补值：`unshift`
-   数组字段初始值通过 `remove` 删除
-   从 `records` 中查找数组字段
-   在数组嵌套字段中查找 `record`
-   查找数组字段中的 `record`
-   获取对象字段的 `record`
-   获取表单的 `record`

#### ObjectField

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/object.spec.ts

对象字段：

-   创建 `ObjectField` 对象：`createObjectField`
-   `ObjectField` 对象的方法：`field.addProperty`、`field.removeProperty`、`field.existProperty`

#### VoidField

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/void.spec.ts

虚拟字段：

-   创建虚拟节点，注销虚拟节点：`createVoidField`、`field.destroy`
-   创建带有属性的虚拟节点
-   设置组件和组件属性：`field.setComponent`、`field.setComponentProps`
-   设置标题、描述：`setTitle`、`setDescription`
-   设置包装器和包装器属性：`setDecorator`、`setDecoratorProps`
-   设置、获取状态：`setState`、`getState`
-   嵌套展示、字段模式：`setPattern`、`setDisplay`
-   联动：`reactions`
-   容错机制
-   子集联动：`reactions` + `field.query`

#### form

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/form.spec.ts

调用 `createForm` 所返回的核心表单模型：

-   创建 `form` 对象并挂载：`createForm`
-   创建字段：`createField`、`createArrayField`、`createObjectField`、`createVoidField`
-   设置值、初始值：`setValues`、`setInitialValues`
-   没有值的字段会使用初始值合并：`initialValue`、`value`
-   设置表单加载状态：`setLoading`
-   允许设置值为 `null`
-   允许设置表单值为 `observable` 对象
-   删除表单值，初始值：`deleteValuesIn`、`deleteInitialValuesIn`
-   表单提交、验证：`setSubmitting`、`setValidating`
-   添加、删除、覆盖式更新副作用：`addEffects`、`removeEffects`、`setEffects`
-   字段查询：`query`
-   通知、订阅、取消订阅：`notify`、`subscribe`、`unsubscribe`
-   设置和获取表单状态、字段状态：`setState`、`getState`、`setFormState`、`getFormState`、`setFieldState`、`getFieldState`
-   表单验证：`validate`、`valid`、`invalid`、`errors`、`warnings`、`successes`、`clearErrors`、`clearWarnings`、`clearSuccess`、`queryFeedbacks`
-   表单模式：`setPattern`、`pattern`、`editable`、`readOnly`、`disabled`、`readPretty`
-   表单展示状态：`setDisplay`、`display`、`visible`、`hidden`
-   表单提交：`form.submit`
-   表单重置：`form.reset`
-   测试表单在调试工具下的表现，检查 `__FORMILY_DEV_TOOLS_HOOK__` 对象
-   重置数组字段：`form.reset`
-   重置对象字段：`form.reset`
-   创建字段前初始值合并表单值，注 ①
-   不能匹配的字段为空值
-   创建字段后合并初始值，和注 ① 一样，不同的是赋值的顺序
-   删除表单中没有定义的值：`display` + `hasOwnProperty`
-   初始值为空数组
-   表单生命周期触发回调：`onFormInitialValuesChange`、`onFormValuesChange`
-   修改表单中的数组字段默认值：`push` + `onFormValuesChange`
-   深度合并值：`form.setValues`
-   `validator` 中 `throw new Error`
-   可重复声明表单字段并覆盖字段值：`designable: true`
-   跳过验证 `display: none` 的字段
-   跳过验证已卸载：`aa.onUnmount` 不能跳过，需要回收字段：`form.clearFormGraph`
-   跳过验证不可编辑的字段：`field.editable = false`
-   带有格式的验证命令：`validator: { format }`、`validator(value) {}`
-   卸载表单不会影响字段值：`form.onMount`
-   回收字段会清除字段值：`form.clearFormGraph("*")`
-   回收字段不清除字段值：`form.clearFormGraph("*", false)`
-   表单自动回收不可见的字段值：`reactions` + `visible`
-   通过异步设置初始值，自动隐藏表单不可见的字段值：`reactions` + `visible`、`form.setInitialValues`
-   表单值不会因为 `setValues` 改变，注 ②
-   表单初始值不会因为 `setInitialValues` 改变，注 ②
-   表单字段设为 `undefined` 不会报错，会被表单忽略：`form.fields['a'] = undefined;`

> 注 ②，在表单字段创建前不能通过 `setValue` 或 `setInitialValue` 赋值，但是可以通过表单直接赋值 `form.value = {}` 或 `form.initialValue = {}`，字段创建后不再受到限制

#### effect

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/effect.spec.ts

表单、字段生命周期：

-   表单初始化、挂载、卸载监听：`onFormInit`、`OnFormMount`、`onFormUnmount`
-   监听表单值改变、表单初始值改变：`onFormValueChange`、`onFormInitialValueChange`
-   监听表单输入：`onFormInputChange`
-   表单响应式逻辑：`onFormReact`
-   重置表单：`onFormReset`
-   表单提交：`onFormSubmit`
-   表单验证：`onFormValidate`
-   字段主动受控：`onFieldChange`
-   字段初始化、字段挂载、字段卸载：`onFieldInit`、`onFieldMount`、`onFieldUnmout`
-   字段初始值变更、字段值变更、字段输入值变更：`onFieldInitialValueChange`、`onFieldValueChange`、`onFieldInputValueChange`
-   字段被动受控：`onFieldReact`
-   字段验证：`onFieldValidate`
-   副作用里异步监听生命周期会抛出错误
-   `createEffectContext` 副作用上下文
-   `form.lifecycles` 表单副作用集合

> 备注：无论是表单提交还是表单验证，它们都是微任务

#### 检查类型

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/externals.spec.ts

检查对象类型：

-   检查字段：`isField`、`isArrayField`、`isObjectField`、`isVoidField`、`isDataField`、`isGeneralField`
-   检查字段状态：`isFieldState`、`isArrayFieldState`、`isObjectFieldState`、`isVoidFieldState`、`isDataFieldState`、`isGeneralFieldState`
-   检查表单：`isForm`、`isFormState`、`isQuery`

自定义 `effect`：

-   `createEffectHook`

#### 表单字段模型操作

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/graph.spec.ts

字段模型操作方法

-   回收字段模型：`form.clearFormGraph`
-   获取字段模型：`form.getFormGraph`
-   设置字段模型：`form.setFormGraph`

---- 分割线 ----

### React Library

#### `ExpressionScope`

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/react/expression.spec.tsx

自定义组件内部给 `json-schema` 表达式传递局部作用域：

-   创建带有 `ExpressionScope` 组件的表单
-   忽略编译 `{{variable}}`
-   表单隐藏和可见：`form.fields[{name}].hidden`、`form.fields[{name}].visible`

#### `Field`

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/react/field.spec.tsx

`createField` 的 `React` 实现：

-   没有 `FormProvider` 上下文渲染 `Field` 会抛出错误'
-   渲染字段：`Field`、`ArrayField`、`ObjectField`、`VoidField`
-   字段属性基础操作：`mounted`
-   数组字段属性：`moveDown`、`mounted`、`value`
-   注入副作用逻辑：`observer` + `useFormEffects` + `onFieldChange`
-   第三方组件库的无侵入接入 `Formily`：`connect` + `mapProps` + `mapReadPretty`
-   字段验证和卸载：`onFieldUnmount`、`form.validate`

不包含：

-   `ReactiveField`：这个字段不对外导出，可以通过 `ArrayField` 进行了解

#### `Form`

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/react/form.spec.tsx

表单渲染相关：

-   渲染表单：`FormProvider`、`FormConsumer`
-   查询最近的 `ObjectField` 或 `Form`：`useParentForm`

#### `JsonSchema`

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/react/schema.json.spec.tsx

使用 `JsonSchema` 渲染：

-   通过 `JsonSchema` 渲染单一字段
-   通过 `JsonSchema` 渲染带有对象字段的表单
-   通过 `JsonSchema` 渲染单一对象字段
-   通过 `x-component-props` 传递 `children`
-   通过 `x-content` 传递 `children`

#### `MarkupSchema`

-   目录：https://github.com/cgfeel/formily/blob/main/src/__tests__/react/schema.markup.spec.tsx

使用 `MarkupSchema` 渲染节点：

-   字符节点：`SchemaField.String`
-   布尔节点：`SchemaField.Boolean`
-   数值节点：`SchemaField.Number`
-   日期节点：`SchemaField.Date`
-   日期时间节点：`SchemaField.DateTime`
-   虚拟节点：`SchemaField.Void`
-   数组节点：`SchemaField.Array`
-   对象节点：`SchemaField.Object`
-   其他节点：`SchemaField.Markup`
-   虚拟节点支持 `children props`，`SchemaField.Markup` 不支持 `children`
-   子节点 - 通过 `props` 设置 `children`
-   通过 `x-content` 设置 `children`

`RecursionField` 递归渲染组件：

-   `onlyRenderProperties`：只渲染 `schema properties`
-   `mapProperties`：`schema properties`映射器，主要用于改写`schema`
-   `filterProperties`：`schema properties`过滤器，被过滤掉的 `schema` 节点不会被渲染
-   `onlyRenderSelf`：是否只渲染自身，不渲染 `properties`，注 ①
-   引入一个无效的 `schema`
-   `schema` 联动：`x-reactions`
-   作用域范围：`scope`
-   `x-content` 通过 `scope` 将组件作为 `children`
-   作用域内隐藏和展示：`x-visible`
-   作用域联动设置值：`x-value`
-   通过作用域嵌套更新组件属性：`x-component-props`
-   通过联动嵌套更新组件属性：`x-reactions`
-   `schema` 验证和必填：`x-validator`、`required`
-   `schema` 根据值响应：`{{$values.input}}`
-   虚拟节点的 `children`
-   在响应执行过程中，调用第三方字段的值
    -   触发更新：`onClick` + `onChange`
    -   `x-reactions` 响应：`target` + `onFieldInputValueChange`
-   多个响应的副作用隔离
    -   触发更新：`onClick` + `onChange`
    -   `x-reactions` 响应：`dependencies` + `{{$deps}}`
-   嵌套作用域记录对象：`RecordScope`
-   作用域记录对象字面量：`{{$record + $index}}`
-   作用域集合：`RecordsScope`
-   `propsRecursion`：`RecursionField` 的 `proprety` 是否递归传递 `mapProperties` 和 `filterProperties`
-   不提供 `propsRecursion` 过滤 `schema` 只能过滤下一级字段，对于更深层次的字段不能过滤

> 注 ①： `ObjectField` 下所有子集都是 `properties`

---- 分割线 ----

## 作业练习

### `fishedee` 总结的 `Formily`

包含有 4 篇文档：

-   `Formily` 的 `Reactive` 的经验汇总 [[查看](https://blog.fishedee.com/2021/07/13/Formily%E7%9A%84Reactive%E7%9A%84%E7%BB%8F%E9%AA%8C%E6%B1%87%E6%80%BB)]
-   `Formily` 的 `core` 的经验汇总 [[查看](https://blog.fishedee.com/2021/07/14/Formily%E7%9A%84core%E7%9A%84%E7%BB%8F%E9%AA%8C%E6%B1%87%E6%80%BB)]
-   `Formily` 的 `React` 库经验汇总 [[查看](https://blog.fishedee.com/2021/07/21/Formily%E7%9A%84React%E5%BA%93%E7%BB%8F%E9%AA%8C%E6%B1%87%E6%80%BB)]
-   `Formily` 的 `Antd` 经验汇总 [[查看](https://fishedee.com/2021/07/25/Formily%E7%9A%84Antd%E7%BB%8F%E9%AA%8C%E6%B1%87%E6%80%BB)]

> 如果是没有接触过 `Formily` 的新手，建议从上面官方文档示例开始看；对于这几篇文档提到的 `Formily` 知识点有限，且存在有错误，我会在演示中纠正部分错误；而对于已经了解 `Formily`，这几篇文档可以作为补充练习来看

这里我将 4 篇文章比较精彩的部分罗列出来，其他的大多和官方演示一样，可以直接本地运行查看

#### 一步步复现 `Formily`

包含以下章节：

-   `core`.0: 仅用 `@formily/reactive` 实现表单逻辑 [[查看](https://github.com/cgfeel/formily/tree/main/src/fishedee/coreReactive)]
-   `core`.10: 为之前的 `reactive` 表单增加 `core` [[查看](https://github.com/cgfeel/formily/tree/main/src/fishedee/coreForm)]
-   `React`.3: 复现 `Field` [[查看](https://github.com/cgfeel/formily/tree/main/src/fishedee/customField)]
-   `React`.4: 复现 `Schema` [[查看](https://github.com/cgfeel/formily/tree/main/src/fishedee/customSchema)]

原理直接本地运行查看演示备注，除此之外还可以看看字段和模型的实践

#### 字段和模型的实践

-   `React`.1: `Field` 的 `React` 实现 [[查看](https://github.com/cgfeel/formily/tree/main/src/fishedee/reactField)]
-   `React`.2: 字段模型 `SchemaField` 实现 [[查看](https://github.com/cgfeel/formily/tree/main/src/fishedee/schemaField)]
-   `React`.6: 字段特性 [[查看](https://github.com/cgfeel/formily/tree/main/src/fishedee/customTable)]
-   掘金练习：自增对象 [[查看](https://github.com/cgfeel/formily/tree/main/src/components/objectBase)]

#### 其他推荐演示

-   `Reactive`.5：多计数器 [[查看](https://github.com/cgfeel/formily/tree/main/src/fishedee/count)]
-   `Core`.1.1：字段值的获取与更新 [[查看](https://github.com/cgfeel/formily/tree/main/src/fishedee/fieldAction)]
-   `Core`.2 展示状态 [[查看](https://github.com/cgfeel/formily/tree/main/src/fishedee/display)]
-   `Core`.3 校验和反馈 [[查看](https://github.com/cgfeel/formily/tree/main/src/fishedee/validateInput)]
-   `React`.7.1: `value` 与 `onChange` 的隐式传递 [[查看](https://github.com/cgfeel/formily/tree/main/src/fishedee/reactFaq)]

---- 分割线 ----

### 掘金练习题：自增对象

原文章：手把手教你写一个条件组合组件 [[查看](https://juejin.cn/post/7005869798483558431)]，将其用 `Formily` 复现

目录：https://github.com/cgfeel/formily/tree/main/src/components/objectBase

优点：

1. 简洁，就 2 文件
2. 一套模型，不用修改模型代码1 个字母，就可拓展 N 个逻辑渲染，如下图

<img width="733" alt="企业微信截图_bdbe233d-180d-4246-8fab-7c2efd0598f1" src="https://github.com/cgfeel/formily/assets/578141/76cecadc-02e3-44d3-b203-fd8c3021cdaa">

---- 分割线 ----

## 写在最后

在刷 `Formily` 的时候时常会有个疑问，`Formily` 的优势是什么，对比诸如：`react-hook-form`、`zod`，亦或者直接使用 `Antd`，我有什么非用 `Formily` 不可的地方吗？在刷完整个文档后我大致总结出这么几条：

-   低代码：`Formily` 天生为低代码生的
-   赋予 `Schema` 模型处理的能力
-   `DMS` 数据管理服务

几乎市面上所有的表单验证库也好，还是相关的库也好，它们都是围绕：验证、受控展开，但是很少会提到：模型渲染、数据分离，这应该就是 `Formily` 特有的地方了，它不仅仅是一个表单验证、受控的库。借助模型处理的能力，可以无限拓展、分离、组合不同的 `schema`，实现、管理一个极其庞大的数据。

当然带来的问题就是学习成本的上升，要了解 `Formily`，就要了解一套状态管理 `Reactive`、了解副作用及声明周期和相关对象 `Core`、了解一套现有的渲染引擎库 `React`，以及对应的一套主题，如：`Antd`

那什么时候选择使用 `Formily` 呢？

-   看使用场景，比如做低代码，诸如：问卷调查、任务引擎等
-   看业务处理
    -   如果你仅仅需要处理注册、登录、商品购买提交订单，`Formily` 可能并非最优解
    -   如果你需要做比较大的数据处理可以考虑 `Formily`，例如：商城平台订单管理，分大类目、小类目、不同 SKU，库存，价格，优惠策略等等
    -   亦或者你需要做一个 CRM 可以考虑 `Formily`，管理不同的客户群体，付费情况、不同链路渠道划分、统计等等
    -   一个复杂的动态结果页，比如你有一个上千模型的落地页，根据不同的情况，按照不同的状态、不同的顺序分别展示
