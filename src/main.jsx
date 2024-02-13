import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <h1>Login</h1>,
  },
  {
    path:'/customer',
    element:<div>Customer</div>,
    loader:  () => {
      const user =  localStorage.getItem('userLaPopular')
      if(!user){
        console.log(user)
        return redirect('/login')
      }
      return null;
    }
  },
  {
    path:'/admin',
    element:<div>Admin</div>
  }
]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
