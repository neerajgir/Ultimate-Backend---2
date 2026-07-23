import React, { useContext } from 'react'
import {Navigate, Route, Routes} from "react-router-dom"
import LogIn from "./pages/LogIn"
import Register from './pages/Register';
import Home from './pages/Home';
import { dataContext } from './context/UserContext.jsx';

const App = () => {
  let { userData } = useContext(dataContext)
  let isAuthenticated = Boolean(userData && Object.keys(userData).length > 0)

  return (
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/home" element={isAuthenticated ? <Home/> : <Navigate to="/login" replace />}/>
    </Routes>
  )
}

export default App