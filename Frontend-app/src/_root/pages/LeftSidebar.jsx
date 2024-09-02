import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosinstance';
// import { DataContext } from '../../api/DataContext';

const LeftSidebar = () => {
 // const { data, isLoading } = useContext(DataContext); // Empty dependency array ensures this effect runs only once after initial render
 const [user , setUser] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
  const getData = async () => {
    try {
      const response = await axiosInstance.get('/allposts');
      if (response.data) {
        // console.log(response.data.loggedInUser)
        setUser(response.data.loggedInUser); // Ensure you set the correct field from the response
      } else {
        setError('No data returned');
      }
    } catch (err) {
      // console.log(err)
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  getData();
}, []);
  // console.log(loginUser.name)
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/')
  }

  if (isLoading) {
    // Handle the case when loginUser is not available
    return <p>Loading...</p>; // Or handle it according to your app’s needs
  }
  // if (error) {
  //   return <div className='h-[100vh] w-full flex items-center justify-center text-2xl'>{error}</div>;
  // }

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to={"/"} className='flex gap-3 mt-[-10px] items-center'>
          <h1 className="font-semibold uppercase">Snapgraph</h1>
        </Link>
        <Link to={'/profile'} className='flex items-center mt-[-18px] mb-[-8px] gap-3'>
          <i className="ri-user-6-fill py-2 px-3 bg-zinc-700 rounded-full">

          </i>
          <div className='flex flex-col'>
            <p className='body-bold'>
              {user.name || "Full Name"}
            </p>
            <p className='small-regular text-light-3'>
              @{user.username || "username"}
            </p>
          </div>
        </Link>
        <ul className='flex flex-col gap-6'>
          <li className={`leftsidebar-link ${activeLink === '/' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
            <Link to={'/'} className='flex gap-3 py-3 px-2 items-center ' onClick={() => setActiveLink('/')}>
              <i className="ri-home-5-fill text-xl"></i>
              <span>Home</span>
            </Link>
          </li>
          <li className={`leftsidebar-link ${activeLink === '/explore' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
            <Link to={'/explore'} className='flex gap-3 py-3 px-2 items-center ' onClick={() => setActiveLink('/explore')}>
            <i class="ri-search-2-line text-xl"></i>
              <span>Explore</span>
            </Link>
          </li>
          <li className={`leftsidebar-link ${activeLink === '/people' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
            <Link to={'/peoples'} className='flex gap-3 py-3 px-2 items-center ' onClick={() => setActiveLink('/people')}>
              <i className="ri-team-fill text-xl"></i>
              <span>People</span>
            </Link>
          </li>
          <li className={`leftsidebar-link ${activeLink === '/saved' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
            <Link to={'/message'} className='flex gap-3 py-3 px-2 items-center ' onClick={() => setActiveLink('/saved')}>
            <i class="ri-message-fill text-xl"></i>
              <span>Message</span>
            </Link>
          </li>
          <li className={`leftsidebar-link ${activeLink === '/create-post' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
            <Link to={'/create-post'} className='flex gap-3 py-3 px-2 items-center ' onClick={() => setActiveLink('/create-post')}>
              <i className="ri-add-box-fill text-xl"></i>
              <span>Create Post</span>
            </Link>
          </li>
        </ul>
        <button onClick={handleLogout} className='py-3 px-2 mt-16 font-semibold text-lg flex gap-3 rounded-lg transition-all hover:bg-blue-700'>
          <i className="ri-user-shared-2-fill text-lg"></i>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};


export default LeftSidebar
