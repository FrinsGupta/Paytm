import React from 'react'

const InputBox = ({label, placeholder, type}) => {
  return (
    <div className='mb-1 w-full px-9'>
      <label className='my-2 font-semibold' htmlFor="">{label}</label>
      <br />
      <input className=' w-full my-2 border-2 py-2 pl-3 rounded-md' type={type} name="" id="" placeholder={placeholder} />
    </div>
  )
}

export default InputBox
