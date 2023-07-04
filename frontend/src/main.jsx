import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './Home.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const app = createBrowserRouter([
  {
    path: "/",
    element: <App/>,

  },
  {
    path: "/home",
    element: <Home/>,

  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>   
     <RouterProvider router={app} />
  
  </React.StrictMode>
    );
