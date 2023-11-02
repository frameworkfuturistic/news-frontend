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
    { path: "/career", element: <CareerForm /> },
  ]

  const navBarRoutes = [
    { path: "/:type?", element: <HomeIndex /> },
    { path: "/layout", element: <LayoutIndex /> },
    { path: "/news-details/:id/:index?", element: <ContentIndex /> },
  ]

  // 👉 Private Routes Json 👈
  const privateRoutes = [
    { path: "/career-admin", element: <CareerIndex /> },
    { path: "/news-master", element: <NewsIndex /> },
    { path: "/news-form/:id?", element: <NewsForm /> },
    { path: "/report-master", element: <ReportMasterIndex /> },
  ]

  let data = {
    Layout_name: "Landing Page",
    Layout_width: "1366px",
    Block: {
      Block_type: "full- width",
      Column: {
        Width: "200px",
        Height: "100px",
        Section: {
          "section_name": "Branding",
          "height": "200px",
          "width": "50px",
          "renderer_code": 1,
        }
      },
    },
    Block: {
      Block_type: "full - width",
      Column: {
        Width: "200px",
        Height: "100px",
        Section: {
          "section_name": "News Categories",
          "height": "200px",
          "width": "50px",
          "renderer_code": 1,
        }
      },
    },
    Block: {
      Block_type: "full - width",
      Column: {
        Width: "200px",
        Height: "100px",
        Section: {
          "section_name": "Breaking News",
          "height": "200px",
          "width": "50px",
          "renderer_code": 2,
        }
      },
    },
    Block: {
      Block_type: "split - 2",
      Column: {
        Width: "200px",
        Height: "100px",
        Section: {
          "section_name": "Headlines",
          "height": "200px",
          "width": "50px",
          "renderer_code": 2,
        },
        Section: {
          "section_name": "Features",
          "height": "200px",
          "width": "50px",
          "renderer_code": 2,
        },
      },
      Column: {
        Width: "800px",
        Height: "100px",
        Section: {
          "section_name": "Live Feed",
          "height": "200px",
          "width": "50px",
          "renderer_code": 2,
        },
        Row: {
          Column: {
            Width: "800px",
            Height: "100px",
            Section: {
              "section_name": "Short News",
              "height": "200px",
              "width": "50px",
              "renderer_code": 2,
            },
          },
          Column: {
            Width: "800px",
            Height: "100px",
            Section: {
              "section_name": "Ad1",
              "height": "200px",
              "width": "50px",
              "renderer_code": 2,
            },
            Section: {
              "section_name": "Trending",
              "height": "200px",
              "width": "50px",
              "renderer_code": 2,
            },
          }
        },
      },
    },
  }

  useEffect(() => {
    window.localStorage.setItem("layout", JSON.stringify(data))
  }, [])

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