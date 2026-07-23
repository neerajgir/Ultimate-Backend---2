import axios from 'axios';
import React, { useState, createContext, useEffect } from 'react'

export const dataContext = createContext()

const UserContext = ({children}) => {
  let [userData, setUserData] = useState(null)
    const serverUrl = "http://localhost:3000"
    const getUserData = async () => {
      try {
        let {data} = await axios.get(serverUrl + "/api/getuserdata",{
          withCredentials: true
        })
        setUserData(data.user)
      } catch (error) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return
        }
        console.error(error)
      }
    }
    const value = {
        serverUrl, userData, setUserData,getUserData
    }
    useEffect(()=>{
       getUserData()
    },[])
  return (
    <dataContext.Provider value={value}>
        {children}
    </dataContext.Provider>
  )
}

export default UserContext