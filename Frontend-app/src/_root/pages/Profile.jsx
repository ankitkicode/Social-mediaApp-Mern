import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../../api/DataContext';
import axiosInstance from '../../api/axiosinstance';
import {jwtDecode} from 'jwt-decode'

const Profile = () => {
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        let url;
        if (id) {
          url = `http://localhost:3000/userpost/${id}`;
        } else {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('No authentication token found');
          }
          url = `http://localhost:3000/userpost/me`; // Assuming 'me' returns the logged-in user's profile
        }

        const response = await axiosInstance.get(url, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfileUser(response.data.user);
        // console.log(profileUser)
      } catch (error) {
        // console.error('Error fetching profile data:', error);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id]);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  if (loading) {
    return <div className='flex h-full w-full items-center justify-center text-2xl'>Loading...</div>;
  }

  if (error) {
    return <div className='flex h-full w-full items-center justify-center text-2xl'>{error}</div>;
  }

  if (!profileUser) {
    return <div>User not found</div>;
  }
 const token = localStorage.getItem('token');
//  console.log(token)
  const isOwnProfile = jwtDecode(token).id === profileUser._id; // Adjust this condition if necessary
//  console.log(isOwnProfile)
  return (
    <div className='profile-container   overflow-hidden'>
      <div className="flex items-start w-full justify-between">
        <h1 className='h2-bold'>Profile</h1>
        <div className='flex items-center gap-3'>
          <div className='relative '>
            <div className='text-xl md:hidden' onClick={handleMenuToggle}>
            {
              isOwnProfile ? (
                <i className="ri-menu-3-line"></i>
              ) : (
                <i class="ri-share-line"></i>
              )
            }

             
            </div>
            {menuOpen && (
              <div
                ref={menuRef}
                className={`fixed left-0 w-full h-[50vh] rounded-t-3xl bg-zinc-700 z-30 transition-transform duration-300 ${menuOpen ? 'transform translate-y-0' : 'transform translate-y-full'}`}
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
                <button onClick={handleLogout}  className='py-4 border-b-2  text-red-600 border-zinc-600'>
                Logout
                </button>
                </ul>
              </div>
            )}
          </div>
          {/* <div className="flex items-center justify-center gap-3 max-[740px]:hidden">
            <p className='text-gray-300 flex gap-1 items-center py-2 px-4 rounded-md justify-center bg-zinc-600'>
              <img src="/assets/icons/edit.svg" height={20} width={20} alt="" />
              <span>Edit Profile</span>
            </p>
          </div> */}
        </div>
      </div>
      <div className='flex items-center relative justify-center flex-col '>
        <img src="/assets/icons/profile-placeholder.svg" className='h-[120px] w-[120px] max-[740px]:h-[90px] max-[740px]:w-[90px]' alt="" />
        <h1 className='h3-bold mt-2'>{profileUser.name}</h1>
        <p className='text-center w-[70%] px-1 max-[740px]:w-full text-xl text-gray-400'> adipisicing elit. Aliquid magnam quis deserunt cum assumenda voluptatibus voluptate...</p>
        <div className='flex items-center justify-evenly  rounded-sm  gap-10 mt-4 py-4 px-8 max-[740px]:text-[20px] max-[740px]:w-full m-auto '>
          <div className='flex flex-col items-center  text-2xl'>
            <span>{profileUser.posts.length}</span>
            <p>Posts</p>
          </div>
          <div className='flex flex-col items-center  text-2xl'>
            <span>{profileUser.followers.length}</span>
            <p>Followers</p>
          </div>
          <div className='flex flex-col items-center  text-2xl'>
            <span>{profileUser.following.length}</span>
            <p>Following</p>
          </div>
        </div>

        <div className="btns flex mt-3 gap-5">
        {isOwnProfile ? (
            <>
              <button className='text-gray-300 flex items-center gap-1 py-2 px-8 rounded-md bg-blue-700'>
              <img src="/assets/icons/edit.svg" height={20} width={20} alt="" />
              <span>Edit Profile</span>
              </button>
              <button className='bg-zinc-700 text-white rounded-md py-2 px-10'>
                Share Profile
              </button>
            </>
          ) : (
            <>
              <button className='text-gray-300 py-2 px-10 rounded-md bg-blue-700'>
                Follow
              </button>
              <button className='bg-zinc-700 text-white rounded-md py-2 px-10'>
                Message
              </button>
            </>
          )}

        </div>

        <div className="flex-center gap-16 py-4 w-full mt-7 border-b-2 border-t-2 border-gray-500  transition flex-1 xl:flex-initial">
          <span>Feed</span>
          <span>Reels</span>
          <span>Saved</span>
        </div>
        <div className='h-auto w-[87%] mt-3 m-auto max-[740px]:w-full max-[740px]:gap-3  flex gap-4 flex-wrap items-start justify-start '>
           {
            profileUser.posts.map((post,index)=>(
           
              <div className='max-[740px]:h-[116px] max-[740px]:w-[116px] h-[150px] w-[150px] ml-2 bg-red-200'>
              <img src={post.image ? `http://127.0.0.1:3000/${post.image}` : "/assets/icons/profile-placeholder.svg"} className='h-full border-gray-500 border w-full object-cover' alt="" />
            </div>
            ))
           }
    
        </div>
      </div>


    </div>
  )
}

export default Profile;
