import LImageComponent from './Component'

export * from './interface'

export default {
    title: '图片',
    name: 'l-image',
    Component: LImageComponent,
    ChangePropComponent: 'PropsComponentForLText',
    defaultProps: {
        url: '',
        width: '100%',
        height: '100%',
    },
}
