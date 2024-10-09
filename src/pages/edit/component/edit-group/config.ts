interface GroupProps {
    text: string
    name?: string
    subName: string
}
export const defaultEditGroups: GroupProps[] = [
    {
        text: '基本属性',
        name: 'l-text',
        subName: 'base',
    },
    {
        text: '尺寸',
        subName: 'size',
    },
    {
        text: '边框',
        subName: 'border',
    },
    {
        text: '阴影与透明度',
        subName: 'shadow',
    },
    {
        text: '位置',
        subName: 'position',
    },
    {
        text: '事件功能',
        subName: 'event',
    },
]
