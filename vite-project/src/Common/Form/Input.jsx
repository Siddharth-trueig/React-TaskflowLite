import React from 'react'

export const Input = ({label,type,rules={},register,name,error,className}) => {
  return (
    <>
  <div className='mt-6'>
<label>{label}</label>
  </div>

    <input type={type}
    className={`${className}`}
    {...register(name,rules)}/>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </>
  )
}

