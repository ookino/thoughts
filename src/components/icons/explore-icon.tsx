import React, { HTMLProps } from 'react'

interface MySVGComponentProps extends HTMLProps<SVGSVGElement> {
  isActive: boolean
}

export const ExploreIcon: React.FC<MySVGComponentProps> = ({ className, isActive }) => {
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
        d='M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}