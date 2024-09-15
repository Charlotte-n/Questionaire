# 初始化项目

1. 创建项目(用vite来弄)
2. 接着加上eslint + prettier
3. 加上husky + commitlint / cz
4. 配置tailwindcss
5. 加路由

# 页面设计

路由设计
![alt text](image.png)
业务闭环
![alt text](image-1.png)

## 路由设计

# 组件的开发

1. 组件的通用的属性
2. 和单个组件的特有属性
3. 封装组件

# 业务开发

![alt text](image-2.png)
对于展示型组件的话事件不要和store做一个很强的绑定，最好由父组件来控制

## 左侧组件

解决方案:可以写死在本地，也可以从服务端获取。

### 点击左边组件添加到画布上

就是获取到点击这个组件的一些styleProps之后在store里面的组件中添加新的组件

## 获取画布上的组件的属性并且将它显示到右侧中

-   点击一个组件，选中
-   将它的属性以不同类型的表单呈现在右侧
-   编辑表单中的值，在值更新的同时将数据更新到页面中
    ![alt text](image-3.png)
    将属性和表单的组件进行映射
    ![alt text](40368417257804472.png)

react技术解决方案（将属性映射到表单组件中）：

1. 给每一个组件添加一个修改属性的组件，之后获取这个组件。
2. 定义这个组件，

```js
import React, { FC, useEffect, useMemo } from 'react'
import { Form, Input } from 'antd'
import { LTextPropsType } from './interface'

const PropsComponent: FC<LTextPropsType> = (props) => {
    const { text } = props
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue({ text })
    }, [text])
    return (
        <Form form={form} layout="vertical" initialValues={{ text }}>
            <Form.Item
                label="标题内容"
                name="text"
                rules={[{ required: true, message: '请输入标题内容' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    )
}

export default PropsComponent
```

3. 将这个组件展示出来还需要设计一个组件来展示相应的组件

```js
import React, { FC } from 'react'
import {
    ComponentConfType,
    getComponentConfByType,
} from '../../../../components'
import { LTextPropsType } from '../../../../components/LText'
import { useAppSelector } from '../../../../stores'
import { getCurrentElement } from '../../../../stores/editor'

const PropsTable: FC<LTextPropsType> = (prop) => {
    const currentElement = useAppSelector(getCurrentElement)
    const { props, name } = currentElement
    const { ChangePropComponent } = getComponentConfByType(
        name,
    ) as ComponentConfType

    return <ChangePropComponent {...props}></ChangePropComponent>
}
export default PropsTable

```

## 接着添加更多简单对应关系并且展示

![alt text](13344717257895972.png)

## 修改属性，画布相应的发生改变

## 开发通用组件

-   TDD
-   上传组件
-   代码重构
-   组件源代码

### TDD开发

测试驱动开发

-   根据需求写测试用例
-   测试用例全部失败
-   开始写代码实现
-   将测试用例由失败变成通过

#### 开发ColorPicker组件

#### 上传组件

# 测试

## 测试工具

Jest 和 React Testing Library 进行单元测试

1. 单元测试
2. mock
3. TDD

## 测试框架的几大功能

断言
异步支持
Mock:
两种写法
代码覆盖率

## TDD

就是先写测试用例，再写代码

## jest测试框架

-   断言
-   异步测试，回调和Promise
-   mock函数-jest.fn()
-   mock第三方模块-jest.mock()
-   mock Timers - jest.useFakeTimers()

## jest testing library

-   渲染:render
-   获取元素
-   触发dom事件
-   异步请求
-   测试redux

# 开发通用组件

## 开发uploader

-   基本的上传功能
-   支持上传文件列表
    -   显示文件名称
    -   状态
    -   可删除
    -   显示上传进度
    -   有可能有更丰富的显示支持
-   自定义模板
    -   支持初始容器自定义
    -   支持上传完毕之后自定义
-   支持一系列的生命钩子
    -   beforeUpload
    -   onProgress
    -   onSuccess
    -   onError
    -   onChange
-   拖拽上传

### 基本的上传功能

### 支持上传文件列表

### 支持自定义模块

### 支持一系列的生命钩子

### 拖拽上传

