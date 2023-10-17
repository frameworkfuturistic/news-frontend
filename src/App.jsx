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

function App() {

  // 👉 State constants 👈
  const [refresh, setrefresh] = useState(0)

  // 👉 Context data (used globally) 👈
  const contextData = {
    refresh, setrefresh,
  }

  // 👉 Public Routes Json 👈
  const publicRoutes = [
    { path: "/", element: <HomeIndex /> },
    { path: "/login", element: <Login /> },
    { path: "/career", element: <CareerForm /> },
  ]

  // 👉 Private Routes Json 👈
  const privateRoutes = [
    { path: "/", element: <HomeIndex /> },
    { path: "/career", element: <CareerForm /> },
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