import Component from './Component'
import PropsComponent from './PropComponent'

export * from './interface'
export default {
    title: '文本',
    name: 'l-text',
    Component,
    ChangePropComponent: PropsComponent,
    defaultProps: {
        fontSize: '16px',
        tag: 'div',
        text: '文本',
    },
}
