import React from 'react'
import {Route, Routes} from "react-router-dom"
import LogIn from "./pages/LogIn"
import Register from './pages/Register';


const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<LogIn/>}/>
    </Routes>
  )
}

export default App