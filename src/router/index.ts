export type RouterType = RouterItemType[]
export interface RouterItemType {
    element: JSX.Element | any
    path: string
    children?: any
}
