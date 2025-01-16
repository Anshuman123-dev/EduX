// import { useEffect, useState } from "react"
// import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
// import { BsChevronDown } from "react-icons/bs"
// import { useSelector } from "react-redux"
// import { FaMoon } from "react-icons/fa";
// import { Link, matchPath, useLocation } from "react-router-dom"

// import logoLight from "../../assets/Logo/Logo-Full-Light.png"
// import { NavbarLinks } from "../../data/navbar-links"
// import { apiConnector } from "../../services/apiconnector"
// import { categories } from "../../services/apis"
// import { ACCOUNT_TYPE } from "../../utils/constants"
// import ProfileDropdown from "../core/Auth/ProfileDropDown"
// import { IoIosSunny } from "react-icons/io";
// import logoDark from "../../assets/Logo/Logo-Full-Dark.png"


// function Navbar() {
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const { totalItems } = useSelector((state) => state.cart)
//   const location = useLocation()

//   const [subLinks, setSubLinks] = useState([])
//   const [loading, setLoading] = useState(false)

//   const [darkMode, setDarkMode] = useState(false)

//   const toggleDarkMode = () =>{
//     setDarkMode(!darkMode);
//   }

//   useEffect(() => {
//     ;(async () => {
//       setLoading(true)
//       try {
//         const res = await apiConnector("GET", categories.CATEGORIES_API)
//         setSubLinks(res.data.data)
//       } catch (error) {
//         console.log("Could not fetch Categories.", error)
//       }
//       setLoading(false)
//     })()
//   }, [])

//   // console.log("sub links", subLinks)

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname)
//   }

//   return (
//     <div className={`${darkMode && "dark"}`}>
//       <div
//         className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 dark:bg-cyan-25 ${
//           location.pathname !== "/" ? "bg-richblack-800 dark:bg-cyan-25" : ""
//         } transition-all duration-200`}
//       >
//         <div className="flex w-11/12 max-w-maxContent items-center justify-between">
//           {/* Logo */}
//           <Link to="/">
//             <img
//               className="mt-2"
//               src={darkMode ? logoDark : logoLight}
//               alt="Logo"
//               width={115}
//               loading="lazy"
//             />
//           </Link>

//           {/* Navigation links */}
//           <nav className="hidden md:block ">
//             <ul className="flex gap-x-6 text-richblack-25 dark:text-black">
//               {NavbarLinks.map((link, index) => (
//                 <li key={index}>
//                   {link.title === "Catalog" ? (
//                     <>
//                       <div
//                         className={`group relative flex cursor-pointer items-center gap-1 ${
//                           matchRoute("/catalog/:catalogName")
//                             ? "text-yellow-25 dark:text-caribbeangreen-500 dark:font-bold"
//                             : "text-richblack-25 dark:text-black dark:font-bold"
//                         }`}
//                       >
//                         <p>{link.title}</p>
//                         <BsChevronDown />
//                         <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
//                           <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
//                           {loading ? (
//                             <p className="text-center">Loading...</p>
//                           ) : (subLinks && subLinks.length) ? (
//                             <>
//                               {subLinks
//                                 ?.filter(
//                                   (subLink) => subLink?.courses?.length > 0
//                                 )
//                                 ?.map((subLink, i) => (
//                                   <Link
//                                     to={`/catalog/${subLink.name
//                                       .split(" ")
//                                       .join("-")
//                                       .toLowerCase()}`}
//                                     className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
//                                     key={i}
//                                   >
//                                     <p>{subLink.name}</p>
//                                   </Link>
//                                 ))}
//                             </>
//                           ) : (
//                             <p className="text-center">No Courses Found</p>
//                           )}
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <Link to={link?.path}>
//                       <p
//                         className={`${
//                           matchRoute(link?.path)
//                             ? "text-yellow-25 dark:text-caribbeangreen-500 dark:font-bold "
//                             : "text-richblack-25  dark:text-black dark:font-bold"
//                         }`}
//                       >
//                         {link.title}
//                       </p>
//                     </Link>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//           {/* Login / Signup / Dashboard */}
//           <div className="hidden items-center gap-x-4 md:flex">
//             {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//               <Link to="/dashboard/cart" className="relative">
//                 <AiOutlineShoppingCart className="text-2xl text-richblack-100 dark:text-black" />
//                 {totalItems > 0 && (
//                   <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
//                     {totalItems}
//                   </span>
//                 )}
//               </Link>
//             )}
//             {token === null && (
//               <Link to="/login">
//                 <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                   Log in
//                 </button>
//               </Link>
//             )}
//             {token === null && (
//               <Link to="/signup">
//                 <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                   Sign up
//                 </button>
//               </Link>
//             )}
//             {token !== null && <ProfileDropdown />}
//           </div>
//           <button className="ml-96 md:hidden">
//             <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
//           </button>
//           <button onClick={toggleDarkMode} className="text-4xl mx-0 ">
//             {darkMode ? <FaMoon className="text-blue-900" /> : <IoIosSunny className="text-yellow-300" />  }
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar





