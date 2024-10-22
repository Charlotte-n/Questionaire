interface ComponentProps {
    text: string
    fontSize: string
    color: string
}

interface Component {
    props: ComponentProps
    id: string
    name: string
}

interface ContentProps {
    backgroundImage: string
    backgroundRepeat: string
    backgroundSize: string
    height: string
}

interface Content {
    components: Component[]
    props: ContentProps
}

interface Channel {
    name: string
    id: string
}

export interface TemplateType {
    _id: string
    uuid: string
    title: string
    content: Content
    author: string
    copiedCount: number
    status: number
    user: string
    chanels: Channel[]
    createdAt: Date
    updatedAt: Date
    id: number
    __v: number
    channels: Channel[]
    isTemplate: boolean
    isPublic: boolean
    coverImg: string
    latestPublishAt: Date
    subTitle?: string
}
