import { render, waitFor, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Uploader from '../index'
import axios from 'axios'

const file = new File(['hello'], 'hello.png', { type: 'image/png' })
jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>
//mock组件
jest.mock('@ant-design/icons', () => ({
    ...jest.requireActual('@ant-design/icons'), // 导入所有其他图标不变
    DeleteOutlined: () => <span>Delete Icon</span>, // 只模拟 DeleteOutline
    LoadingOutlined: () => <span>Loading Icon</span>,
    FileOutlined: () => <span>File Icon</span>,
}))

function setInputValue(fileInput: HTMLElement) {
    const files = [file]
    Object.defineProperty(fileInput, 'files', {
        value: files,
        writable: false,
    })
}

describe('Uploader component', () => {
    beforeAll(() => {
        const mockDelete = jest.fn()
    })
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
        setInputValue(fileInput)
        await act(() => {
            fireEvent.change(fileInput)
        })
        expect(mockAxios.post).toHaveBeenCalledTimes(1)
        expect(wrapper.querySelector('button')?.textContent).toBe('上传中...')
        //button为disabled
        expect(wrapper.querySelector('input')).toHaveAttribute('disabled', true)

        // 等待上传成功
        await waitFor(() => {
            expect(wrapper.querySelector('button')?.textContent).toBe(
                '上传成功',
            )
        })
        //长度
        expect(wrapper.querySelectorAll('li').length).toBe(1)
        const firstItem = wrapper.querySelector('li:first-child')
        expect(firstItem?.classList).toContain('uploading')
        expect(firstItem?.classList).toContain('uploading-success')
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
        expect(wrapper.querySelector('li')?.classList).toContain('uploading')
        expect(wrapper.querySelector('button span')?.textContent).toBe(
            '上传中...',
        )
        // 等待上传成功
        await waitFor(() => {
            expect(wrapper.querySelector('button span')?.textContent).toBe(
                '上传失败',
            )
        })
        expect(wrapper.querySelectorAll('li').length).toBe(1)
        expect(wrapper.querySelector('li')?.classList).toContain(
            'uploading-error',
        )
        await act(() => {
            fireEvent.click(wrapper.querySelector('.close') as Element)
        })
        expect(wrapper.querySelectorAll('li').length).toBe(0)
    })
    //自定义模块
    test('customized  should work fine', async () => {
        const { container } = render(
            <Uploader action="url">
                {/* 自定义模版 */}
                {{
                    default: <button>Custom Button</button>,
                    loading: <div className="loading">custom loading</div>,
                    uploaded: (props: { url: string }) => (
                        <div className="custom-loaded">{props.url}</div>
                    ),
                }}
            </Uploader>,
        )
        mockAxios.post.mockResolvedValueOnce({ data: { url: 'test.json' } })
        expect(container.querySelector('button')).toHaveTextContent(
            'Custom Button',
        )
        const fileInput = container.querySelector('input') as HTMLInputElement
        setInputValue(fileInput)
        await act(() => {
            fireEvent.change(fileInput)
        })
        // expect(container.querySelector('.loading')).toHaveTextContent(
        //     'custom loading',
        // )
        await waitFor(() => {
            expect(container.querySelector('.custom-loaded')).toHaveTextContent(
                'test.json',
            )
        })
    })
    //生命周期，上传前检查
    test('uploadBefore', async () => {
        const callback = jest.fn()

        const checkFileSize = (file: File) => {
            if (file.size > 2) {
                callback()
                return false
            }
            return true
        }
        const { container } = render(
            <Uploader action="test" beforeUpload={checkFileSize} />,
        )
        mockAxios.post.mockResolvedValueOnce({ data: { url: 'dummy.url' } })
        const fileInput = container.querySelector('input') as HTMLInputElement
        setInputValue(fileInput)
        await act(() => {
            fireEvent.change(fileInput)
        })
        await waitFor(() => {
            //这个mock是否被调用了
            expect(mockAxios.post).not.toHaveBeenCalled()
            expect(container.querySelectorAll('li')?.length).toBe(0)
            expect(callback).toHaveBeenCalled()
        })
    })
    //上传失败的
    test('beforeUpload failed', async () => {
        const failedPromise = () => {
            return Promise.reject('failed')
        }
        const { container } = render(
            <>
                <Uploader beforeUpload={failedPromise} action={'text'} />
            </>,
        )
        mockAxios.post.mockResolvedValueOnce({ data: 'success' })
        const fileInput = container.querySelector('input') as HTMLElement
        setInputValue(fileInput)
        await act(() => {
            fireEvent.change(fileInput)
        })
        await waitFor(() => {
            expect(mockAxios.post).not.toHaveBeenCalled()
            expect(container.querySelectorAll('li')?.length).toBe(0)
        })
    })
    //测试上传进度
    test.only('test upload progress', async () => {
        const screen = render(
            <>
                <Uploader action={'text'} />
            </>,
        )
        mockAxios.post.mockResolvedValueOnce({
            data: {
                url: '123',
            },
        })
        const fileInput = screen.container.querySelector('input') as HTMLElement
        setInputValue(fileInput)
        await act(() => {
            fireEvent.change(fileInput)
        })
        //测试进度
        expect(screen.getByText('0%')).toBeInTheDocument()
        await waitFor(() => {
            expect(screen.getByText('100%')).toBeInTheDocument()
        })
    })
})
