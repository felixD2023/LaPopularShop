import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, Navigate,RouterProvider } from 'react-router-dom'
import Login from './Pages/Login/Login';
import { redirectToPublic } from './Utils/Utils';

//bootstrap
import '../scss/customer.css'

import AdminDashBoard from './Pages/Admin/AdminDashBoard';
import Users from './Pages/Admin/Users/Users';
import Buys from './Pages/Admin/Buys/Buys';
import Products from './Pages/Admin/Products/Products';
import UserList from './Pages/Admin/Users/UserList';
import UserInsert from './Pages/Admin/Users/UserInsert';
import UserUpdate from './Pages/Admin/Users/UserUpdate';
import UserDetail from './Pages/Admin/Users/UserDetail';
import ProductList from './Pages/Admin/Products/ProductList'
import BuyList from './Pages/Admin/Buys/BuyList';
import ProductInsert from './Pages/Admin/Products/ProductInsert';
import ProductUpdate from './Pages/Admin/Products/ProductUpdate';
import ProductDetail from './Pages/Admin/Products/ProductDetail';


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
    element: <AdminDashBoard />,
    loader: () => redirectToPublic(),
    children: [
      {
        path: '',
        element: <Navigate to={'users'} />
      },
      {
        path: 'users',
        element: <Users />,
        children: [
          {
            path: '',
            element: <Navigate to={'list'} />
          },
          {
            path: 'list',
            element: <UserList/>
          },
          {
            path:'insert',
            element:<UserInsert/>
          },
          {
            path:'update',
            element:<UserUpdate/>
          },
          {
            path:'detail',
            element:<UserDetail/>
          }
        ]
      },
      {
        path: 'buys',
        element: <Buys />,
        children: [
          {
            path: '',
            element: <Navigate to={'list'} />
          },
          {
            path: 'list',
            element: <BuyList/>
          }
        ]
      },
      {
        path: 'products',
        element: <Products />,
        children: [
          {
            path: '',
            element: <Navigate to={'list'} />
          },
          {
            path: 'list',
            element: <ProductList/>
          },
          {
            path: 'insert',
            element: <ProductInsert/>
          },
          {
            path: 'update',
            element: <ProductUpdate/>
          },
          {
            path: 'detail',
            element: <ProductDetail/>
          },

        ]
      }
    ]

  }
]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
