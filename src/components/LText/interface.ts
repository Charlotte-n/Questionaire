export interface CommonPropsType {
    [key: string]: any
    // 事件功能
    actionType: string
    url: string
    //事件
    onItemClick: () => void
    // 尺寸
    height: string
    width: string
    paddingLeft: string
    paddingRight: string
    paddingTop: string
    paddingBottom: string
    // 边框
    borderStyle: string
    borderColor: string
    borderWidth: string
    borderRadius: string
    // 阴影与透明度
    opacity: number
    shadow: string
    // 位置
    position: string
    top: string
    left: string
    right: string
    bottom: string
}

export interface LTextPropsType extends CommonPropsType {
    text: string
    tag: string
    fontFamily: string
    fontSize: string
    fontWeight: string
    fontStyle: string
    textDecoration: string
    backgroundColor: string
    color: string
    lineHeight: string
    textAlign: string
}

export type OptionalLTextPropsType = Partial<LTextPropsType>
