///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 👉 Author      : R U Bharti
// 👉 Component   : App.js
// 👉 Status      : Open
///////////////////////////////////////////////////////////////////////////////////////////////////////////

import './App.css'
import { contextVar } from '@/Components/Context/ContextVar'
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, lazy } from 'react';
import 'animate.css'
import MobileRoutes from './Components/Pages/Others/MobileRoutes';

const HomeIndex            =  lazy(() => import('@/Components/Pages/NaxatraComponents/Home/HomeIndex'))
const ProtectedRoutes      =  lazy(() => import('@/Components/Pages/Others/ProtectedRoutes'))
const ErrorPage            =  lazy(() => import('@/Components/Pages/Others/404/ErrorPage'))
const Login                =  lazy(() => import('@/Components/Pages/Others/Login'))
const CareerForm           =  lazy(() => import('@/Components/Pages/Career/CareerForm'))
const LayoutIndex          =  lazy(() => import('@/Components/Pages/Layouts/LayoutIndex'))
const ContentIndex         =  lazy(() => import('@/Components/Pages/NaxatraComponents/Content/ContentIndex'))
const NavBarRoutes         =  lazy(() => import('@/Components/Pages/Others/NavBarRoutes'))
const CareerIndex          =  lazy(() => import('@/Components/Pages/Admin/Career/CareerIndex'))
const NewsIndex            =  lazy(() => import('@/Components/Pages/Admin/News/NewsIndex'))
const ReportMasterIndex    =  lazy(() => import('@/Components/Pages/Admin/ReportMaster/ReportMasterIndex'))
const NewsForm             =  lazy(() => import('@/Components/Pages/Admin/News/NewsForm'))
const MediaMasterIndex     =  lazy(() => import('@/Components/Pages/Admin/MediaMaster/MediaMasterIndex'))
const MobileLogin          =  lazy(() => import('@/Components/Pages/Mobile/MobileLogin'))

function App() {

  // 👉 State constants 👈
  const [refresh, setrefresh] = useState(0)
  const [toggleBar, settoggleBar] = useState(window.localStorage.getItem('device') == 'mobile' ? false : true)
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
    { path: "/media-master", element: <MediaMasterIndex /> },
  ]
  
  // Mobile Routes
  const mobileRoutes = [
    { path: "/mobile/report-master", element: <NewsIndex /> },
    { path: "/mobile/news-form/:id?", element: <NewsForm /> },
    { path: "/mobile/media-master", element: <MediaMasterIndex /> },
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

          <Route element={<MobileRoutes />}>
          {
              mobileRoutes?.map((elem, index) =>
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