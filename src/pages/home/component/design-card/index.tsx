
interface DesignCardProps {
  title: string
  subtitle: string
  icon: React.ReactNode
  image: string
  className?: string
}

export function DesignCard({ title, subtitle, icon, image, className }: DesignCardProps) {


  return (
      <div>
        <div className="aspect-[4/3] relative overflow-hidden rounded-tl-md rounded-tr-md">
        {/* img当hover的时候 , 图片放大 */}
            <img src={image} alt="" className="object-cover transition-transform duration-300 hover:scale-105  hover:cursor-pointer "/>
            <div className="absolute bottom-0 left-0 right-0 p-4  from-black/60 bg-[#F5F7FD] text-black rounded-bl-md rounded-br-md">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{title}</h3>
                </div>
                <p className="text-sm text-black">{subtitle}</p>
         </div>
        </div>
      </div>
  )
}

