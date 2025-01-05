import { memo, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Button } from "antd"
import { PlusCircleOutlined } from "@ant-design/icons"
import { createEmptyWork } from "../../apis/work/work"

const navItems = [
  {
    title: "我的海报",
    href: "/myWorkBatch",
  },

]

const MyWorkBatch = () => {
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState(1)

  const handleEdit = async () => {
    setIsActive(0)
    const res = await createEmptyWork()
    if (res.code === 0) {
      navigate(`/gxt/edit/${res.data.id}`)
    }
  }

  const handleActive = (type: number) => {
    setIsActive(type)
    navigate('/gxt/myWorkBatch/haibao')
  }
  return (
    <div className="flex gap-2  p-4 h-screen">
      <div className="border-r p-4">
        <Button className="w-full gap-2" onClick={handleEdit}>
          <PlusCircleOutlined className="w-4 h-4" />
          创建项目
        </Button>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <div
              onClick={() => handleActive(1)}
              key={item.href}

              className={
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              }
            >
              {item.title}
            </div>
          ))}
        </nav>
      </div>
      <div className="flex-1 px-[20px] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default memo(MyWorkBatch)