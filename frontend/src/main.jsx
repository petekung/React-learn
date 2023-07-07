import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.css'
import Login from './login.jsx'
import Register from './register.jsx'
import Home from './Home.jsx'
import Drawer_ from './drawer.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const app = createBrowserRouter([
  { path: "/", element:<Login />, }, 
  { path: "/home", element: <Home />, }, 
  { path: "/login", element: <Login />, },
  { path: "/register", element: <Register />, }
  , { path: "/drawer", element: <Drawer_ />, }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode >
    <RouterProvider router={app} />

  </React.StrictMode>
);
