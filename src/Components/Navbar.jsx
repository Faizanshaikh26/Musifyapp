import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
  const handleLeftClick = () => {
    alert('Left icon clicked!');
  };

  const handleRightClick = () => {
    alert('Right icon clicked!');
  };

  return (
    <div className="bg-[#303030] p-2 mt-2 fixed z-10 lg:w-[93%] w-[81%] shadow-md flex justify-between rounded"> 
      <div className="flex items-center w-[100px] ml-2">
        <i className="fa-solid fa-chevron-left text-2xl text-white cursor-pointer transition-colors duration-300 hover:text-red-300 ml-6"
           onClick={handleLeftClick}></i>
        <i className="fa-solid fa-chevron-right text-2xl text-white cursor-pointer transition-colors duration-300 hover:text-red-300 ml-6"
           onClick={handleRightClick}></i>
      </div>
      <div>

{
  localStorage.getItem("auth-token")  ? (
    <button className="bg-[#3b3b3b] hover:bg-[#444444] text-white font-bold py-2 px-4 rounded "  onClick={()=>{
      localStorage.removeItem("auth-token");
      window.location.replace("/");
    }}>
     Logout
</button>
  ) : (<Link to='/login'>
  <button className="bg-[#3b3b3b] hover:bg-[#444444] text-white font-bold py-2 px-4 rounded " >
       Login
  </button>
  </Link> )
}


      </div>
    </div>
  );
}

export default Navbar;


