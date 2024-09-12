import {
    render,
    waitFor,
    fireEvent,
    cleanup,
    renderHook,
    act,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import Uploader from '../index'
import axios from 'axios'

const file = new File(['hello'], 'hello.png', { type: 'image/png' })
jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

describe('Uploader component', () => {
    test('renders without crashing', () => {
        const { container: wrapper } = render(
            <Uploader action="url"></Uploader>,
        )
        expect(wrapper.querySelector('div')).toBeInTheDocument()
    })
    //测试ui
    test('basic layout before upload', () => {
        const { container: wrapper } = render(
            <Uploader action="url"></Uploader>,
        )
        expect(wrapper.querySelector('button')).toBeInTheDocument()
        expect(wrapper.querySelector('button span')?.textContent).toBe(
            '上传文件',
        )
        expect(wrapper.querySelector('input')).toBeInTheDocument()
    })
    test('upload process should work fine', async () => {
        const { container: wrapper } = render(
            <Uploader action="url"></Uploader>,
        )

        mockAxios.post.mockResolvedValueOnce({ fileUploadStatus: 'success' })
        const fileInput = wrapper.querySelector('input') as HTMLInputElement
        const files = [file]
        Object.defineProperty(fileInput, 'files', {
            value: files,
            writable: false,
        })
        act(() => {
            fireEvent.change(fileInput)
        })
        expect(mockAxios.post).toHaveBeenCalledTimes(1)
        expect(wrapper.querySelector('button span')?.textContent).toBe(
            '上传中...',
        )
        // 等待上传成功
        await waitFor(() => {
            expect(wrapper.querySelector('button span')?.textContent).toBe(
                '上传成功',
            )
        })
    })
    test('upload process should work error', async () => {
        const { container: wrapper } = render(
            <Uploader action="url"></Uploader>,
        )
        mockAxios.post.mockRejectedValueOnce({ fileUploadStatus: 'error' })
        const fileInput = wrapper.querySelector('input') as HTMLInputElement
        act(() => {
            fireEvent.change(fileInput)
        })
        expect(mockAxios.post).toHaveBeenCalledTimes(1)
        expect(wrapper.querySelector('button span')?.textContent).toBe(
            '上传中...',
        )
        // 等待上传成功
        await waitFor(() => {
            expect(wrapper.querySelector('button span')?.textContent).toBe(
                '上传失败',
            )
        })
    })
})
