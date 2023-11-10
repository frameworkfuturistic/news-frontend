///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 👉 Author      : R U Bharti
// 👉 Component   : App.js
// 👉 Status      : Open
///////////////////////////////////////////////////////////////////////////////////////////////////////////

import './App.css'
import { contextVar } from '@/Components/Context/ContextVar'
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomeIndex from '@/Components/Pages/NaxatraComponents/Home/HomeIndex';
import { useEffect, useState } from 'react';
import ProtectedRoutes from '@/Components/Pages/Others/ProtectedRoutes';
import ErrorPage from '@/Components/Pages/Others/404/ErrorPage';
import Login from './Components/Pages/Others/Login';
import 'animate.css'
import CareerForm from './Components/Pages/Career/CareerForm';
import LayoutIndex from './Components/Pages/Layouts/LayoutIndex';
import ContentIndex from './Components/Pages/NaxatraComponents/Content/ContentIndex';
import NavBarRoutes from './Components/Pages/Others/NavBarRoutes';
import CareerIndex from './Components/Pages/Admin/Career/CareerIndex';
import NewsIndex from './Components/Pages/Admin/News/NewsIndex';
import ReportMasterIndex from './Components/Pages/Admin/ReportMaster/ReportMasterIndex';
import NewsForm from './Components/Pages/Admin/News/NewsForm';
import MediaMasterIndex from './Components/Pages/Admin/MediaMaster/MediaMasterIndex';
import MobileLogin from './Components/Pages/Mobile/MobileLogin';

function App() {

  // 👉 State constants 👈
  const [refresh, setrefresh] = useState(0)
  const [toggleBar, settoggleBar] = useState(true)
  const wpx = JSON.parse(localStorage.getItem("layout"))?.Layout_width || "1366px";

  // 👉 Context data (used globally) 👈
  const contextData = {
    refresh, setrefresh, 
    toggleBar, settoggleBar,
    wpx
  }

  // 👉 Public Routes Json 👈
  const publicRoutes = [
    { path: "/login", element: <Login /> },
    { path: "/mobile-login", element: <MobileLogin /> },
    { path: "/career", element: <CareerForm /> },
  ]

  const navBarRoutes = [
    { path: "/:type?", element: <HomeIndex /> },
    { path: "/layout", element: <LayoutIndex /> },
    { path: "/news-details/:id/:cId?", element: <ContentIndex /> },
  ]

  // 👉 Private Routes Json 👈
  const privateRoutes = [
    { path: "/career-admin", element: <CareerIndex /> },
    { path: "/news-master", element: <NewsIndex /> },
    { path: "/news-form/:id?", element: <NewsForm /> },
    { path: "/report-master", element: <ReportMasterIndex /> },
    { path: "/media-master", element: <MediaMasterIndex /> },
  ]

  return (
    <>

      <Toaster />

      <contextVar.Provider value={contextData}>
      <Routes>
         {
            publicRoutes?.map((elem, index) =>
              <Route key={index} path={elem?.path} element={elem?.element} />
            )
          }

          <Route element={<NavBarRoutes />}>
          {
            navBarRoutes?.map((elem, index) =>
              <Route key={index} path={elem?.path} element={elem?.element} />
            )
          }
          </Route>

          <Route element={<ProtectedRoutes />}>

            {
              privateRoutes?.map((elem, index) =>
                <Route key={index} path={elem?.path} element={elem?.element} />
              )
            }

          </Route>

          <Route path='*' element={<ErrorPage />} />

        </Routes>

      </contextVar.Provider>

    </>
  )
}

export default App