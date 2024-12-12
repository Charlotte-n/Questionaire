import { memo } from "react"
import { Button, Row } from "antd"
import { useState } from "react"
import Hot from "../hot"
import { useLoadMore } from "../../../../hooks/useLoadMore"
import { fetchTemplatesAsync } from "../../../../stores/templates"
import { useAppSelector} from "../../../../stores"



const Recomend = () => {
    const [isActive,setIsActive] = useState(0)
    const { total } = useAppSelector((state) => state.templateSlice)
    const { opName } = useAppSelector((state) => state.globalSlice)
    const pageSize = 8  

    //加载更多
    const { loadMore, isLastPage } = useLoadMore(fetchTemplatesAsync, total, {
        pageSize,
        pageIndex: 0,
    })

    const handleActive = (index: number) => {
        setIsActive(index)
    }

    return   (
        <main className="flex-1 px-[40px] py-[20px]">
        {/* Banner */}
        <div className="relative h-48 overflow-hidden  ">
           <img
                  src="https://www.sunmao-design.top/sunmao/admin/assets/banner1.257cfb40.png"
                  alt=""
                  className="w-[100%] h-[192px] rounded-md"
              />
        </div>
        <div className="py-[10px]">
         <div>
          <Button className={`py-[18px]  ${isActive === 0 ? 'bg-blue-600 text-[white]' : 'bg-white text-[black] '}`} onClick={()=>handleActive(0)}>推荐模板</Button>
         </div>
        </div>
  
        {/* Content Sections */}
        <div className="p-4">
          <h2 className="text-lg font-medium mb-4">推荐模板</h2>
          <Hot/>
          {!isLastPage && (
                      <Row className="mt-[20px] flex justify-center">
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
      </main>
    )
   
}

export default memo(Recomend)