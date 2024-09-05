import route from './router/index.tsx'
import { RouterProvider } from 'react-router-dom'

function App() {
    return (
        <>
            <div>
                <RouterProvider router={route}></RouterProvider>
            </div>
        </>
    )
}

export default App
