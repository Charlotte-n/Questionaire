import Text from './component/text'
import ComponentList from './component/component-list'
import ImageList from './component/image-list'
import ShapeList from './component/shap-list'
export const TabItem = [
    {
        key: '1',
        label: '文本',
        children: <ComponentList />,
    },
    {
        key: '2',
        label: '图片',
        children: <ImageList />,
    },
    {
        key: '3',
        label: '图像',
        children: <ShapeList />,
    },
]

export const Images = [
    'https://static.imooc-lego.com/upload-files/528w-0ilmEQMomZ8-108048.png',
    'https://static.imooc-lego.com/upload-files/frame-096161.png',
    'https://static.imooc-lego.com/upload-files/text-449964.png',
    'https://static.imooc-lego.com/upload-files/text2-288504.png',
    'https://static.imooc-lego.com/upload-files/money-664239.png',
    'https://static.imooc-lego.com/upload-files/bag-904186.png',
    'https://static.imooc-lego.com/upload-files/text3-086652.png',
    'https://static.imooc-lego.com/upload-files/text4-145592.png',
]
