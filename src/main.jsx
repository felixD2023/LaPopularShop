import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login/Login';
import { redirectToPublic,redirectToPrivate } from './Utils/Utils';
import Customer from './Pages/Customer/Customer';
import ProductStock from './Pages/Customer/ProductStock';
import InfoPersonal from './Pages/Customer/InfoPersonal';
import Carrito from './Pages/Customer/Carrito.jsx';
import MisCompras from './Pages/Customer/MisCompras.jsx';

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
import { Provider } from 'react-redux';
import { store } from './Redux/Store.js';


const router = createBrowserRouter([
  {
    path: '',
    element: <Navigate to={'login'} />,
  },
  {
    path: '/login',
    element: <Login />,
    loader:()=>redirectToPrivate(),
  },
  {
    path: '/customer',
    element: <Customer />,
    loader: () => redirectToPublic(),
    children: [
      {
        path: '',
        element: <Navigate to={'Stock'} />
      },
      {
        path: 'Stock',
        element: <ProductStock />
      },
      {
        path: 'InfoPersonal',
        element: <InfoPersonal />

      },
      {
        path: 'Carrito',
        element: <Carrito />

      },
      {
        path: 'MisCompras',
        element: <MisCompras />

      },
      {
        path: '*',
        element: <Navigate to={''} />
      }
    ]
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
            element: <UserList />
          },
          {
            path: 'insert',
            element: <UserInsert />
          },
          {
            path: 'update',
            element: <UserUpdate />
          },
          {
            path: 'update/:userCI',
            element: <UserUpdate />
          },
          {
            path: 'detail',
            element: <UserDetail />
          },
          {
            path: 'detail/:userCI',
            element: <UserDetail />
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
            element: <BuyList />
          },
          {
            path: 'insert',
            element: <BuyInsert />
          },
          {
            path: 'detail',
            element: <BuyDetail />
          },
          {
            path: 'detail/:buyId',
            element: <BuyDetail />
          },
          {
            path: 'update',
            element: <BuyUpdate />
          },
          {
            path: 'update/:buyId',
            element: <BuyUpdate />
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
            element: <ProductList />
          },
          {
            path: 'insert',
            element: <ProductInsert />
          },
          {
            path: 'update',
            element: <ProductUpdate />
          },
          {
            path: 'update/:productId',
            element: <ProductUpdate />
          },
          {
            path: 'detail',
            element: <ProductDetail />
          },
          {
            path: 'detail/:productId',
            element: <ProductDetail />
          },

        ]
      }
    ]

  }
]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
