import React from 'react'

export const Select = ({label,name,register,rules={},error,className,options=[]}) => {
  return (
<div className='mt-6'>
  <div>
<label>{label}</label>
</div>
  <select {...register(name,rules)}  className={`${className}`}>
<option value="" >Select {label}</option>
{options.map((opt)=>(
    <option key={opt.value} className='bg-amber-900' value={opt.value}>{opt.label}</option>
))}
  </select>
  {error && (
        <p style={{ color: "red" }}>{error.message}</p>
      )}    
      </div>
  )
}
