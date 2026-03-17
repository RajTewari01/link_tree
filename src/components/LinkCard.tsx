"use client"

import { motion } from "framer-motion"

interface LinkCardProps {
  title: string
  subtitle?: string
  url: string
  iconUrl?: React.ReactNode | string
  delay?: number
}

export default function LinkCard({ title, subtitle, url, iconUrl, delay = 0 }: LinkCardProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: delay * 0.05, 
        duration: 0.3, 
      }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="w-full flex items-center bg-transparent py-3 px-2 cursor-pointer group"
    >
      {/* Icon Circle (Left Aligned) */}
      <div className="w-[52px] h-[52px] rounded-full bg-[#f1f1f1] overflow-hidden flex items-center justify-center shrink-0">
        {typeof iconUrl === 'string' && iconUrl.includes('<svg') ? (
          <div dangerouslySetInnerHTML={{ __html: iconUrl }} className="flex items-center justify-center w-full h-full [&_svg]:!w-6 [&_svg]:!h-6" />
        ) : (
          iconUrl
        )}
      </div>
      
      {/* Centered Text Container */}
      <div className="flex-1 flex flex-col items-center justify-center -ml-[52px] px-16">
        <h2 className="text-[#f5f5f5] font-[500] text-[1.1rem] tracking-wide m-0 leading-tight">{title}</h2>
        {subtitle && <p className="text-[#a1a1aa] text-[0.875rem] mt-0.5 m-0 font-normal">{subtitle}</p>}
      </div>
    </motion.a>
  )
}
