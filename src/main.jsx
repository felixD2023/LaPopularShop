import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, Navigate, redirect, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login/Login';
import { redirectToPublic } from './Utils/Utils';
import Customer from './Pages/Customer/Customer';
import ProductStock from './Pages/Customer/ProductStock';


//bootstrap
import '../scss/customer.css'




const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/customer',
    element: <Customer/>,
    loader: () => redirectToPublic(),

    children:[
      {
        path:'',
        element: <ProductStock/>
      },
      {
        path:'*',
        element: <Navigate to={''}/>
      }
    ]
  },
  {
    path: '/admin',
    element: <div>Admin</div>,
    loader: () => redirectToPublic()

  }
]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
