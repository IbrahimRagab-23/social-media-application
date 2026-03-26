import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from './components/Layout/Layout'
import Home from "../pages/Home/Home"
import Profile from "../pages/Profile/Profile"
import About from "../pages/About/About"
import Login from './components/Login/Login'
import Register from './components/register/register'
import { HeroUIProvider } from '@heroui/react'
import AuthContextProvider from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import GuestRoute from './components/ProtectedRoute/GuestRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PostDetails from './components/PostDetails/PostDetails'
 import { ToastContainer } from 'react-toastify';
import ChangePassword from '../pages/ChangePassword/ChangePassword'
const router = createBrowserRouter([
    {path:"/",element:<Layout/>
    ,children:[
    {path:"/Login", element:<GuestRoute><Login/></GuestRoute>},
    {path:"/Register", element:<GuestRoute><Register/></GuestRoute>},
    {path:"/Home", element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:"/Profile", element:<ProtectedRoute><Profile/></ProtectedRoute>},
    {path:"/About", element:<ProtectedRoute><About /></ProtectedRoute>},
    {path:"/PostDetails/:id", element:<ProtectedRoute><PostDetails /></ProtectedRoute>},
    {path:"/ChangePassword", element:<ProtectedRoute><ChangePassword /></ProtectedRoute>}
  ]}
 ])
 const queryClientconfig = new QueryClient();
function App() {
  return (
    <>
<QueryClientProvider client={queryClientconfig}>
  <AuthContextProvider>
    <ToastContainer />
    <HeroUIProvider>  
      <RouterProvider router={router} />
     </HeroUIProvider>
  </AuthContextProvider>
</QueryClientProvider>
    </>
  )
}

export default App