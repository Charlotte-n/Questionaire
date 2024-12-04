import { without } from 'lodash-es'
import { useMemo } from 'react'

export const CommonProperties = {
    //事件功能
    actionType: '',
    url: '',
    // //尺寸
    height: '80px',
    width: '125px',
    //边框
    borderStyle: 'none',
    borderColor: '#000',
    borderWidth: '0',
    borderRadius: '0',
    //阴影与透明度
    opacity: 1,
    shadow: '0 0 0 #000',
    //位置
    position: 'absolute',
    top: '10px',
    left: '20px',
    right: '0',
    bottom: '0',
}

export const TextProperties = {
    text: '正文内容',
    fontFamily: '',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    // paddingTop: '15px',
    // paddingBottom: '15px',
    // paddingLeft: '15px',
    // paddingRight: '15px',
    backgroundColor: '',
    color: '#000',
    lineHeight: '1',
    textAlign: 'left',
    tag: 'div',
    name: 'l-text',
    ...CommonProperties,
}

export const ImageProperties = {
    ...CommonProperties,
}

//转换类型
export const textStylePropName = without(
    Object.keys(TextProperties),
    'actionType',
    'url',
    'tag',
    'onItemClick',
    'name',
)

export const imageStylePropName = without(
    Object.keys(ImageProperties),
    'actionType',
)

//计算出props,设置默认值
export const MergeProps = <T>(defaultProps: any, props: any): T => {
    return useMemo(() => {
        return {
            ...defaultProps,
            ...props,
        }
    }, [props])
}

export const ShapeProperties = {
    display: 'inline-block',
    backgroundColor: '',
    ...CommonProperties,
}
export const ShapeStylePropName = without(
    Object.keys(ShapeProperties),
    'onItemClick',
    'tag',
)
