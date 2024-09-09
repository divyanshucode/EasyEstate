
import './App.css'
import { useEffect } from 'react'
import { Route,Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import Login from './pages/Login'
import Layout from './Layout'
import Register from './pages/Register'
import axios from 'axios'
import { UserContextProvider } from './userContext'

import AccountPage from './pages/AccountPage'

axios.defaults.baseURL = 'http://localhost:4000'
   //withCredentials is used to send cookies along with the request between client and server
axios.defaults.withCredentials = true;

function App() {
   

  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout />}>
         <Route index element={<IndexPage/>} />
         <Route path='/login' element={<Login />}/>
         <Route path='/register' element={<Register />}/>
         <Route path='/account/:subpage?' element={<AccountPage />}/>
         <Route path='/account/:subpage/:action' element={<AccountPage />}/>
         
      </Route>
    </Routes>
    </UserContextProvider>
    
  )
}


export default App

