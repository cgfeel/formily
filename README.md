# Formily Demo

按照 `formily` 官方文档，最小化复现每个示例。本项目不提供线上预览，请直接在本地运行`npm install && npm run start`

**示例包含 4 个文档：**

-   `formily` 主文档：https://formilyjs.org/zh-CN
-   `@formily/reactive`：https://reactive.formilyjs.org/zh-CN
-   `@formily/core`：https://core.formilyjs.org/zh-CN
-   `@formily/react`：https://react.formilyjs.org/zh-CN

其中组件采用 `@formily/antd-v5`，以主文档作为演示。不包含 `@formily/vue`，技术栈为 `React`，在 `formily` 中两者大同小异

**演示分两部分：**

-   页面演示：`src/page` 目录下，下载安装安装依赖后 `npm run start`
-   单元测试：`src/__test__` 目录下，下载安装安装依赖后 `npm run test`

所有示例根据自己理解添加了说明、并根据自己的理解补充示例

## 工程文件

主要的使用的包：

-   NodeJS：`v18.13.0`
-   脚手架：`Create React App` + `react-app-rewired` + `customize-cra`
-   表单和UI库：`formily ` + `antd` + `antd-style`
-   数据模拟：`mocker-api` + `mockjs`

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
-   在联动的钩子中：[[Field Effect Hooks](https://core.formilyjs.org/zh-CN/api/entry/field-effect-hook)]，只有 `onFieldReact` 是被动联动，其他全部是主动联动

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

---- 分割线 ----

### Core Library

我将使用 `formily` 将这个库里对应的对象和属性，做成在线工具的形式进行演示，建议本地运行上手操作

#### createForm

创建一个 `form` 对象，其对象属性可以直接通过演示操作查看效果

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
