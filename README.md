# Formily Demo

按照 `formily` 官方文档，最小化复现每个示例。本项目不提供线上预览，请直接在本地运行`npm install && npm run start`

## 工程文件

主要包：`Create React App` + `formily` + `antd` + `customize-cra` + `antd-style`

NodeJS：`v18.13.0`

和官方文档（以下简称“文档”）不同点：

-   采用`antd v5`作为默认演示，文档默认是v4
-   采用`antd-style`作为`css-in-js`框架，可以在这里查看详细演示 [[查看](https://github.com/cgfeel/ant-design-style)]
-   由于官网没有对`formily v2`的Api做任何说明，所以我会通过源码注释的方式进行补充
-   根据演示文件，根据自己的理解，重新调整了文件和目录结构

## 阅读说明

-   如上所述，`formily v2`的Api会将个人解读，通过源码注释写在源码
-   而`README.md`将会每个演示包含的注解，作为索引简要的罗列出来，方便查找
-   每个知识点只在一个地方注释，如果更新的演示没有新的Api，将不再重复注释

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

-   包含，验证模式：`createForm.validateFirst`、字段说明：`SchemaField.String`、关联反应：`SchemaField.reactions`（这里演示为被动关联）

通过`Json Schema`创建登录

-   包含：`SchemaField.schema`，使用JSON配置表单验证及其优点

通过`JSX`创建登录：

-   包括：`jsx`和`schema`的不同，以及优缺点
