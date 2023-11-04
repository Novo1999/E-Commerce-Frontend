import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/Error.tsx'
import App from './App.tsx'
import {
  AllProducts,
  HomeLayout,
  SingleProduct,
  ProductByCategory,
} from './pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomeLayout />,
        index: true,
      },
      {
        path: 'all-products',
        element: <AllProducts />,
      },
      {
        path: '/products/product/:id',
        element: <SingleProduct />,
      },
      {
        path: '/products/product',
        element: <ProductByCategory />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
