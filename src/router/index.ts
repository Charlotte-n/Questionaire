export type RouterType = RouterItemType[]
export interface RouterItemType {
    element: JSX.Element
    path: string
    children: any
}