// import { useEffect, useState } from "react";
// import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
// import { BsChevronDown } from "react-icons/bs";
// import { useSelector } from "react-redux";
// import { FaMoon } from "react-icons/fa";
// import { Link, matchPath, useLocation } from "react-router-dom";
// import { useTheme } from "../../context/ThemeContext";  // Import your theme context
// import logoLight from "../../assets/Logo/Logo-Full-Light.png";
// import { NavbarLinks } from "../../data/navbar-links";
// import { apiConnector } from "../../services/apiconnector";
// import { categories } from "../../services/apis";
// import { ACCOUNT_TYPE } from "../../utils/constants";
// import ProfileDropdown from "../core/Auth/ProfileDropDown";
// import { IoIosSunny } from "react-icons/io";
// import logoDark from "../../assets/Logo/Logo-Full-Dark.png";

// function Navbar() {
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const { totalItems } = useSelector((state) => state.cart);
//   const location = useLocation();

//   const [subLinks, setSubLinks] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Get the dark mode toggle function from context
//   const { darkMode, toggleDarkMode } = useTheme();

//   useEffect(() => {
//     (async () => {
//       setLoading(true);
//       try {
//         const res = await apiConnector("GET", categories.CATEGORIES_API);
//         setSubLinks(res.data.data);
//       } catch (error) {
//         console.log("Could not fetch Categories.", error);
//       }
//       setLoading(false);
//     })();
//   }, []);

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname);
//   };

//   return (
//     <div>
//       <div
//         className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 dark:bg-cyan-25 ${
//           location.pathname !== "/" ? "bg-richblack-800 dark:bg-cyan-25" : ""
//         } transition-all duration-200`}
//       >
//         <div className="flex w-11/12 max-w-maxContent items-center justify-between">
//           {/* Logo */}
//           <Link to="/">
//             <img
//               className="mt-2"
//               src={darkMode ? logoDark : logoLight}
//               alt="Logo"
//               width={115}
//               loading="lazy"
//             />
//           </Link>

//           {/* Navigation links */}
//           <nav className="hidden md:block ">
//             <ul className="flex gap-x-6 text-richblack-25 dark:text-black ">
//               {NavbarLinks.map((link, index) => (
//                 <li key={index}>
//                   {link.title === "Catalog" ? (
//                     <div
//                       className={`group relative flex cursor-pointer items-center gap-1 ${
//                         matchRoute("/catalog/:catalogName")
//                           ? "text-yellow-25 dark:text-caribbeangreen-500 dark:font-bold"
//                           : "text-richblack-25 dark:text-black dark:font-bold"
//                       }`}
//                     >
//                       <p>{link.title}</p>
//                       <BsChevronDown />
//                       <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
//                         <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
//                         {loading ? (
//                           <p className="text-center">Loading...</p>
//                         ) : (
//                           subLinks?.length > 0 &&
//                           subLinks?.map((subLink, i) => (
//                             <Link
//                               to={`/catalog/${subLink.name
//                                 .split(" ")
//                                 .join("-")
//                                 .toLowerCase()}`}
//                               className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
//                               key={i}
//                             >
//                               <p>{subLink.name}</p>
//                             </Link>
//                           ))
//                         )}
//                       </div>
//                     </div>
//                   ) : (
//                     <Link to={link?.path}>
//                       <p
//                         className={`${
//                           matchRoute(link?.path)
//                             ? "text-yellow-25 dark:text-caribbeangreen-500 dark:font-bold "
//                             : "text-richblack-25  dark:text-black dark:font-bold"
//                         }`}
//                       >
//                         {link.title}
//                       </p>
//                     </Link>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Cart, Login, Signup, Profile Dropdown */}
//           <div className="hidden items-center gap-x-4 md:flex">
//             {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//               <Link to="/dashboard/cart" className="relative">
//                 <AiOutlineShoppingCart className="text-2xl text-richblack-100 dark:text-black" />
//                 {totalItems > 0 && (
//                   <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
//                     {totalItems}
//                   </span>
//                 )}
//               </Link>
//             )}
//             {token === null && (
//               <Link to="/login">
//                 <button className=" translate-x-44 rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                   Log in
//                 </button>
//               </Link>
//             )}
//             {token === null && (
//               <Link to="/signup">
//                 <button className="translate-x-44 rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                   Sign up
//                 </button>
//               </Link>
//             )}
//             {token !== null && <ProfileDropdown />}
//           </div>

//           {/* Mobile Menu Icon */}
//           <button className="ml-96 md:hidden">
//             <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
//           </button>

//           {/* Theme Toggle */}
//           <button onClick={toggleDarkMode} className="text-4xl mx-0">
//             {darkMode ? (
//               <FaMoon className="text-blue-900" />
//             ) : (
//               <IoIosSunny className="text-yellow-300" />
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;



