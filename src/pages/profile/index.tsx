import React, { FC, useEffect, useState } from 'react'
import { Form, Input, Tabs, Radio, Button, Table, message } from 'antd'
import type { TableProps } from 'antd'
import { useAppSelector, useAppDispatch } from '../../stores'
import { produce } from 'immer'
import Uploader from '../../components/Uploader'
import { UploadImgRes } from '../edit/children/right-edit/cropper'
import { updateUserInfo } from '../../apis/user/login'
import user, { getUserInfoAsync } from '../../stores/user'
import { getDeleteWork, recoverWork } from '../../apis/work/work'

const options = [
    {
        label: '男',
        value: 'male',
    },
    {
        label: '女',
        value: 'female',
    },
]

const MyProfile = () => {
    //获取到用户信息
    const { userInfo } = useAppSelector((state) => state.userSlice)
    const dispatch = useAppDispatch()
    const [FormData, setFormData] = useState({
        nickname: userInfo?.nickname,
        avatar: userInfo?.avatar,
    })

    const handleChangeNickName = (value: string) => {
        setFormData(
            produce((draft) => {
                draft.nickname = value
            }),
        )
    }

    const handleUploadSuccess = (data: UploadImgRes) => {
        setFormData(
            produce((draft) => {
                draft.avatar = data.data.url
            }),
        )
    }

    const handleSubmit = () => {
        updateUserInfo(userInfo?.id as number, FormData)
        dispatch(getUserInfoAsync(''))
        message.success('修改成功')
    }

    return (
        <Form wrapperCol={{ span: 10 }}>
            <Form.Item>您可以在这里修改用户名和头像</Form.Item>
            <Form.Item>
                <Uploader
                    onSuccess={handleUploadSuccess}
                    showUploadList={false}
                >
                    {{
                        default: (
                            <div>
                                {!FormData.avatar ? (
                                    <div className="cursor-pointer w-[80px] h-[80px] rounded-full border-dashed border-[1px] border-black hover:border-[#3c3c3c]"></div>
                                ) : (
                                    <img
                                        src={FormData.avatar}
                                        className="w-[80px] h-[80px] rounded-full hover:scale-[0.8] cursor-pointer"
                                    />
                                )}
                            </div>
                        ),
                        uploaded: () => (
                            <img
                                src={FormData.avatar}
                                className="w-[80px] h-[80px] rounded-full"
                            />
                        ),
                    }}
                </Uploader>
            </Form.Item>
            <Form.Item label={'昵称'} rules={[{ required: true }]}>
                <Input
                    placeholder="请输入用户名"
                    value={FormData.nickname}
                    onChange={(e) => {
                        handleChangeNickName(e.target.value)
                    }}
                ></Input>
            </Form.Item>

            <Form.Item>
                <Button type="primary" onClick={handleSubmit}>
                    提交
                </Button>
            </Form.Item>
        </Form>
    )
}

//恢复
const Recover = () => {
    interface DataType {
        title: string
        id: number
        time: string
        operation: string
    }
    const [FormData, setFormData] = useState<DataType[]>([])

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '标题',
            dataIndex: 'title',
        },
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '最后更新时间',
            dataIndex: 'time',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_, { operation }) => (
                <Button type="primary" onClick={() => handleRecover(operation)}>
                    恢复该作品
                </Button>
            ),
        },
    ]

    //获取删除的列表
    const getDeleteListApi = async () => {
        const res = await getDeleteWork()
        const result = res.data.list
        const resultData = result.map((item) => {
            return {
                title: item.title,
                id: item.id,
                time: item.updatedAt?.toString(),
                operation: item.id?.toString(),
            }
        })
        setFormData(resultData)
    }

    const handleRecover = (id: string) => {
        recoverWork(id, { isDeleted: false })
        getDeleteListApi()
    }

    useEffect(() => {
        getDeleteListApi()
    }, [])

    const data: DataType[] = []
    return <Table<DataType> columns={columns} dataSource={FormData}></Table>
}

const menuList = [
    {
        label: '修改个人信息',
        key: '1',
        children: <MyProfile />,
    },
    {
        label: '恢复删除作品',
        key: '2',
        children: <Recover />,
    },
]

const Profile: FC = () => {
    return (
        <div className="flex justify-center mt-[30px]">
            <Tabs type="card" items={menuList} className="w-[60%]" />
        </div>
    )
}

export default Profile
