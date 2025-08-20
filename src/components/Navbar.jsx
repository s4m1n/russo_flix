// import { useState } from "react";
import { Link } from "react-router-dom";
// import { useAuth } from "../context/useAuth";
// import { FiMenu, FiSearch } from "react-icons/fi";

const user = {};

const Navbar = () => {
  //   const { user, signInWithGoogle, logout } = useAuth();
  //   const [isOpen, setIsOpen] = useState(false);

  //   const handleGoogleLogin = async () => {
  //     try {
  //       await signInWithGoogle();
  //       console.log("success");
  //     } catch (error) {
  //       console.log("errr", error);
  //     }
  //   };

  return (
    <nav className="py-4 mb-2  text-white">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/">
          <div className="text-3xl font-bold tracking-widest font-mono text-gradient">
            RUSSOFLIX
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-gradient">
            Home
          </Link>
          <Link to="/search" className="hover:text-gradient">
            <img src="search.svg" alt="Search Icon" />
          </Link>

          {user ? (
            <div className="relative group">
              <button className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-sm text-white">
                {user?.email?.charAt(0).toUpperCase()}
              </button>
              <div className="absolute right-0 mt-2 hidden group-hover:block bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                <Link
                  to="/watchlist"
                  className="block px-4 py-2 hover:bg-gray-800"
                >
                  Watchlist
                </Link>
                <button
                  // onClick={logout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-800"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              // onClick={handleGoogleLogin}
              className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"
            />
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center gap-4">
          <Link to="/search">
            <img src="search.svg" alt="Search Icon" />
          </Link>
          <button
          // onClick={() => setIsOpen(true)}
          >
            {/* <FiMenu className="text-2xl" /> */}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {/* {isOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-sm">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm">
                    {user?.displayName || user?.email}
                  </span>
                </div>
              ) : (
                <button
                  onClick={handleGoogleLogin}
                  className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"
                />
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-white text-xl"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4 p-6">
              <Link
                to="/"
                // onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/movies"
                // onClick={() => setIsOpen(false)}
              >
                Movies
              </Link>
              <Link
                to="/shows"
                // onClick={() => setIsOpen(false)}
              >
                TV Shows
              </Link>
              {user && (
                <>
                  <Link
                    to="/watchlist"
                    // onClick={() => setIsOpen(false)}
                  >
                    Watchlist
                  </Link>
                  <button
                    onClick={() => {
                      // logout();
                      // setIsOpen(false);
                    }}
                    className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )} */}
    </nav>
  );
};

export default Navbar;
