import React, { useContext, useState } from 'react'
import { dataContext } from '../context/UserContext';
import axios from 'axios';

const LogIn = () => {
    let {serverUrl} = useContext(dataContext)
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const handleLogin = async(e) => {
    e.preventDefault()
    try {
        let data = await axios.post(serverUrl + "/api/login", {
            email: Email,
            password: Password
        },{withCredentials:true})
        console.log(data)
    } catch (error) {
        console.log(error.message)
    }
    console.log({ Email, Password })
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-8 flex flex-col gap-6">
        
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold tracking-tight">Log In</h1>
          <p className="text-neutral-400 text-sm mt-2">Welcome back. Enter your details to continue.</p>
        </div>

        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
          
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full h-12 bg-neutral-950 text-white outline-none border border-neutral-800 focus:border-cyan-500 rounded-xl px-4 transition-colors placeholder:text-neutral-500" 
            value={Email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full h-12 bg-neutral-950 text-white outline-none border border-neutral-800 focus:border-cyan-500 rounded-xl px-4 transition-colors placeholder:text-neutral-500" 
            value={Password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-lg h-12 rounded-xl mt-2 transition-all active:scale-95">
            Sign In
          </button>
          
        </form>

        <p className="text-center text-neutral-400 text-sm mt-2">
          Don't have an account? <a href="/register" className="text-cyan-500 cursor-pointer hover:underline">Sign up</a>
        </p>
        
      </div>
    </div>
  )
}

export default LogIn