import React from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/')
  }
  return (
    <div>
      <h1 className='h2-bold'>Profile</h1>
      <button onClick={handleLogout} className='bg-red-600 text-white rounded-md m-5 py-2 px-6'>Logout</button>
    </div>
  )
}

export default Profile
