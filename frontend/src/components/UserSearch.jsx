import React from 'react'

const UserSearch = ({onChange}) => {
  return (
    <>
    <div className='mx-8 my-6 flex font-bold text-2xl'>
      Users
    </div>
      <div className="mx-8">
      <input onChange={onChange} className=' w-full mb-8 border-2 py-2 pl-3 rounded-md' type="text" name="" id="" placeholder="Search users..." />
      </div>
    </>
  )
}

export default UserSearch
