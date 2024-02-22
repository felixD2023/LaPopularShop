import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, Navigate, redirect, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login/Login';
import { redirectToPublic } from './Utils/Utils';
import Customer from './Pages/Customer/Customer';
import ProductStock from './Pages/Customer/ProductStock';
import InfoPersonal from './Pages/Customer/InfoPersonal';


//bootstrap
import '../scss/customer.css'
import AdminDashBoard from './Pages/Admin/AdminDashBoard';
import Users from './Pages/Admin/Users/Users';
import Buys from './Pages/Admin/Buys/Buys';
import Products from './Pages/Admin/Products/Products';




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
        path:'InfoPersonal',
        element: <InfoPersonal/>

      },
      {
        path:'*',
        element: <Navigate to={''}/>
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminDashBoard/>,
    loader: () => redirectToPublic(),
    children:[
      {
        path:'',
        element:<Navigate to={'users'} />
      },
      {
        path:'users',
        element:<Users/>
      },
      {
        path:'buys',
        element:<Buys/>
      },
      {
        path:'products',
        element:<Products/>
      }
    ]

  }
]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
