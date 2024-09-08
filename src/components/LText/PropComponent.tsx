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
