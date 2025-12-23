import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './Components/home/home.jsx'
import About from './Components/about/about.jsx'
import Login from './Components/login/login.jsx'
import Register from './Components/register/register.jsx'

const router = createBrowserRouter([

  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path:"about",
        element: <About/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:'register',
        element:<Register/>
      }
    ]

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
