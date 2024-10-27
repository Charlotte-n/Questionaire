import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/base.css'
import 'normalize.css'
import { Provider } from 'react-redux'
import store from './stores/index.ts'
import { Suspense } from 'react'
import { Spin } from 'antd'

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <Provider store={store}>
        <Suspense fallback={<Spin size="large" />}>
            <App></App>
        </Suspense>
    </Provider>,
    // </StrictMode>,
)
