import Component from './Component'

export * from './interface'
export default {
    title: '文本',
    name: 'l-text',
    Component,
    defaultProps: {
        fontSize: '16px',
        tag: 'div',
        text: '文本',
    },
}
