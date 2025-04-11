import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Products from './components/Products/Products'; 
import Cart from "./components/Cart/Cart"
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Signout from './components/Signout/Signout';
import Notfound from './components/Notfound/Notfound';
import Home from './components/Home/Home';
import Brands from './components/Brands/Brands';
import CounterContextProvider from "./context/CounterContext"
import UserContextProvider, { UserContext } from './context/userContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetalis from './components/productDetalis/productDetalis';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production';
import CartContextProvider  ,{ CartContext } from './context/CartContext';

import { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';

let qurey = new QueryClient()

let x = createBrowserRouter([
  {path :"" , element:<Layout/> ,
    children:[
    {index :true, element: <ProtectedRoute><Home/></ProtectedRoute> },
    {path: "products", element: <ProtectedRoute><Products/></ProtectedRoute>},
    {path: "carts", element: <ProtectedRoute><Cart/></ProtectedRoute> },
    {path: "brands", element:<ProtectedRoute> <Brands/> </ProtectedRoute>},
    {path: "categories", element: <ProtectedRoute><Categories/></ProtectedRoute> },
    {path: "checkout", element: <ProtectedRoute><Checkout/></ProtectedRoute> },
    {path: "productdetalis/:id/:category", element: <ProtectedRoute><ProductDetalis/></ProtectedRoute> },
    {path: "login", element: <Login/> },
    {path: "register", element: <Register/> },
    {path: "signout", element: <Signout/> },
    {path: "*", element: <Notfound/>},
  ]}
])

export default function App() {
  return (
   <>
   <UserContextProvider>
      <CounterContextProvider>
      <QueryClientProvider client={qurey}>
        <CartContextProvider>
        <RouterProvider router={x}></RouterProvider>
        <Toaster></Toaster>
        </CartContextProvider>
        <ReactQueryDevtools/>
      </QueryClientProvider>
      </CounterContextProvider>
    </UserContextProvider>

   </>
  )
}
