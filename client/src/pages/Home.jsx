import React, { useContext } from 'react'
import { dataContext } from '../context/UserContext';

const Home = () => {
  let { userData } = useContext(dataContext)

  if (!userData || Object.keys(userData).length === 0) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome, {userData.firstName || userData.userName || 'User'}!</h1>
    </div>
  )
}

export default Home