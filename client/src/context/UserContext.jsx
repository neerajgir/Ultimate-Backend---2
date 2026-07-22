import React, { createContext } from 'react'

export const dataContext = createContext()

const UserContext = ({children}) => {
    const serverUrl = "http://localhost:3000"
    const value = {
        serverUrl
    }
  return (
    <dataContext.Provider value={value}>
        {children}
    </dataContext.Provider>
  )
}

export default UserContext