import { FC, useEffect, useMemo } from 'react'
import { Form, InputNumber, Radio, Select, Slider } from 'antd'
import { OptionalLTextPropsType } from '../../components/LText'
import TextArea from 'antd/es/input/TextArea'
import { MergeProps, TextProperties } from '../../stores/commonproperties'
import {
    fontFamilyOptions,
    textAlignOptions,
    borderStyleOptions,
} from '../../components/LText/constance'
import ColorPicker from '../../components/ColorPicker'
import { sizeOptions } from './config'
import CropperCom from '../edit/component/cropper'
import { useAppSelector } from '../../stores'
import { getCurrentElement } from '../../stores/editor'

const PropsComponent: FC<{
    subName: string
    onChange: (item: {
        id: string
        key: string | string[]
        value: string | string[]
    }) => void
}> = (props) => {
    const currentElement = useAppSelector(getCurrentElement)
    const [form] = Form.useForm()
    const mergeProps = MergeProps(TextProperties, currentElement.props)
    const { id } = currentElement

    useEffect(() => {
        form.resetFields()
    }, [currentElement])

    function changeStore(otherProps: any) {
        props.onChange &&
            props.onChange(Object.assign({}, { id, ...otherProps }))
    }
    function onChangeColor(color: string) {
        changeStore({ key: 'color', value: color })
    }

    function onChangeBorderColor(color: string) {
        changeStore({ key: 'borderColor', value: color })
    }

    function onChangeBackgroundColor(color: string) {
        changeStore({ key: 'backgroundColor', value: color })
    }

    function handleValuesChange(_: any, allValues: { [key: string]: any }) {
        props.onChange &&
            props.onChange({
                id,
                key: Object.keys(allValues),
                value: Object.values(allValues),
            })
    }

    return (
        <Form
            form={form}
            layout="horizontal"
            initialValues={mergeProps}
            onValuesChange={handleValuesChange}
        >
            {currentElement &&
                props.subName === 'base' &&
                currentElement.name === 'l-text' && (
                    <div>
                        <Form.Item
                            label="文本"
                            name="text"
                            rules={[
                                { required: true, message: '请输入标题内容' },
                            ]}
                        >
                            <TextArea></TextArea>
                        </Form.Item>
                        <Form.Item
                            label="字号"
                            name="fontSize"
                            wrapperCol={{ span: 4 }}
                        >
                            <InputNumber></InputNumber>
                        </Form.Item>
                        <Form.Item label="行高" name="lineHeight">
                            <Slider min={0} max={3} step={0.1}></Slider>
                        </Form.Item>
                        <Form.Item
                            label="字体"
                            name="fontFamily"
                            wrapperCol={{ span: 6 }}
                        >
                            <Select options={fontFamilyOptions}></Select>
                        </Form.Item>
                        <Form.Item
                            label="对齐"
                            name="textAlign"
                            wrapperCol={{ span: 12 }}
                        >
                            <Radio.Group
                                options={textAlignOptions}
                                optionType="button"
                            ></Radio.Group>
                        </Form.Item>
                        <Form.Item label="文本颜色" name="color">
                            <ColorPicker
                                onItemClick={onChangeColor}
                                color={mergeProps.color}
                            ></ColorPicker>
                        </Form.Item>
                        <Form.Item label="背景颜色" name="backgroundColor">
                            <ColorPicker
                                onItemClick={onChangeBackgroundColor}
                                color={mergeProps.backgroundColor}
                            ></ColorPicker>
                        </Form.Item>
                    </div>
                )}

            {currentElement &&
                props.subName === 'base' &&
                currentElement.name === 'l-image' && (
                    <CropperCom url={currentElement.props.url}></CropperCom>
                )}

            {currentElement &&
                props.subName === 'base' &&
                currentElement.name === 'l-shape' && <div>样式</div>}

            {currentElement && props.subName === 'size' && (
                <div>
                    {sizeOptions.map((item) => {
                        return (
                            <Form.Item
                                labelCol={{ span: 4 }}
                                label={item.label}
                                name={item.name}
                                wrapperCol={{ span: item.wrapperCol }}
                                key={item.label}
                            >
                                <InputNumber></InputNumber>
                            </Form.Item>
                        )
                    })}
                </div>
            )}

            {currentElement && props.subName === 'border' && (
                <div>
                    <Form.Item
                        label="边框类型"
                        name="borderStyle"
                        wrapperCol={{ span: 12 }}
                    >
                        <Select options={borderStyleOptions}></Select>
                    </Form.Item>
                    <Form.Item label="边框颜色" name="borderColor">
                        <ColorPicker
                            onItemClick={onChangeBorderColor}
                        ></ColorPicker>
                    </Form.Item>
                    <Form.Item label="边框宽度" name="borderWidth">
                        <Slider min={0} max={10} step={0.1}></Slider>
                    </Form.Item>
                    <Form.Item label="边框圆角" name="borderRadius">
                        <Slider min={0} max={10} step={0.1}></Slider>
                    </Form.Item>
                </div>
            )}

            {currentElement && props.subName === 'shadow' && (
                <div>
                    <Form.Item label="透明度" name="opacity">
                        <Slider min={0} max={1} step={0.1}></Slider>
                    </Form.Item>
                    <Form.Item label="阴影颜色" name="shadowColor">
                        <ColorPicker onItemClick={onChangeColor}></ColorPicker>
                    </Form.Item>
                    <Form.Item label="阴影大小" name="shadowSize">
                        <Slider min={0} max={10} step={0.1}></Slider>
                    </Form.Item>
                    <Form.Item label="阴影模糊" name="shadowBlur">
                        <Slider min={0} max={10} step={0.1}></Slider>
                    </Form.Item>
                </div>
            )}

            {currentElement && props.subName === 'position' && (
                <div>
                    <Form.Item label="X轴坐标" name="" wrapperCol={{ span: 6 }}>
                        <InputNumber></InputNumber>
                    </Form.Item>
                    <Form.Item label="Y轴坐标" name="" wrapperCol={{ span: 6 }}>
                        <InputNumber></InputNumber>
                    </Form.Item>
                </div>
            )}

            {currentElement && props.subName === 'event' && (
                <div>
                    <Form.Item label="事件功能" name="onClick">
                        <Select options={fontFamilyOptions}></Select>
                    </Form.Item>
                </div>
            )}
        </Form>
    )
}

export default PropsComponent
