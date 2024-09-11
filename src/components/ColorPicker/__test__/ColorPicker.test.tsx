import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import ColorPicker from '../index'

const defaultColors = [
    '#ffffff',
    '#f5222d',
    '#fa541c',
    '#fadb14',
    '#52c41a',
    '#1890ff',
    '#722ed1',
    '#8c8c8c',
    '#000000',
    '',
]

describe('ColorPicker component', () => {
    test('renders without crashing', () => {
        render(<ColorPicker />)
        expect(screen.queryByRole('color')).toBeInTheDocument()
    })
    //测试ui，界面结构是否正确
    test('should render correctly', () => {
        const { container } = render(<ColorPicker />)
        //测试是否有input
        const input = container.querySelector('input') as HTMLInputElement
        expect(input).toHaveAttribute('type', 'color')
        expect(input).toHaveValue('#f5222d')
        //测试这个li是否为指定的个数
        expect(container.querySelectorAll('.picked-color-list li').length).toBe(
            defaultColors.length,
        )
        const firstItem = container.querySelector(
            'li:first-child div',
        ) as HTMLDivElement
        expect(firstItem).toHaveStyle({ backgroundColor: defaultColors[0] })
        //最后一项是否有特殊类名
        // const lastItem = container.querySelector(
        //     'li:last-child div',
        // ) as HTMLDivElement
        // expect(lastItem).toHaveClass('transparent-color')
    })
    //测试行为
    test('should send the correct event when color changed', async () => {
        render(<ColorPicker />)
        const blackHex = '#000000'
        const input = screen.getByRole('color')
        fireEvent.change(input, { target: { value: blackHex } })
        expect(input).toHaveValue(blackHex)
    })
    test('should send the correct event when click the color list', () => {
        const { container } = render(<ColorPicker />)
        const input = screen.getByRole('color')
        const firstItem = container.querySelector(
            'li:first-child div',
        ) as HTMLDivElement
        userEvent.click(firstItem)
        expect(input).toHaveValue(defaultColors[0])
    })
})
