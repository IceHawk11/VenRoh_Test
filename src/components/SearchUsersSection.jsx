import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { Link, useParams } from "react-router-dom";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";

const HEADLINE_FILTERS = ["Idea", "Start-Up", "Investor"];

const SearchUsersSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const { username } = useParams();
  const queryClient = useQueryClient();

  const { data: searchUsers, isLoading } = useQuery({
    queryKey: ["searchUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
  });

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: () => axiosInstance.get(`/users/${username}`).then(res => res.data),
  });

  const { mutate: updateProfile } = useMutation({
    mutationFn: async (updatedData) => {
      await axiosInstance.put("/users/profile", updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]);
    },
  });

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setSearchQuery("");
    setShowResults(true);
  };

  const handleSearch = () => {
    setActiveFilter(null);
    setShowResults(true);
  };

  const handleClear = () => {
    setSearchQuery("");
    setActiveFilter(null);
    setShowResults(false);
  };

  // Function to check if two users can connect (different types only)
  const canConnect = (targetUser) => {
    if (!authUser || !targetUser) return false;
    
    // Normalize headlines for comparison (handle "Start-Up" vs "Startup" variations)
    const normalizeHeadline = (headline) => {
      if (!headline) return "";
      return headline.toLowerCase().replace(/[-\s]/g, "");
    };
    
    const authUserType = normalizeHeadline(authUser.headline);
    const targetUserType = normalizeHeadline(targetUser.headline);
    
    // Prevent same type connections
    return authUserType !== targetUserType;
  };

  const handleConnect = async (userId) => {
    const targetUser = searchUsers?.find(user => user._id === userId);
    
    if (!authUser || authUser.credit <= 1) {
      toast.error("Insufficient credits to send connection requests.");
      return;
    }

    if (!canConnect(targetUser)) {
      toast.error("Cannot connect with users of the same type.");
      return;
    }

    try {
      await axiosInstance.post(`/connections/request/${userId}`);

      const updatedCredit = authUser.credit - 2;

      // Optimistically update the local cache
      queryClient.setQueryData(["authUser"], (oldData) => ({
        ...oldData,
        credit: updatedCredit,
      }));

      // Persist the change on server
      updateProfile({ credit: updatedCredit });

      toast.success("Connection request sent and 2 credits deducted.");
    } catch (error) {
      toast.error(error.response?.data?.error || "Already sent connection!");
    }
  };

  const filteredUsers = searchUsers?.filter((user) => {
    if (!showResults) return false;
    if (activeFilter) return user.headline === activeFilter;
    if (searchQuery.trim() !== "")
      return user.name.toLowerCase().includes(searchQuery.toLowerCase());
    return false;
  });

  return (
    <div className='bg-[#FBF5E2] rounded-lg shadow p-4 border-black border-2'>
      <h2 className='font-semibold mb-4'>Search & Filter Users</h2>
      <h1 className="mb-2 text-sm">Credits: {authUser?.credit ?? 0}</h1>

      {/* Search Bar */}
      <div className='flex mb-4 gap-2'>
        <input
          type='text'
          placeholder='Search by name...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='flex-grow p-2 rounded border bg-white'
        />
        <button
          onClick={handleSearch}
          className='bg-black hover:bg-white text-white hover:text-black cursor-pointer px-4 rounded'
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className='bg-gray-300 text-gray-700 px-4 rounded hover:bg-gray-400'
        >
          Clear
        </button>
      </div>

      {/* Filter Buttons */}
      <div className='flex gap-2 mb-4'>
        {HEADLINE_FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`px-3 py-1 rounded-full text-sm border ${
              activeFilter === filter
                ? "bg-black text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* User List */}
      {isLoading ? (
        <p>Loading users...</p>
      ) : filteredUsers?.length > 0 ? (
        filteredUsers.map((user) => {
          const canConnectWithUser = canConnect(user);
          const hasInsufficientCredits = authUser?.credit <= 1;
          const isDisabled = !canConnectWithUser || hasInsufficientCredits;
          
          return (
            <div key={user._id} className='flex items-center justify-between mb-4'>
              <Link to={`/profile/${user.username}`} className='flex items-center flex-grow'>
                <img
                  src={user.profilePicture || "/avatar.png"}
                  alt={user.name}
                  className='w-12 h-12 rounded-full mr-3'
                />
                <div>
                  <h3 className='font-semibold text-sm'>{user.name}</h3>
                  <p className='text-xs text-info'>{user.headline}</p>
                </div>
              </Link>
              <button
                onClick={() => handleConnect(user._id)}
                disabled={isDisabled}
                title={
                  !canConnectWithUser 
                    ? "Cannot connect with same user type" 
                    : hasInsufficientCredits 
                    ? "Insufficient credits" 
                    : "Connect with user"
                }
                className={`px-3 py-1 rounded-full text-sm border flex items-center ${
                  isDisabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200"
                }`}
              >
                <UserPlus size={16} className='mr-1' />
                Connect
              </button>
            </div>
          );
        })
      ) : (
        showResults && <p className='text-sm text-gray-500'>No users found.</p>
      )}
    </div>
  );
};

export default SearchUsersSection;