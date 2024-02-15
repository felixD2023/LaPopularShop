import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login/Login';
import { redirectToPublic } from './Utils/Utils';
import Customer from './Pages/Customer/Customer';


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
