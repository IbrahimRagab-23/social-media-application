import React from 'react'

export default function MessageResponse({messageOfResponse}) {
  return (
    <>
      <p className='  absolute -top-7.5 left-2 text-red-600 border border-red-600/20 bg-red-600/20 rounded px-2 '>{messageOfResponse}</p>
    </>
  )
}
