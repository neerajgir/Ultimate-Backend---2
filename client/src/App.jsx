import React from 'react'
import {Route, Routes} from 'react-router-dom'
import SignUp from './pages/signup';
import LogIn from './pages/LogIn';

const App = () => {
  return (
    <Routes>
      <Route path="/SignUp" element = {<SignUp/>}/>
      <Route path="/LogIn" element = {<LogIn/>}/>
    </Routes>
  )
}

export default App