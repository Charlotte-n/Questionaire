import { createEmptyWork } from "../../../../apis/work/work"
import { DesignCard } from "../../component/design-card"
import { useNavigate } from "react-router-dom"
export default function CreateDesign(){
    const navigate = useNavigate()

    const handleCreateWork = async () => {
        const res = await createEmptyWork()
        if (res.code === 0) {
            navigate(`/gxt/edit/${res.data.id}`)
        }
    }
    return <div className="flex-1 px-[40px] py-[20px]">
            <div className="mb-[20px] text-xl font-bold">创建设计</div>
            <div className="grid grid-cols-4 gap-4 cursor-pointer" onClick={handleCreateWork}>
                <DesignCard 
                icon={<></>}
                title="海报"
                subtitle="创建海报"
                image="https://www.sunmao-design.top/sunmao/admin/assets/article.c470e47e.png"
                className="bg-[#8B5CF6]"
               />
            </div>
         </div>
}