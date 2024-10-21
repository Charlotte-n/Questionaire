import Text from './component/text'
import ComponentList from './component/component-list'
import ImageList from './component/image-list'
export const TabItem = [
    {
        key: '1',
        label: '文本',
        children: <ComponentList onItemClick={() => {}} />,
    },
    {
        key: '2',
        label: '图片',
        children: <ImageList onItemClick={() => {}} />,
    },
    {
        key: '3',
        label: '图像',
        children: <Text />,
    },
]
