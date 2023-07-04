import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './login.jsx'
import Register from './register.jsx'
import Home from './home.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const app = createBrowserRouter([
  { path: "/", element: <App />, }, { path: "/home", element: <Home />, }, { path: "/login", element: <Login />, },{ path: "/register", element: <Register />, }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={app} />

  </React.StrictMode>
);