import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { FaMoon } from "react-icons/fa";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext"; // Import your theme context
import logoLight from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import { IoIosSunny } from "react-icons/io";
import logoDark from "../../assets/Logo/Logo-Full-Dark.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/authAPI";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar
  const [isCatalogOpen, setIsCatalogOpen] = useState(false); // State for catalog dropdown
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Get the dark mode toggle function from context
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div>
      {/* Top Navbar */}
      <div
        className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 dark:bg-cyan-25 ${
          location.pathname !== "/" ? "bg-richblack-800 dark:bg-cyan-25" : ""
        } transition-all duration-200`}
      >
        <div className="flex w-11/12 max-w-maxContent items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img
              className="mt-2"
              src={darkMode ? logoDark : logoLight}
              alt="Logo"
              width={115}
              loading="lazy"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:block">
            <ul className="flex gap-x-6 text-richblack-25 dark:text-black">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25 dark:text-caribbeangreen-500 dark:font-bold"
                          : "text-richblack-25 dark:text-black dark:font-bold"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : (
                          subLinks?.map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                              key={i}
                            >
                              {subLink.name}
                            </Link>
                          ))
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25 dark:text-caribbeangreen-500 dark:font-bold "
                            : "text-richblack-25  dark:text-black dark:font-bold"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Cart, Login, Signup, Profile Dropdown */}
          <div className="hidden items-center gap-x-4 md:flex">
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-2xl text-richblack-100 dark:text-black" />
                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {token === null && (
              <>
                <Link to="/login">
                  <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                    Sign up
                  </button>
                </Link>
              </>
            )}
            {token !== null && <ProfileDropdown />}
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="ml-96 md:hidden transition-all duration-300 border-none"
          >
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" className="dark:fill-black" />
          </button>

          {/* Theme Toggle */}
          <button onClick={toggleDarkMode} className="text-4xl mx-0 border-none">
            {darkMode ? (
              <FaMoon className="text-blue-900" />
            ) : (
              <IoIosSunny className="text-yellow-300" />
            )}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex ">
          {/* Overlay for background */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-500 ${
              isSidebarOpen ? "opacity-50" : "opacity-0"
            }`}
            onClick={() => setIsSidebarOpen(false)} // Close sidebar on background click
          ></div>

          {/* Sidebar */}
          <div
            className={`relative z-10 h-full w-2/5 bg-richblack-800 text-white dark:bg-cyan-50 dark:text-cyan-900 shadow-lg transition-transform duration-500 text-lg ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-richblack-700">
              <h2 className="text-2xl font-extrabold">Menu</h2>
              <button
                onClick={() => setIsSidebarOpen(false)} // Close sidebar on 'X' button
                className="text-2xl border-none"
              >
                ✖
              </button>
            </div>
            <ul className="flex flex-col p-4 space-y-4 ">
              {NavbarLinks.map((link, index) => (
                <li key={index} className="dark:hover:text-caribbeangreen-400 hover:text-yellow-25 ">
                  {link.title === "Catalog" ? (
                    <div className="flex flex-col ">
                      <button
                        onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                        className="flex items-center justify-between border-none w-full "
                      >
                        <span>{link.title}</span>
                        {isCatalogOpen ? <BsChevronUp /> : <BsChevronDown />}
                      </button>
                      {isCatalogOpen && (
                        <div className="ml-4 flex flex-col space-y-2 ">
                          {loading ? (
                            <p>Loading...</p>
                          ) : (
                            subLinks.map((subLink, i) => (
                              <Link
                                key={i}
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                onClick={() => setIsSidebarOpen(false)} // Close sidebar on category click
                              >
                                {subLink.name}
                              </Link>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link?.path}
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="absolute bottom-4 left-4 right-4">
              {token === null ? (
                <>
                  <Link to="/login">
                    <button
                      className="w-full mb-2 rounded-lg border-none hover:scale-105 transition-all duration-300 bg-yellow-25 dark:bg-caribbeangreen-200 py-2 text-black"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on login click
                    >
                      Log in
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button
                      className="w-full rounded-lg border-none hover:scale-105 transition-all duration-300 bg-yellow-25 py-2 text-black dark:bg-caribbeangreen-200"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on signup click
                    >
                      Sign up
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard/my-profile">
                    <button
                      className="w-full mb-2 rounded-lg border-none hover:scale-105 transition-all duration-300 dark:bg-caribbeangreen-200 bg-yellow-25 py-2 text-black"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on dashboard click
                    >
                      Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      console.log("Logout functionality here");
                      dispatch(logout(navigate));
                      setIsSidebarOpen(false); // Close sidebar on logout
                    }}
                    className="w-full rounded-lg bg-pink-500 py-2 text-black border-none hover:scale-105 transition-all duration-300"
                  >
                    Log out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}


    </div>
  );
}

export default Navbar;






