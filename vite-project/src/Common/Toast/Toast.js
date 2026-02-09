import React from 'react'
import { toast } from 'react-toastify';
export const retryToast = ({message,retry}) => {
   
      toast(`🦄 ${message} ! retry` , {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClick: retry
        });

    
//   return (
//     <div>
// {
//   showBasicToast(message,retry(e))
// }
//     </div>
//   )
}
