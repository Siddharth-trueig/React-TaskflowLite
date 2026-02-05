// import React from 'react'

// export const Input = ({label,type,rules={},register,name,error,className,...rest}) => {
//   return (
//     <>
//   <div className='mt-6'>
// <label>{label}</label>
//   </div>

//     <input type={type} 
//     className={`${className}`}
//     {...register(name,rules)}{...rest}/>
//       {error && <p style={{ color: "red" }}>{error.message}</p>}
//     </>
//   )
// }
import { Select } from "./Select";
export const Input = ({
  name,
  label,
  type,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  className,
  options=[]
}) => {
 
  return (
    <div className='sm:mt-4 mt-2'>
      <label >{label}</label>
{ type!=="select"?
  <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={className}
      />
:
 ( <select
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full p-2" >
          <option value="">Select {label}</option>

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>)

}
    {error && <p className="error">{error.message}</p>}
    </div>
  );
};


