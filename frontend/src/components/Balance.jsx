import React from 'react'

const Balance = ({balance}) => {
  return (
    <div className='mx-8 my-6 flex font-bold text-2xl'>
      Your Balance <p className='ml-4'>${balance}</p>
    </div>
  )
}

export default Balance
