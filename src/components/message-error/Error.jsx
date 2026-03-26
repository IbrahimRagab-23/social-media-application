import React from 'react'

export default function Error({eOfMessage}) {
  return (
    <>
      <p className='  absolute -bottom-8 left-2 text-red-600 border border-red-600/20 bg-red-600/20 rounded px-2'>{eOfMessage}</p>
    </>
  )
}
