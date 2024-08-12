import React from "react";
import { Link } from "react-router-dom";
import { format } from 'date-fns';


const PostCard = ({ post }) => {
  if (!post) return null; 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // console.log(date)
    return  format(date, 'd MMM yyyy') // Example format: 4 August 2024
  };
  return (
    <div className="bg-zinc-900 rounded-3xl border border-dark-4 p-5 lg:p-7 w-full max-w-screen-sm">
      <div className="flex-between">
        <div className="flex  items-center gap-3">
          <Link to={`/profile/${post.user._id}`} >
            <img
              src={post.user.profilepic ? `/uploads/${post.user.profilepic}` : "/assets/icons/profile-placeholder.svg"}
              alt="Profile"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>
          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">{post.user.username || "Unknown User"}</p>
            <div className="flex-center gap-1 text-gray-300">
              <p className="subtle-semibold lg:small-regular">{formatDate(post.date) || "Date"}</p> - 
              <p className="subtle-semibold lg:small-regular">{post.location || "Location"}</p>
            </div>
          </div>
        </div>
        <Link to={`/update-post/${post._id}`}>
          <img src="/assets/icons/edit.svg" alt="Edit" width={20} height={20} />
        </Link>
      </div>
      <Link to={`/post/${post._id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption || "No caption available"}</p>
          <ul className="flex mt-2 gap-1">
            {post.tags && post.tags.map((tag, index) => (
              <li key={index} className="text-gray-400">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={post.image ? `http://127.0.0.1:3000/${post.image}` : "/assets/icons/profile-placeholder.svg"}
          className="h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] object-right-top object-cover mb-5"
          alt="Post"
        />
      </Link>
      <div className="flex justify-between items-center z-20">
        <div className="flex gap-2 mr-5">
          <img src="/assets/icons/like.svg" width={20} height={20} alt="Like" />
          <p>{post.likes?.length || 0}</p>
        </div>
        <div className="flex gap-2 mr-5">
          <img src="/assets/icons/save.svg" width={23} height={23} alt="Save" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
