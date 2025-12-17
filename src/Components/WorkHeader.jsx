import React from 'react';
import { FaRocket } from 'react-icons/fa';

const WorkHeader = ({showMenu, setShowMenu}) => {

  const userInitial = presenterName ? presenterName.charAt(0).toUpperCase() : "U";
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 w-full backdrop-blur-md border-b border-white/10 z-40">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg bg-linear-to-r from-[#b856ca] to-[#622ba4]">
                  <FaRocket className="text-white text-xl" />
                </div>
                <h1 className="font-bold text-2xl text-white">
                  AI<span className="text-[#8f43eb]">PPT</span>
                </h1>
              </div>
    
              <div className="relative">
                <button
                  className="w-10 h-10 rounded-full cursor-pointer text-white flex justify-center items-center font-bold shadow-lg hover:shadow-xl hover:scale-105 transition"
                  style={{ background: 'linear-gradient(to right, #b856ca, #622ba4)' }}
                  onClick={() => setShowMenu(!showMenu)}
                >
                  {userInitial}
                </button>
    
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
                    <button
                      className="w-full text-left px-4 py-3 hover:bg-white/10 transition text-white font-medium"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>
  )
}

export default WorkHeader
