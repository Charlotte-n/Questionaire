import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/base.css'
import { RouterProvider } from 'react-router-dom'
import route from './router/index.tsx'
import { Provider } from 'react-redux'
import { store } from './stores/index.ts'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={route}></RouterProvider>
        <Provider store={store}>
            <App></App>
        </Provider>
    </StrictMode>,
)
