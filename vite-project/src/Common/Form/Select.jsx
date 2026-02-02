import React from 'react'

export const Select = ({label,name,register,rules={},error,className,options=[]}) => {
  return (
<div>
<label>{label}</label>

  <select {...register(name,rules)}>
<option value="">Select {label}</option>
{options.map((opt)=>(
    <option key={opt.value} value={opt.value}>{opt.label}</option>
))}
  </select>
  {error && (
        <p style={{ color: "red" }}>{error.message}</p>
      )}    
      </div>
  )
}
