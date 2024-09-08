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
