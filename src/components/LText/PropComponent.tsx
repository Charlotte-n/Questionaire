import { FC, useEffect, useRef } from 'react'
import { Form, InputNumber, Radio, Select, Slider } from 'antd'
import { LTextPropsType } from './interface'
import TextArea from 'antd/es/input/TextArea'
import { MergeProps, TextProperties } from '../../stores/commonproperties'
import { fontFamilyOptions, textAlignOptions } from './constance'
import ColorPicker from '../ColorPicker'

const PropsComponent: FC<LTextPropsType & { id: string }> = (props) => {
    const mergeProps = MergeProps(TextProperties, props)
    const { text, fontSize, lineHeight, fontFamily, textAlign, id, color } =
        mergeProps
    const colorRef = useRef(color)
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
    function changeStore(otherProps: any) {
        props.onChange &&
            props.onChange(Object.assign({}, { id, ...otherProps }))
    }
    function onChangeColor(color: string) {
        colorRef.current = color
        changeStore({ color: colorRef.current })
    }

    function handleValuesChange(_, allValues: { [key: string]: any }) {
        props.onChange && props.onChange(Object.assign(allValues, { id }))
    }
    return (
        <Form
            form={form}
            layout="horizontal"
            initialValues={{ text, fontSize, lineHeight, color }}
            onValuesChange={handleValuesChange}
        >
            <Form.Item
                label="文本"
                name="text"
                rules={[{ required: true, message: '请输入标题内容' }]}
            >
                <TextArea></TextArea>
            </Form.Item>
            <Form.Item label="字号" name="fontSize" wrapperCol={{ span: 4 }}>
                <InputNumber></InputNumber>
            </Form.Item>
            <Form.Item label="行高" name="lineHeight">
                <Slider min={0} max={3} step={0.1}></Slider>
            </Form.Item>
            <Form.Item label="字体" name="fontFamily" wrapperCol={{ span: 6 }}>
                <Select options={fontFamilyOptions}></Select>
            </Form.Item>
            <Form.Item label="对齐" name="textAlign" wrapperCol={{ span: 5 }}>
                <Radio.Group
                    options={textAlignOptions}
                    optionType="button"
                ></Radio.Group>
            </Form.Item>
            <Form.Item label="字体颜色" name="color" wrapperCol={{ span: 12 }}>
                <ColorPicker onItemClick={onChangeColor}></ColorPicker>
            </Form.Item>
        </Form>
    )
}

export default PropsComponent
