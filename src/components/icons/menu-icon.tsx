import React, { HTMLProps } from 'react'

interface MySVGComponentProps extends HTMLProps<SVGSVGElement> {}

export const MenuIcon: React.FC<MySVGComponentProps> = ({ className }) => {
  return (
    <svg
      className={`${className} icon `}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M3 10H21M3 14H12' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}
