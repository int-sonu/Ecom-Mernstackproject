import React from "react";
import { assets } from "../assets/assets";


const AdminNavbar = () => {
  return (
    <>
      <div className=" fixed flex justify-between z-50 items-center top-8 left-0 right-0 w-screen h-20 bg-black border border-solid shadow border-gray-200 px-2 py-3">
        <div className="flex items-center ">
          <img className='w-25' src={assets.logo_icon} alt="img not found" /><p className="text-4xl italic font-serif text-black mx-4">Neva</p></div>
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full w-72 border border-black ml-150 cursor-pointer">
          <IoIosSearch className="text-gray-400" />
          <p className="text-sm text-gray-400 select-none">Search...</p>
        </div>
          <div className="mr-40 flex justify-center items-center gap-2">

                    <VscAccount className="text-gray-400 text-2xl" /><p className="text-sm text-black font-medium">Admin</p>

                </div>
                </div>

    </>
  )
}

export default AdminNavbar;

