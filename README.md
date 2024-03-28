# Formily Demo

按照 `formily` 官方文档，最小化复现每个示例。本项目不提供线上预览，请直接在本地运行`npm install && npm run start`

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
-   定义文案：`setValidateLanguage`

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
