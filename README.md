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
-   由于官网没有对`formily v2`的Api做任何说明，所以我会通过源码注释的方式进行补充
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
-   目录：
    -   https://github.com/cgfeel/formily/blob/main/src/page/EditDetail.tsx
-   包含章节：
    -   编辑详情 [[查看](https://formilyjs.org/zh-CN/guide/scenes/edit-detail)]
    -   `PreviewText` [[查看](https://antd.formilyjs.org/zh-CN/components/preview-text)]

**包含：**

通过组件`PreviewText.Placeholder`实现预览，文档没有提到3点：

-   默认开启预览
-   切换预览和编辑状态
-   表单组件根据可编辑状态受控响应

文档提到的：

-   使用`useField`获取可编辑状态

巩固：

-   无论组件怎么拆分，每个表单声明`createForm`一定要单独一个文件
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
