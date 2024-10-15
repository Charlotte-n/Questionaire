import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/base.css'
import 'normalize.css'
import { Provider } from 'react-redux'
import store from './stores/index.ts'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </Provider>,
    // </StrictMode>,
)
