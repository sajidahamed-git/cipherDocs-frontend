import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Login from './login.tsx'
import Example from './Example.tsx'


const router = createBrowserRouter([
  {
    path:"/",
    element:<Example/>
  },
  {
    path:"login",
    element:<Login/>
  },
  {
    path:'app',
    element:<App/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
