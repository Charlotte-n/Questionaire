type ComponentProps = {
    text: string
    fontSize: string
    color: string
}

type Component = {
    props: ComponentProps
    id: string
    name: string
}

type ContentProps = {
    backgroundColor: string
    backgroundImage: string
    backgroundRepeat: string
    backgroundSize: string
    height: string
}

type Content = {
    components: Component[]
    props: ContentProps
}

export interface singleEditorTypes {
    _id: string
    uuid: string
    title: string
    content: Content
    author: string
    copiedCount: number
    status: number
    user: string
    chanels: any[] // 未提供具体类型，暂时使用 any
    createdAt: string
    updatedAt: string
    id: number
    __v: number
    channels: any[] // 未提供具体类型，暂时使用 any
    isTemplate: boolean
    isPublic: boolean
    coverImg: string
}

export interface ChannelType {
    id: number
    name: string
}

export interface channelDataType {
    count: number
    list: ChannelType[]
}
