import route from './router/index.tsx'
import { RouterProvider } from 'react-router-dom'
import 'cropperjs/dist/cropper.min.css'

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
