import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import {AuthPage, DashboardPage} from '../pages'
const Routes = () => {

    const router = createBrowserRouter([
        {
          path: "/auth",
          element: <AuthPage/>,
        },
        {
            path: "/home",
            element: <DashboardPage />,
          },
      ]);

  return (
    <RouterProvider router={router} />
  )
}

export default Routes
