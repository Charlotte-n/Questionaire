import { useEffect, useState } from "react"
import { Outlet,useNavigate,useLocation } from "react-router-dom"
// import { Star, Layout, User, PenBox } from 'lucide-react'

export default function Page() {
  const [isMenuActive,setIsMenuActive] = useState(0)
  const navigate = useNavigate()
  //获取到路由的path
  const { pathname } = useLocation()

  const handleMenuActive = (type:number)=>{
    setIsMenuActive(type)
    switch(type){
      case 0:
        navigate('/gxt/home/recomend')
        break
      case 1:
        navigate('/gxt/home/create-design')
        break
    }
  }

  useEffect(()=>{
    if(pathname.includes('/gxt/home/recomend')){
      setIsMenuActive(0)
    }else if(pathname.includes('/gxt/home/create-design')){
      setIsMenuActive(1)
    }
  },[pathname])
  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-48 border-r min-h-[calc(100vh-3.5rem)] p-4">
          <nav className="space-y-2">
            <a href="#" className={
              `flex items-center space-x-2 p-2 text-gray-600 hover:bg-gray-100 rounded-md ${isMenuActive === 0 ? 'bg-gray-100 text-[white]' : ''}`
            } onClick={()=>handleMenuActive(0)}>
              <span>为你推荐</span>
            </a>
            <div className="pt-2 pb-2">
              <div className="text-sm text-gray-500">个人空间</div>
            </div>
            <a href="#" className={
              `flex items-center space-x-2 p-2 text-gray-600 hover:bg-gray-100 rounded-md ${isMenuActive === 1  ? 'bg-gray-100 text-[white]' : ''}`
            } onClick={()=>handleMenuActive(1)}>
              <span>创建设计</span>
            </a>
          </nav>
        </aside>
        <div className="flex-1">
            <Outlet/>
        </div>
      </div>
    </div>
  )
}

