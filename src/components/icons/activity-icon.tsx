import React, { HTMLProps } from 'react'

interface MySVGComponentProps extends HTMLProps<SVGSVGElement> {
  isActive: boolean
}

export const ActivityIcon: React.FC<MySVGComponentProps> = ({ className, isActive }) => {
  return (
    <svg
      className={`${className} icon ${isActive && 'icon-active'}`}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
