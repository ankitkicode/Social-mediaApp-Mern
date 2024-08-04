import React, { useEffect, useState } from 'react';
import fetchProtectedData from '../../api/fetchProtectedData'; // Adjust the path according to your project structure
import PostCard from './PostCard';

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
        // console.log('Fetching data'); // This log will help you see when the fetch starts
        const result = await fetchProtectedData('http://localhost:3000/allposts');
        if (result) {
            // console.log('Data fetched:', result.posts); // This log will help you see the fetched data
            setData(result.posts);
            setIsLoading(false);
        }
    };
    getData();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  // console.log(data.posts)


  if (isLoading) {
    return <div className='h-[100vh] w-full flex items-center justify-center text-2xl'>Loading...</div>;
  }
  
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
