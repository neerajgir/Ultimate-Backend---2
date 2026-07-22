import React, { useState } from 'react'
import DP from "../assets/DP.webp"
const Register = () => {
  const [FirstName, setFirstName] = useState(null)
  const [LastName, setLastName] = useState(null)
  const [UserName, setUserName] = useState(null)
  const [Email, setEmail] = useState(null)
  const [Password, setPassword] = useState(null)

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <div className="w-[90%] max-w-100 h-125 bg-[#141f1f] rounded flex flex-col justify-center items-center gap-5">
        <h1 className="text-white text-2xl font-semibold">Register</h1>
        <form className="w-full flex flex-col justify-center items-center gap-5">
          <div className="w-25 h-25 rounded-full bg-white flex flex-col overflow-hidden relative border-2 border-amber-50">
            <img src={DP} alt="DP" className="w-full h-full" />
            <div className="absolute w-25 h-25 bg-black top-0 hover:opacity-50 opacity-0 cursor-pointer flex justify-center items-center text-amber-50 font-semibold text-[20px]">+</div>
          </div>
          <div className="w-[80%] h-12.5 flex justify-center items-center gap-2.5">
            <input type="text" placeholder="First Name" className="w-[50%] h-full bg-white outline-none border-none rounded-lg px-2.5 py-1.5" value={FirstName} onChange={(e)=>setLastName(e.target.value)}/>
            <input type="text" placeholder="Last Name" className="w-[50%] h-full bg-white outline-none border-none rounded-lg px-2.5 py-1.5" value={LastName} onChange={(e)=>setLastName(e.target.value)}/>
          </div>
          <input type="text" placeholder="Username" className="w-[80%] h-12.5 bg-white outline-none border-none rounded-lg px-2.5 py-1.5" value={UserName} onChange={(e)=>setUserName(e.target.value)}/>
          <input type="email" placeholder="Email" className="w-[80%] h-12.5 bg-white outline-none border-none rounded-lg px-2.5 py-1.5" value={Email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" className="w-[80%] h-12.5 bg-white outline-none border-none rounded-lg px-2.5 py-1.5" value={Password} onChange={(e)=>setPassword(e.target.value)}/>
          <button className="bg-[#07c7e4] text-black px-2.5 py-1.5 rounded-lg">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Register