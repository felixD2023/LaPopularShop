import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, Navigate, redirect, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login/Login';
import { redirectToPublic } from './Utils/Utils';


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
    element: <div>			<p class="h5">Card</p>
    </div>,
    loader: () => redirectToPublic(),
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
