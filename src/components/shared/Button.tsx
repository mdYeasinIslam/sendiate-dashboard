'use client'
import { redirect } from 'next/navigation'
import React from 'react'

const Button = ({path}:{path:string}) => {
  return (
     <button onClick={()=>redirect(`/${path}`)} className="text-green-600 text-xl rounded-full p-1 hover:bg-gray-100">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
    </button>
  )
}

export default Button