import React from 'react'
import { Link } from 'react-router-dom'

const Topbar = () => {
  return (
   <section className='topbar'>
     <div className='flex-between  py-4 px-5'>
        <Link className='flex gap-3 items-center'>
        <h1 className="font-semibold uppercase">Company Logo</h1>
        </Link>
        <div className="flex gap-4">
            <Link to={'/notification'} className='shad-button_ghost text-xl'>
            <i class="ri-notification-4-fill"></i>
            </Link>
            <Link to={'/message'} className='flex-center text-xl gap-3'>
            <i class="ri-message-fill"></i>
            </Link>
        </div>
    </div>
   </section>
  )
}

export default Topbar
