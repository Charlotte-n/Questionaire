import { without } from 'lodash-es'
import { useMemo } from 'react'

export const CommonProperties = {
    //事件功能
    actionType: '',
    url: '',
    //尺寸
    height: '',
    width: '318px',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    //边框
    borderStyle: 'none',
    borderColor: '#000',
    borderWidth: '0',
    borderRadius: '0',
    //阴影与透明度
    opacity: 1,
    shadow: '0 0 0 #000',
    //位置
    // position: 'absolute',
    // top: '0',
    // left: '0',
    // right: '0',
    // bottom: '0',
}

export const TextProperties = {
    text: '正文内容',
    fontFamily: '',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    backgroundColor: '#fff',
    color: '#000',
    lineHeight: '1',
    textAlign: 'left',
    tag: 'div',
    ...CommonProperties,
}
//转换类型
export const textStylePropName = without(
    Object.keys(TextProperties),
    'actionType',
    'url',
    'tag',
    'onItemClick',
)
//计算出props,设置默认值
export const MergeProps = (defaultProps: any, props: any) => {
    return useMemo(() => {
        return {
            ...defaultProps,
            ...props,
        }
    }, [props])
}
