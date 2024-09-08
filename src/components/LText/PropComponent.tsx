import React, { FC, useEffect, useMemo } from 'react'
import { Form, Input, InputNumber, Radio, Select, Slider } from 'antd'
import { LTextPropsType } from './interface'
import TextArea from 'antd/es/input/TextArea'
import { MergeProps, TextProperties } from '../../stores/commonproperties'
import { fontFamilyOptions, textAlignOptions } from './constance'

const PropsComponent: FC<LTextPropsType> = (props) => {
    const mergeProps = MergeProps(TextProperties, props)
    const { text, fontSize, lineHeight, fontFamily, textAlign } = mergeProps
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue({
            text,
            fontSize,
            lineHeight,
            fontFamily,
            textAlign,
        })
    }, [text, fontSize, lineHeight, fontFamily, textAlign])
    return (
        <Form
            form={form}
            layout="horizontal"
            initialValues={{ text, fontSize, lineHeight }}
        >
            <Form.Item
                label="文本"
                name="text"
                rules={[{ required: true, message: '请输入标题内容' }]}
            >
                <TextArea></TextArea>
            </Form.Item>
            <Form.Item label="字号" name="fontSize" wrapperCol={{ span: 5 }}>
                <InputNumber></InputNumber>
            </Form.Item>
            <Form.Item label="行高" name="lineHeight">
                <Slider min={0} max={3} step={0.1}></Slider>
            </Form.Item>
            <Form.Item label="字体" name="fontFamily" wrapperCol={{ span: 10 }}>
                <Select options={fontFamilyOptions}></Select>
            </Form.Item>
            <Form.Item label="对齐" name="textAlign" wrapperCol={{ span: 12 }}>
                <Radio.Group
                    options={textAlignOptions}
                    optionType="button"
                ></Radio.Group>
            </Form.Item>
        </Form>
    )
}

export default PropsComponent
