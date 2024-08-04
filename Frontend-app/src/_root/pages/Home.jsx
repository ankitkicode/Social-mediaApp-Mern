import React, { useEffect, useState } from 'react';
import fetchProtectedData from '../../api/fetchProtectedData'; // Adjust the path according to your project structure
import PostCard from './PostCard';

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
        // console.log('Fetching data'); // This log will help you see when the fetch starts
        const result = await fetchProtectedData('http://localhost:3000/allposts');
        if (result) {
            // console.log('Data fetched:', result); // This log will help you see the fetched data
            setData(result);
        }
    };
    getData();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  // // Log data when it changes
  // useEffect(() => {
  //   console.log('Data state updated:', data);
  // }, [data]);

  const posts = [1, 2, 2, 4, 3, 4, 4, 5];
  
  return (
    <div className='flex flex-1'>
      <div className="home-container">
        <div className="home-posts">
          <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
          <ul className='flex flex-col flex-1 gap-9 w-full'>
            {posts.map((post, index) => (
              <li key={index} className='mb-0'>
                <PostCard />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
