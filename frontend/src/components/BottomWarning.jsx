import React from 'react'
import { useNavigate } from 'react-router-dom'

const BottomWarning = ({warning, link}) => {
  const navigate = useNavigate()
  return (
    <div className=' font-semibold flex mt-2 mb-7' >
      {warning} <p className='underline ml-2 cursor-pointer'> <button className=' underline' onClick={()=>{
        if (link=="Login") {
          navigate('/')
        }
        else{
          navigate('/signup')
        }
      }}>{link}</button> </p> 
    </div>
  )
}

export default BottomWarning
