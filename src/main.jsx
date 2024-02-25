import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, Navigate,RouterProvider } from 'react-router-dom'
import Login from './Pages/Login/Login';
import { redirectToPublic } from './Utils/Utils';

//bootstrap
import '../scss/customer.css'

import AdminDashBoard from './Pages/Admin/AdminDashBoard';
import Users from './Pages/Admin/Users/Users';
import Buys from './Pages/Admin/Buys/Buys.jsx';
import Products from './Pages/Admin/Products/Products.jsx';
import UserList from './Pages/Admin/Users/UserList';
import UserInsert from './Pages/Admin/Users/UserInsert';
import UserUpdate from './Pages/Admin/Users/UserUpdate';
import UserDetail from './Pages/Admin/Users/UserDetail';
import ProductList from './Pages/Admin/Products/ProductList'
import BuyList from './Pages/Admin/Buys/BuyList';
import ProductInsert from './Pages/Admin/Products/ProductInsert';
import ProductUpdate from './Pages/Admin/Products/ProductUpdate';
import ProductDetail from './Pages/Admin/Products/ProductDetail';
import BuyInsert from './Pages/Admin/Buys/BuyInsert';
import BuyDetail from './Pages/Admin/Buys/BuyDetail.jsx';
import BuyUpdate from './Pages/Admin/Buys/BuyUpdate.jsx';


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
          },
          {
            path:'insert',
            element:<BuyInsert/>
          },
          {
            path:'detail',
            element:<BuyDetail/>
          },
          {
            path:'update',
            element:<BuyUpdate/>
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
