class ErrorBoundary extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = { hasError: false }
    }

    //捕获错误
    static getDerivedStateFromError(error: any) {
        // 更新状态，以便下一次渲染将显示后备 UI。
        return { hasError: true }
    }

    //这使得你可以在生产中将该错误记录到错误报告服务中（输出错误）
    componentDidCatch(error: any, info: any) {
        // 示例“组件堆栈”：
        //   在 ComponentThatThrows 中（由 App 创建）
        //   在 ErrorBoundary 中（由 APP 创建）
        //   在 div 中（由 APP 创建）
        //   在 App 中
    }

    render() {
        if ((this.state as any).hasError) {
            // 你可以渲染任何自定义后备 UI
            return (this.state as any).fallback
        }

        return (this.state as any).children
    }
}
