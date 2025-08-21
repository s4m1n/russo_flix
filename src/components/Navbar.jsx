import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const { user, signInWithGoogle, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log("Login successful");
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logout successful");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="py-4 mb-2  text-white">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/">
          <div className="text-3xl font-bold tracking-widest font-mono text-gradient">
            RUSSOFLIX
          </div>
        </Link>

  
        <div className="hidden md:flex items-center gap-6">
          <Link to="/search" className="hover:text-gradient">
            <img src="search.svg" alt="Search Icon" />
          </Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-800 to-purple-800 flex items-center justify-center text-sm text-white hover:opacity-80 transition-opacity cursor-pointer"
              >
                {user?.email?.charAt(0).toUpperCase()}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-gray-900 rounded-lg shadow-lg overflow-hidden z-50 min-w-[120px]">
                  <Link
                    to="/watchlist"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 bg-gradient-to-r from-[#AB8BFF] to-[#D6C7FF] text-black transition-colors"
                  >
                    Watchlist
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 bg-gradient-to-r from-[#AB8BFF] to-[#D6C7FF] text-black transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className=" px-4 py-2 rounded-2xl bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] text-black flex items-center justify-center  transition-colors cursor-pointer"
            >
              <span className="font-bold text-sm">Login</span>
            </button>
          )}
        </div>


        <div className="flex md:hidden items-center gap-4">
          <Link to="/search">
            <img src="search.svg" alt="Search Icon" />
          </Link>

    
          <div className="relative" ref={mobileMenuRef}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:opacity-80 transition-opacity"
            >
              {user ? (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-800 to-purple-800 flex items-center justify-center text-sm text-white">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
              ) : (
                <div className="p-2 mt-1 hover:bg-gray-700 rounded transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>
              )}
            </button>

    
            {isMobileMenuOpen && (
              <div className="absolute right-0 bg-gray-900 rounded-lg shadow-lg overflow-hidden z-50 min-w-[150px]">
                {user ? (
                  <>
                    <Link
                      to="/watchlist"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 bg-gradient-to-r from-[#AB8BFF] to-[#D6C7FF] text-black font-bold transition-colors border-b border-gray-700"
                    >
                      Watchlist
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 bg-gradient-to-r from-[#AB8BFF] to-[#D6C7FF] text-black font-bold transition-colors cursor-pointer"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      handleGoogleLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] text-black transition-colors cursor-pointer"
                  >
                    Login
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
