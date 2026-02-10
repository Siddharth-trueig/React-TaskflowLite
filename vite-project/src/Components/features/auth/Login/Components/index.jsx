import React from 'react'
import { useLogin } from '../hooks/useLogin'
import Login2 from './Login'
export const Login = () => {
    const{handleSubmit,HandleClick,onSubmit,control}=useLogin();
  return (
<Login2
handleSubmit={handleSubmit}
HandleClick={HandleClick}
onSubmit={onSubmit}
control={control}
// formState={formState}
/>
)
}
