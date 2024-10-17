import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/base.css'
import 'normalize.css'
import { Provider } from 'react-redux'
import store from './stores/index.ts'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense } from 'react'

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <Provider store={store}>
        <Suspense>
            <App></App>
        </Suspense>
    </Provider>,
    // </StrictMode>,
)
