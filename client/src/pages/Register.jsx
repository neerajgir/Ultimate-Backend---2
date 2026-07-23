import React, { useContext, useRef, useState } from 'react'
import DP from "../assets/DP.webp"
import { dataContext } from '../context/UserContext';
import axios from "axios"

const Register = () => {
  const [FirstName, setFirstName] = useState("")
  const [LastName, setLastName] = useState("")
  const [UserName, setUserName] = useState("")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  let {serverUrl} = useContext(dataContext)
  
  let file = useRef(null) 
  
  const handleRegister = async(e) => {
    e.preventDefault()
    try {
      let formData = new FormData()
      formData.append("firstName", FirstName)
      formData.append("lastName", LastName)
      formData.append("userName", UserName)
      formData.append("email", Email)
      formData.append("password", Password)
      if(backendImage){
        formData.append("profileImage", backendImage)
      }
      let data = await axios.post(serverUrl + "/api/signup", formData, {
        withCredentials: true, headers:{"Content-Type": "multipart/form-data"}
      })
      console.log(data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }

  let [frontendImage, setFrontendImage] = useState(DP)
  let [backendImage, setBackendImage] = useState(null)
  
  const handleImage = (e) => {
    let selectedFile = e.target.files[0]
    if (!selectedFile) return 

    setBackendImage(selectedFile)
    let image = URL.createObjectURL(selectedFile)
    setFrontendImage(image)
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-8 flex flex-col gap-6">
        
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold tracking-tight">Register</h1>
          <p className="text-neutral-400 text-sm mt-2">Create your account to get started.</p>
        </div>

        <form className="w-full flex flex-col gap-4" onSubmit={handleRegister}>
          <input type="file" hidden ref={file} onChange={handleImage} accept="image/*" />
          
          <div 
            className="mx-auto w-24 h-24 rounded-full bg-neutral-800 flex flex-col overflow-hidden relative border-2 border-neutral-700 group cursor-pointer"
            onClick={() => file.current.click()}
          >
            <img src={frontendImage} alt="Profile" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-center items-center text-white font-semibold text-2xl">
              +
            </div>
          </div>

          <div className="flex gap-3">
            <input 
              type="text" 
              placeholder="First Name" 
              className="w-1/2 h-12 bg-neutral-950 text-white outline-none border border-neutral-800 focus:border-cyan-500 rounded-xl px-4 transition-colors placeholder:text-neutral-500" 
              value={FirstName} 
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Last Name" 
              className="w-1/2 h-12 bg-neutral-950 text-white outline-none border border-neutral-800 focus:border-cyan-500 rounded-xl px-4 transition-colors placeholder:text-neutral-500" 
              value={LastName} 
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input 
            type="text" 
            placeholder="Username" 
            className="w-full h-12 bg-neutral-950 text-white outline-none border border-neutral-800 focus:border-cyan-500 rounded-xl px-4 transition-colors placeholder:text-neutral-500" 
            value={UserName} 
            onChange={(e) => setUserName(e.target.value)}
          />
          
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
            Sign Up
          </button>
          
        </form>

        <p className="text-center text-neutral-400 text-sm mt-2">
          Already have an account? <a href="/login" className="text-cyan-500 cursor-pointer hover:underline">Log in</a>
        </p>

      </div>
    </div>
  )
}

export default Register