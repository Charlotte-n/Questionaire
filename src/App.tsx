import 'cropperjs/dist/cropper.min.css'

import { RouterProvider } from 'react-router-dom'
import router from './router/router.tsx'

function App() {
    return (
        <div className="App">
            <RouterProvider router={router}></RouterProvider>
        </div>
    )
}

export default App
