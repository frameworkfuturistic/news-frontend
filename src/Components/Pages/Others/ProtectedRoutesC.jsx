///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 👉 Author      : R U Bharti
// 👉 Component   : Protected Routes
// 👉 Status      : Closed
// 👉 Description : Restrict the outlets to open without authorization and show sidebar
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// 👉 Importing Components and libraries 👈
import { Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {

    return (
        <>

               <Outlet /> 

        </>
    )
}

export default ProtectedRoutes