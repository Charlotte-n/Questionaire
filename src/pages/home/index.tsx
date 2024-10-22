import React, { FC, useEffect, useState } from 'react'

import Hot from './children/hot'
import { useAppDispatch, useAppSelector } from '../../stores'
import { getUserInfoAsync } from '../../stores/user'
import { getLocalStorage } from '../../utils/localstorge'
import { Button, Col, Input, Row, Space } from 'antd'
import { fetchTemplatesAsync } from '../../stores/templates'
import './index.css'
import { useLoadMore } from '../../hooks/useLoadMore'
import { Link } from 'react-router-dom'
import { getMyList } from '../../apis/work/work'
import { TemplateType } from '../../apis/work/interface'
import SingleTemplate from './component/single-template/single-template'

const Home: FC = () => {
    const dispatch = useAppDispatch()
    const { total } = useAppSelector((state) => state.templateSlice)
    const pageSize = 8
    const { opName } = useAppSelector((state) => state.globalSlice)
    const [myWorkList, setMyWorkList] = useState<TemplateType[] | []>([])

    //获取我的作品
    const getMyWorkListApi = async () => {
        const res = await getMyList({ pageSize, pageIndex: 0, isTemplate: 0 })
        console.log(res.data.list)

        setMyWorkList(res.data.list)
    }

    useEffect(() => {
        // 获取用户信息
        dispatch(getUserInfoAsync(getLocalStorage('phone')))
        //获取模板数量
        dispatch(fetchTemplatesAsync({ pageSize, pageIndex: 0 }))
        getMyWorkListApi()
    }, [])

    //加载更多
    const { loadMore, isLastPage } = useLoadMore(fetchTemplatesAsync, total, {
        pageSize,
        pageIndex: 0,
    })

    return (
        <div className="relative top-[-80px]">
            {/* banner */}
            <div className="relative">
                <img
                    src="https://oss.imooc-lego.com/editor/img/background.3744875e.png"
                    alt=""
                    className="w-[100%]"
                />
                <div className="img-content flex flex-col items-center">
                    <h2 className="mb-[15px] text-[35px]">
                        海量精彩设计 一键生成
                    </h2>
                    <div className="ant-search-input-wrapper">
                        <Space.Compact>
                            <Input
                                className="rounded-full w-[25vw]"
                                placeholder="搜索一下，快速找到模板"
                            ></Input>
                            <Button className="rounded-full" type="primary">
                                搜索
                            </Button>
                        </Space.Compact>
                    </div>
                </div>
            </div>
            <div className="bg-[#f2f2f2] py-[15px]">
                <Row>
                    <Col span={8}>
                        <div className="flex justify-center items-center flex-col">
                            <svg
                                t="1729507417601"
                                class="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="5226"
                                width="80"
                                height="80"
                            >
                                <path
                                    d="M152.365176 104.150058l65.435315 734.146473 293.749254 81.553411 294.51571-81.664951 65.568345-734.034932L152.381549 104.150058 152.365176 104.150058 152.365176 104.150058zM729.161948 344.259648 384.611681 344.259648l8.206916 92.206028 328.169181 0L696.256514 712.889333l-184.690396 51.17759L327.102896 712.889333l-12.607132-141.407614 90.410126 0 6.412037 71.879074 100.263541 27.01426 0.228197-0.064468 100.31573-27.077705 10.409071-116.749004L310.478264 526.483876l-24.288173-272.262894 451.030393 0L729.161948 344.259648 729.161948 344.259648 729.161948 344.259648zM729.161948 344.259648"
                                    fill="#1296db"
                                    p-id="5227"
                                ></path>
                            </svg>
                            <p className="font-bold text-[20px] mb-[5px]">
                                专注H5 始终如一
                            </p>
                            <p>三年保持行业领先</p>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="flex justify-center items-center flex-col">
                            <svg
                                t="1729507707758"
                                class="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="9063"
                                width="80"
                                height="80"
                            >
                                <path
                                    d="M973.681778 166.997333H356.551111c-20.224 0-36.579556 16.355556-36.579555 36.579556v269.710222H50.261333c-20.224 0-36.579556 16.327111-36.579555 36.551111v310.897778c0 20.195556 16.355556 36.551111 36.579555 36.551111h617.130667c20.224 0 36.579556-16.355556 36.579556-36.579555v-269.710223h269.710222c20.224 0 36.579556-16.355556 36.579555-36.579555V203.576889c0-20.224-16.355556-36.579556-36.579555-36.579556z m-576 77.710223h228.579555v228.579555H397.653333V244.707556zM320 779.576889H91.392V550.968889h228.579556v228.579555z m306.289778 0H397.653333V550.968889h228.579556v228.579555z m306.289778-306.289778h-228.579556V244.707556h228.579556v228.579555z"
                                    fill="#1296db"
                                    p-id="9064"
                                ></path>
                            </svg>
                            <p className="font-bold text-[20px] mb-[5px]">
                                海量H5 模板
                            </p>
                            <p>一键生成，一分钟轻松制作</p>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="flex justify-center items-center flex-col ">
                            <svg
                                t="1729507845242"
                                class="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="12879"
                                id="mx_n_1729507845243"
                                width="80"
                                height="80"
                            >
                                <path
                                    d="M642.160874 894.856008l0 11.1857q0 5.084409 0.508441 11.1857t0.508441 12.202582q-1.016882 19.320755-10.677259 42.200596t-37.116187 33.048659q-11.1857 4.067527-28.981132 11.694141t-53.386296 7.626614q-30.506455 0-50.33565-7.118173t-31.014896-9.151936q-14.236346-3.050645-22.879841-12.711023t-13.219464-21.862959-5.59285-24.913605-1.016882-22.879841l0-31.523337zM862.82423 229.815293q26.438928 62.029791 30.506455 116.94141t-6.101291 101.179742-29.489573 82.875869-40.166832 64.063555-39.14995 45.251241-25.422046 23.896723q-10.168818 9.151936-18.812314 13.727905t-15.253227 7.626614-12.711023 7.118173-12.202582 13.219464q-13.219464 19.320755-20.337637 37.624628t-12.202582 35.590864q-5.084409 14.236346-11.1857 23.388282t-13.219464 16.270109q-8.135055 8.135055-16.270109 13.219464l-223.714002 0q-8.135055-5.084409-15.253227-13.219464-7.118173-7.118173-14.236346-18.303873t-12.202582-28.472691q-10.168818-29.489573-24.913605-47.285005t-38.133069-35.082423q-16.270109-12.202582-37.116187-32.540218t-41.183714-47.793446-38.641509-61.521351-29.489573-74.740814-13.219464-86.943396 9.151936-97.112214q17.286991-81.350546 59.996028-136.770606t95.586892-88.97716 109.314796-48.301887 102.196624-14.744786q47.793446 0 99.654419 13.219464t100.16286 41.183714 88.468719 71.181728 65.588878 104.230387zM760.119166 437.259186q43.725919-177.95432-113.890765-271.507448-26.438928-16.270109-61.521351-25.422046t-71.690169-9.151936-72.707051 9.151936-64.571996 28.472691q-69.147964 47.793446-93.553128 103.721946t-22.3714 117.958292q1.016882 34.573982 11.694141 62.029791t25.422046 49.82721 30.506455 39.14995 27.96425 29.998014q25.422046 26.438928 44.7428 46.268123t30.506455 50.33565q11.1857 29.489573 35.082423 36.099305t44.234359 6.609732q26.438928 0 50.844091-11.694141t34.573982-36.099305q5.084409-14.236346 20.846077-34.573982t47.285005-56.945382q16.270109-19.320755 31.014896-33.5571t27.455809-28.472691 22.3714-31.014896 15.761668-41.183714z"
                                    p-id="12880"
                                    fill="#1296db"
                                ></path>
                            </svg>
                            <p className="font-bold text-[20px] mb-[5px] mt-[5px]">
                                极致体验
                            </p>
                            <p>用户的一致选择</p>
                        </div>
                    </Col>
                </Row>
            </div>
            {/* 热门海报 */}
            <div className="flex justify-center">
                <div className="flex flex-col items-center py-[20px] px-[24px] max-w-[1200px] w-[1200px]">
                    <div className="flex flex-col items-center  mb-[10px] ">
                        <div className="flex items-center mb-[10px]">
                            <div className="w-[50px] h-[1px] bg-[red] mr-[10px]"></div>
                            <div className="font-bold text-[20px]">
                                热门海报
                            </div>
                            <div className="w-[50px] h-[1px] bg-[red] ml-[10px]"></div>
                        </div>
                        <div>只需替换文字和图片，一键自动生成H5</div>
                    </div>
                    <Hot />
                    {!isLastPage && (
                        <Row className="mt-[20px]">
                            <Button
                                type="primary"
                                className="rounded-full"
                                onClick={loadMore}
                                loading={opName['getTemplateList']}
                            >
                                加载更多
                            </Button>
                        </Row>
                    )}
                </div>
            </div>

            {/* 我的作品 */}
            <div className="flex  flex-col items-center">
                <div className="max-w-[1200px] w-[1200px]">
                    <div className="flex justify-between items-center py-[15px]">
                        <div className="font-bold text-[20px]">我的作品</div>
                        <Link
                            to="/gxt/myWorks"
                            className="text-[#4c81fc] cursor-pointer"
                        >
                            查看我的所有作品
                        </Link>
                    </div>
                    <div>
                        {myWorkList.length > 4
                            ? myWorkList.slice(0, 4).map((item) => {
                                  return (
                                      <Col span={6}>
                                          <SingleTemplate
                                              id={item.id}
                                              type="myWork"
                                              baseInfo={{
                                                  copiedCount: item.copiedCount,
                                                  coverImage: item.coverImg,
                                                  author: item.author,
                                                  title: item.title,
                                              }}
                                          ></SingleTemplate>
                                      </Col>
                                  )
                              })
                            : myWorkList.map((item) => {
                                  return (
                                      <Col span={6}>
                                          <SingleTemplate
                                              id={item.id}
                                              type="myWork"
                                              baseInfo={{
                                                  copiedCount: item.copiedCount,
                                                  coverImage: item.coverImg,
                                                  author: item.author,
                                                  title: item.title,
                                              }}
                                          ></SingleTemplate>
                                      </Col>
                                  )
                              })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
