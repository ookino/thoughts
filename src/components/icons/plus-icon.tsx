import React, { HTMLProps } from 'react'
interface MySVGComponentProps extends HTMLProps<SVGSVGElement> {
  isActive: boolean
}

const PlusIcon: React.FC<MySVGComponentProps> = ({ className, isActive }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className} icon ${isActive && 'icon-active'}`}
    >
      <path d='M4 12H20M12 4V20' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default PlusIcon
