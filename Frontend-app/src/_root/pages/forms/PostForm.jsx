import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosinstance';
import { toast } from 'react-toastify';

const PostForm = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate()

  const handlePhotoChange = (e) => {
    setImage(e.target.files[0]);
  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract tags as an array
    const tagsArray = tags.split(',').map(tag => tag.trim());

    try {
      const token = localStorage.getItem('token');

      // Create FormData object
      const formData = new FormData();
      formData.append('caption', caption);
      formData.append('profileImage', image);
      formData.append('tags', tagsArray);
      formData.append('location', location);

      // Send form data to the server
      const response = await axiosInstance.post('/create-post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
           Authorization: `Bearer ${token}`
        }
      });

      // console.log('Post created:', response.data);
      toast.success(response.data.message);
      navigate('/')

      // Clear form fields after successful submission
      setCaption('');
      setImage(null); // Set image to null instead of an empty string
      setTags('');
      setLocation('');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(error.response ? error.response.data.message : 'Error creating post');
    }
  };



  const handleCancel = () => {
    // Handle cancel action here
   navigate('/')
  };
  return (
    <form onSubmit={handleSubmit} className='w-full' method='Post' enctype="multipart/form-data">
          <div className="mb-4">
            <label className='text-xl font-semibold'>Write Caption</label>
            <textarea
              className="w-full mt-4
               p-3 border rounded-lg bg-zinc-800 outline-none text-white resize-none h-24"
              placeholder="Write a caption..."
              value={caption}
              name='caption'
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2 text-xl font-semibold">Add Photos</label>
            <div className="flex items-center justify-center w-full h-[35vh] max-[544px]:h-[25vh]  border-2 border-dashed rounded-lg cursor-pointer hover:bg-zinc-800 relative">
              <input
                type="file"
                name='image'
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handlePhotoChange}
              />
              <div className="flex flex-col items-center justify-center">
                <img src="/public/assets/icons/file-upload.svg" alt="Add Photos" width={50} height={50} />
                <span className="text-white">Drag photo here or click to select</span>
                <span className="text-gray-400 text-sm">SVG, PNG, JPG</span>
                <button className="mt-2 py-1 px-3 bg-gray-700 text-white rounded-lg">Select from computer</button>
              </div>
            </div>
          </div>

          <div className="mb-4 gap-7 md:flex md:gap-4">
            <div className="flex-1 mb-4 md:mb-0">
              <label className="block text-white mb-2 text-xl font-semibold">Add Tags (separated by commas)</label>
              <input
                type="text"
                name='tags'
                className="w-full p-3 border rounded-lg outline-none bg-zinc-800 text-white"
                placeholder="e.g. travel, nature"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-white mb-2 text-xl font-semibold">Add Location</label>
              <input
                type="text"
                name='location'
                className="w-full p-3 border rounded-lg outline-none bg-zinc-800 text-white"
                placeholder="e.g. New York City"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type='button'
              onClick={handleCancel}
              className="py-2 px-4 bg-gray-600 text-white  text-xl rounded-lg"
            >
              Cancel
            </button>
            <button
            onClick={handleSubmit}
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white  text-xl rounded-lg"
            >
              Post
            </button>
          </div>
        </form>
  )
}

export default PostForm
