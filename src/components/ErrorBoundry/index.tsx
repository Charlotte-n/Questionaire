// 定义Props和State的类型
import React from 'react'
interface ErrorBoundaryProps {
    children: React.ReactNode // 子组件
    fallback: React.ReactNode // 出错时的后备UI
}

interface ErrorBoundaryState {
    hasError: boolean
}
class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
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
        console.error(error, info, '出错了')
    }

    render() {
        if ((this.state as any).hasError) {
            // 你可以渲染任何自定义后备 UI
            return this.props.fallback
        }

        return this.props.children
    }
}

export default ErrorBoundary
