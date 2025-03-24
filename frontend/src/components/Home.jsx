import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <>
        <div>Home</div>
        <button><Link to="/login">login</Link></button>
        <button><Link to="/signup">signup</Link></button>
    </>
  )
}
export default Home;