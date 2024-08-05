import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/')
  }
  return (
    <div className='profile-container   overflow-hidden'>
      <div className="flex items-start w-full justify-between">
        <h1 className='h2-bold'>Profile</h1>
        <div className='flex items-center gap-3'>
          <div className='relative '>
            <div className='text-xl md:hidden' onClick={handleMenuToggle}>
              <i className="ri-menu-3-line"></i>
            </div>
            {menuOpen && (
              <div
                ref={menuRef}
                className={`fixed left-0 w-full h-[50vh] bg-zinc-700 z-30 transition-transform duration-300 ${menuOpen ? 'transform translate-y-0' : 'transform translate-y-full'}`}
                style={{ bottom: '0', transform: `${menuOpen ? 'translateY(0)' : 'translateY(100%)'}` }}
              >
                <ul className=' h-full flex flex-col text-2xl font-semibold gap-2 px-6 py-3'>
                  <p className='text-center my-4 text-xl'>Click Anywhere to close</p>
                <Link className='py-4 border-b-2 border-t-2 border-zinc-600'>
                Saved
                </Link>
                <Link className='py-4 border-b-2  border-zinc-600'>
                Edit-Profile
                </Link>
                <Link className='py-4 border-b-2  border-zinc-600'>
                Setting
                </Link>
                <Link className='py-4 border-b-2  text-red-600 border-zinc-600'>
                Logout
                </Link>
                </ul>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center gap-3 max-[740px]:hidden">
            <p className='text-gray-300 flex gap-1 items-center py-2 px-4 rounded-md justify-center bg-zinc-600'>
              <img src="/assets/icons/edit.svg" height={20} width={20} alt="" />
              <span>Edit Profile</span>
            </p>
          </div>
        </div>
      </div>
      <div className='flex items-center relative justify-center flex-col '>
        <img src="/assets/icons/profile-placeholder.svg" className='h-[120px] w-[120px] max-[740px]:h-[90px] max-[740px]:w-[90px]' alt="" />
        <h1 className='h3-bold mt-2'>Ankit Jatav</h1>
        <p className='text-center w-[70%] px-1 max-[740px]:w-full text-xl text-gray-400'> adipisicing elit. Aliquid magnam quis deserunt cum assumenda voluptatibus voluptate...</p>
        <div className='flex items-center justify-evenly  rounded-sm  gap-10 mt-4 py-4 px-8 max-[740px]:text-[20px] max-[740px]:w-full m-auto '>
          <div className='flex flex-col items-center  text-2xl'>
            <span>52</span>
            <p>Posts</p>
          </div>
          <div className='flex flex-col items-center  text-2xl'>
            <span>566</span>
            <p>Followers</p>
          </div>
          <div className='flex flex-col items-center  text-2xl'>
            <span>698</span>
            <p>Following</p>
          </div>
        </div>
        <div className="btns flex mt-3 gap-5">
          <button className='text-gray-300  py-2 px-10 rounded-md  bg-blue-700'>
            Follow
          </button>
          <button onClick={handleLogout} className='bg-zinc-700 text-white rounded-md  py-2 px-10'>Message</button>
        </div>
        <div className="flex-center gap-16 py-4 w-full mt-7 border-b-2 border-t-2 border-gray-500  transition flex-1 xl:flex-initial">
          <span>Feed</span>
          <span>Reels</span>
          <span>Saved</span>
        </div>
        <div className='h-auto w-[87%] mt-3 m-auto max-[740px]:w-full max-[740px]:gap-3  flex gap-4 flex-wrap items-start justify-start '>

          <div className='max-[740px]:h-[116px] max-[740px]:w-[116px] h-[150px] w-[150px] ml-2 bg-red-200'>
            <img src="/assets/icons/profile-placeholder.svg" className='h-full border-gray-500 border w-full object-cover' alt="" />
          </div>
          <div className='max-[740px]:h-[116px] max-[740px]:w-[116px] h-[150px] w-[150px] ml-2 bg-red-200'>
            <img src="/assets/icons/profile-placeholder.svg" className='h-full border-gray-500 border w-full object-cover' alt="" />
          </div>
          <div className='max-[740px]:h-[116px] max-[740px]:w-[116px] h-[150px] w-[150px] ml-2 bg-red-200'>
            <img src="/assets/icons/profile-placeholder.svg" className='h-full border-gray-500 border w-full object-cover' alt="" />
          </div>

          <div className='max-[740px]:h-[116px] max-[740px]:w-[116px] h-[150px] w-[150px] ml-2 bg-red-200'>
            <img src="/assets/icons/profile-placeholder.svg" className='h-full border-gray-500 border w-full object-cover' alt="" />
          </div>
          <div className='max-[740px]:h-[116px] max-[740px]:w-[116px] h-[150px] w-[150px] ml-2 bg-red-200'>
            <img src="/assets/icons/profile-placeholder.svg" className='h-full border-gray-500 border w-full object-cover' alt="" />
          </div>
          <div className='max-[740px]:h-[116px] max-[740px]:w-[116px] h-[150px] w-[150px] ml-2 bg-red-200'>
            <img src="/assets/icons/profile-placeholder.svg" className='h-full border-gray-500 border w-full object-cover' alt="" />
          </div>
        </div>
      </div>


    </div>
  )
}

export default Profile;
