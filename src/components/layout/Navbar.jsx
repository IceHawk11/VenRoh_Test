import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import {
  Bell, Home, LogOut, User, Users,
  Search, MessageSquareMore, Wallet
} from "lucide-react";
import {
  IoHomeOutline
} from "react-icons/io5";
import {
  FcAbout
} from "react-icons/fc";
import {
  MdHomeRepairService, MdOutlineConnectWithoutContact
} from "react-icons/md";
import {
  LuMessageSquareWarning
} from "react-icons/lu";
import {
  FaUserTie
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/user");
      return response.data;
    },
  });

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => axiosInstance.get("/notifications"),
    enabled: !!authUser,
  });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: async () => axiosInstance.get("/connections/requests"),
    enabled: !!authUser,
  });

  const unreadNotificationCount = notifications?.data?.filter((notif) => !notif.read).length;
  const unreadConnectionRequestsCount = connectionRequests?.data?.length;

  const [sticky, setSticky] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setSticky(currentScroll <= 0 || currentScroll < lastScrollTop);
      setLastScrollTop(currentScroll);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const navItemMotion = {
    whileHover: { scale: 1.1, y: -2 },
    transition: { type: "spring", stiffness: 250 },
  };

  return (
    <nav className={`bg-[rgba(8,8,8,0.95)] shadow-[1px_1px_20px_rgba(0,0,0,0.5)] sticky top-0 z-10 transition-all duration-300 ease-in-out ${
      sticky ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
    }`}>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between items-center py-3'>
          <div className='flex items-center space-x-4'>
            <Link to='/' className="flex flex-row gap-3">
              <img className='h-8 rounded' src='navbar_logo.jpg' alt='N/A' />
              <h1 className="text-white">VenRoh</h1>
            </Link>
          </div>
          <div className='flex items-center gap-2 md:gap-6'>
            {authUser ? (
              <>
                <motion.div {...navItemMotion}>
                  <Link to={"/"} className='text-neutral flex flex-col items-center'>
                    <Home size={20} className="text-white" />
                    <span className='text-xs hidden md:block text-white'>Home</span>
                  </Link>
                </motion.div>

                <motion.div {...navItemMotion}>
                  <Link to='/search' className='text-neutral flex flex-col items-center'>
                    <Search size={20} className="text-white" />
                    <span className='text-xs hidden md:block text-white'>Search</span>
                  </Link>
                </motion.div>

                <motion.div {...navItemMotion}>
                  <Link to='/message' className='text-neutral flex flex-col items-center'>
                    <MessageSquareMore size={20} className="text-white" />
                    <span className='text-xs hidden md:block text-white'>Message</span>
                  </Link>
                </motion.div>

                <motion.div {...navItemMotion}>
                  <Link to='/network' className='text-neutral flex flex-col items-center relative'>
                    <Users size={20} className="text-white" />
                    <span className='text-xs hidden md:block text-white'>Connections</span>
                    {unreadConnectionRequestsCount > 0 && (
                      <span className='absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs rounded-full size-3 md:size-4 flex items-center justify-center'>
                        {unreadConnectionRequestsCount}
                      </span>
                    )}
                  </Link>
                </motion.div>

                <motion.div {...navItemMotion}>
                  <Link to='/notifications' className='text-neutral flex flex-col items-center relative'>
                    <Bell size={20} className="text-white" />
                    <span className='text-xs hidden md:block text-white'>Notifications</span>
                    {unreadNotificationCount > 0 && (
                      <span className='absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs rounded-full size-3 md:size-4 flex items-center justify-center'>
                        {unreadNotificationCount}
                      </span>
                    )}
                  </Link>
                </motion.div>

                <motion.div {...navItemMotion}>
                  <Link to={`/profile/${authUser.username}`} className='text-neutral flex flex-col items-center'>
                    <User size={20} className="text-white" />
                    <span className='text-xs hidden md:block text-white'>Update Profile</span>
                  </Link>
                </motion.div>

                <motion.div {...navItemMotion}>
                  <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="btn m-1 text-white bg-[radial-gradient(circle,_rgba(63,_94,_251,_1)_0%,_rgba(252,_70,_107,_1)_100%)] p-2 rounded-md border-2 border-blue-700 transition-all duration-300 hover:text-gray-400">
                      Credits
                      <Wallet size={20} />
                      <span className='font-bold'>{authUser.credit}</span>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-[#F5F5DC] hover:bg-[#d0d0ba] rounded-box z-1 w-52 p-2 shadow-sm">
                      <Link to={'/myplans'}>My Plans</Link>
                    </ul>
                  </div>
                </motion.div>
              </>
            ) : (
              <>
                <div className="flex flex-row gap-[60px]">
                  <motion.div {...navItemMotion}>
                    <Link to='/landing'>
                      <IoHomeOutline className="text-white" size={20} />
                    </Link>
                  </motion.div>
                  <motion.div {...navItemMotion}>
                    <Link to='/about'>
                      <LuMessageSquareWarning className="text-white" size={20} />
                    </Link>
                  </motion.div>
                  <motion.div {...navItemMotion}>
                    <Link to='/service'>
                      <MdHomeRepairService className="text-white" size={20} />
                    </Link>
                  </motion.div>

                  
                </div>
                <div className="w-px h-10 bg-gray-300"></div>
                <motion.div {...navItemMotion}>
                  <Link to='/login' className='bg-white rounded-md'>
                    <button className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition-all duration-200">
                      Log In
                    </button>
                  </Link>
                </motion.div>
                <motion.div {...navItemMotion}>
                  <Link to='/signup' className='btn btn-ghost text-white border-white hover:text-black'>
                    Sign Up
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
