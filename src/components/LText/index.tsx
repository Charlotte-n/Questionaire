import Component from './Component'
import PropsComponent from '../../pages/components/PropComponent'

export * from './interface'
export default {
    title: '文本',
    name: 'l-text',
    Component,
    ChangePropComponent: 'PropsComponentForLText',
    defaultProps: {
        fontSize: '16px',
        tag: 'div',
        text: '文本',
        fontFamily: '',
        fontWeight: '500',
        color: 'black',
        lineHeight: '1',
        textAlign: 'left',
    },
}
