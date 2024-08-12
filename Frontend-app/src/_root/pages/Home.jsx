import React, { useContext, useEffect, useState } from 'react';
import PostCard from './PostCard';
import { DataContext } from '../../api/DataContext';
import axiosInstance from '../../api/axiosinstance';

const Home = () => {
  // const { data, isLoading } = useContext(DataContext); // Empty dependency array ensures this effect runs only once after initial render
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:3000/allposts');
        // console.log('API Response:', response); 
        if (response.data) {
          // console.log(response.data)
          setData(response.data.posts); // Ensure you set the correct field from the response
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
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  if (isLoading) {
    return <div className='h-[100vh] w-full flex items-center justify-center text-2xl'>Loading...</div>;
  }

  // if (error) {
  //   return <div className='h-[100vh] w-full flex items-center justify-center text-2xl'>{error}</div>;
  // }
  return (
    <div className='flex flex-1'>
      <div className="home-container">
        <div className="home-posts">
          <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
          <ul className='flex flex-col flex-1 gap-9 w-full'>
            {data.map((post, index) => (
              <li key={index} className='mb-0'>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
