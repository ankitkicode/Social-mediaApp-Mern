import React, { useState } from 'react'

const Explore = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!searchValue) {
      setIsFocused(false);
    }
  };
  return (
    <div className='flex flex-1'>
      <div className='explore-container'>
        <h1 className='h3-bold md:h2-bold text-left w-full'>Explore</h1>
       
        <label htmlFor="" className="relative block w-full mt-5 ">
          <input
            type="text"
            placeholder='Search anything here...'
            className='bg-zinc-700 w-full text-xl border outline-none py-3 border-gray-600 rounded-full px-4'
            value={searchValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <i className="ri-search-2-line text-2xl absolute right-4 top-1/2 transform -translate-y-1/2"></i>
        </label>
        {(isFocused || searchValue) && (
          <div className='searchresult flex flex-wrap h-auto w-full   justify-between max-[740px]:mt-[-5%] mt-[-2%]'>
            <div className="box h-auto w-full py-6 px-6 bg-zinc-600 rounded-b-md">
              <div className="flex items-center mt-2 border border-gray-400  rounded-md justify-between py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="h-[50px] w-[50px] bg-gray-900 rounded-full"></div>
                  <div>
                    <h3 className='text-lg'>User Name</h3>
                    <p className='text-sm'>@username</p>
                  </div>
                </div>
                <button className='bg-blue-600 text-white rounded-full px-4 py-1'>Follow</button>
              </div>
              <div className="flex items-center mt-2 border border-gray-400 rounded-md justify-between py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="h-[50px] w-[50px] bg-gray-900 rounded-full"></div>
                  <div>
                    <h3 className='text-lg'>User Name</h3>
                    <p className='text-sm'>@username</p>
                  </div>
                </div>
                <button className='bg-blue-600 text-white rounded-full px-4 py-1'>Follow</button>
              </div>
            </div>
          </div>
        )}
        <div className="h-auto w-full flex flex-wrap gap-4 items-start justify-evenly mt-4">
          <div className="h-[250px] w-[200px] max-[740px]:h-[150px] max-[740px]:w-[150px] bg-cyan-900 rounded-md border border-gray-600">
            <img src="/assets/icons/profile-placeholder.svg" className='h-full w-full object-cover' alt="" />
          </div>
          <div className="h-[250px] w-[200px] max-[740px]:h-[150px] max-[740px]:w-[150px] bg-cyan-900 rounded-md border border-gray-600">
            <img src="/assets/icons/profile-placeholder.svg" className='h-full w-full object-cover' alt="" />
          </div>
          <div className="h-[250px] w-[200px] max-[740px]:h-[150px] max-[740px]:w-[150px] bg-cyan-900 rounded-md border border-gray-600">
            <img src="/assets/icons/profile-placeholder.svg" className='h-full w-full object-cover' alt="" />
          </div>
          <div className="h-[250px] w-[200px] max-[740px]:h-[150px] max-[740px]:w-[150px] bg-cyan-900 rounded-md border border-gray-600">
            <img src="/assets/icons/profile-placeholder.svg" className='h-full w-full object-cover' alt="" />
          </div>
      
        </div>
      </div>
    </div>
  )
}

export default Explore
