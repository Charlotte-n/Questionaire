import 'cropperjs/dist/cropper.min.css'

import { RouterProvider } from 'react-router-dom'
import router from './router/router.tsx'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

function App() {
    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <RouterProvider router={router}></RouterProvider>
            </DndProvider>
        </div>
    )
}

export default App
