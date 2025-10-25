import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Plus,
  MoreHorizontal,
  Database,
  MessageSquare,
  X,
  ArrowLeft,
  Send,
  Search,
  UserPlus,
  CheckCircle,
  User,
  ShieldCheck,
  ShieldAlert,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom"

const DashboardAlex = () => {
  const [activeSection, setActiveSection] = useState("accounts");
  const [chatOpen, setChatOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [chatSearch, setChatSearch] = useState("");
  const [connections, setConnections] = useState([]);
  const [conversations, setConversations] = useState({});
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const chatEndRef = useRef(null);

  // ✅ Dummy Profile Info
  const userInfo = {
    name: "Pratik Chakraborty",
    startup_name:"Venroh",
    type: "Startup Founder",
    address: "71B Lenin Street, Kolkata, India",
    age: 27,
    governmentIdStatus: "Pending", // or "Verified"
  };

  // ✅ Dummy users for search
  const allUsers = [
    { name: "Sarah Johnson", role: "Investor" },
    { name: "Marcus Lee", role: "Trader" },
    { name: "Elena Brown", role: "Analyst" },
    { name: "Jason Smith", role: "Manager" },
    { name: "Sophia Turner", role: "Entrepreneur" },
    { name: "Daniel Evans", role: "Blockchain Developer" },
  ];

  const chatUsers = allUsers.map((u, i) => ({
    ...u,
    message: ["Hey Alex!", "Let’s catch up", "Great trades today", "Crypto is booming"][i % 4],
    time: `${i + 1}h ago`,
    notifications: i % 2 === 0 ? i + 1 : 0,
  }));

  // ✅ Accounts section
  const accounts = [
    { type: "Amount Raised", balance: "₹32,500" },
    { type: "Amount Required", balance: "₹100,000" },
  ];

  const dummyReplies = [
    "That's interesting!",
    "Sounds great 😄",
    "Let me check and get back to you.",
    "Haha, true!",
    "Good point!",
    "Thanks for the update!",
    "I completely agree 👍",
  ];

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;

    setConversations((prev) => {
      const existing = prev[activeChat.name] || [];
      return {
        ...prev,
        [activeChat.name]: [...existing, { from: "Pratik", text: message }],
      };
    });

    setMessage("");

    // Simulated reply
    setTimeout(() => {
      const reply = dummyReplies[Math.floor(Math.random() * dummyReplies.length)];
      setConversations((prev) => {
        const existing = prev[activeChat.name] || [];
        return {
          ...prev,
          [activeChat.name]: [...existing, { from: activeChat.name, text: reply }],
        };
      });
    }, 1200);
  };

  const handleAddConnection = (userName) => {
    if (!connections.includes(userName)) {
      setConnections([...connections, userName]);
      setTimeout(() => alert(`✅ Connection request sent to ${userName}`), 300);
    }
  };
  const handleLogout = () => {
    alert("👋 Logged out successfully!");
    setTimeout(() => {
      navigate("/"); // Redirect to homepage after 1 second
    }, 500);
    // You can add your logout logic here (Appwrite / Firebase / Auth)
  };

  const filteredDashboardUsers = allUsers.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredChatUsers = chatUsers.filter((u) =>
    u.name.toLowerCase().includes(chatSearch.toLowerCase())
  );

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [conversations, activeChat]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex overflow-hidden relative">
      {/* ✅ Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col justify-between">
        <div className="p-4 space-y-4 flex-1">
          <h2 className="text-lg font-semibold mb-4">Dashboard Sections</h2>

          {[
            { key: "accounts", label: "Accounts", icon: <Database className="w-4 h-4" /> },
            { key: "transactions", label: "Transactions", icon: <Database className="w-4 h-4" /> },
            { key: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
          ].map((section) => (
            <motion.button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-colors ${
                activeSection === section.key
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-700 hover:bg-gray-600 text-gray-300"
              }`}
            >
              {section.icon}
              <span>{section.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Settings Button */}
        <div className="p-4 border-t border-gray-700 flex items-center justify-between relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert("Settings clicked")}
            className="w-full flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-lg"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </motion.button>
            {/* Three-dot Menu */}
          <div className="relative">
            <button
              onClick={() => setShowLogoutMenu((prev) => !prev)}
              className="ml-2 text-gray-400 hover:text-yellow-400"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>

            <AnimatePresence>
              {showLogoutMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-12 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-40 z-50"
                >
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-700 text-gray-300"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ✅ Main Dashboard */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="flex items-center bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 w-full max-w-3xl mx-auto">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for users to connect..."
              className="bg-transparent w-full outline-none text-gray-200"
            />
          </div>

          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-full max-w-3xl mx-auto z-20"
            >
              {filteredDashboardUsers.length > 0 ? (
                filteredDashboardUsers.map((user, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-700 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-yellow-500 text-black font-bold w-10 h-10 rounded-full flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-yellow-400">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.role}</p>
                      </div>
                    </div>
                    {connections.includes(user.name) ? (
                      <div className="flex items-center space-x-1 text-green-400 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Request Sent</span>
                      </div>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddConnection(user.name)}
                        className="bg-yellow-500 text-black px-3 py-1 rounded-md flex items-center space-x-2"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Connect</span>
                      </motion.button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-3">No users found</p>
              )}
            </motion.div>
          )}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Pratik</h1>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              
            </motion.button>
            <motion.button
              onClick={() => setChatOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
              title="Open Chat"
            >
              <MessageSquare className="w-5 h-5 text-yellow-400" />
            </motion.button>
          </div>
        </div>

        {/* ✅ Accounts Section */}
        {activeSection === "accounts" && (
          <div className="flex flex-col items-center space-y-6 max-w-md mx-auto">
            {accounts.map((acc, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="w-full bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-all"
              >
                <h3 className="text-lg text-gray-400 font-medium mb-2">{acc.type}</h3>
                <p className="text-4xl font-bold text-yellow-400">{acc.balance}</p>
              </motion.div>
            ))}
          </div>
        )}

          {/* ✅ Transactions Section */}
        {activeSection === "transactions" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-6 max-w-md mx-auto"
          >
            <div className="w-full bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-all">
              <h3 className="text-lg text-gray-400 font-medium mb-2">No. of Transactions</h3>
              <p className="text-4xl font-bold text-yellow-400 mb-4">24</p>
              <div className="w-full bg-gray-700 h-2 rounded-full">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ✅ Profile Section */}
        {activeSection === "profile" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl p-8 shadow-lg max-w-2xl mx-auto"
          >
            {/* Profile Header */}
            <div className="flex items-center space-x-5 mb-6">
              <div className="bg-yellow-500 text-black text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center">
                {userInfo.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{userInfo.name}</h2>
                <p className="text-gray-400">{userInfo.type}</p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-4 text-gray-300">
              <p>
                <span className="font-semibold text-gray-400">Startup Name:</span>{" "}
                {userInfo.startup_name}
              </p>
              <p>
                <span className="font-semibold text-gray-400">Address:</span>{" "}
                {userInfo.address}
              </p>
              <p>
                <span className="font-semibold text-gray-400">Age:</span>{" "}
                {userInfo.age}
              </p>
              <p className="flex items-center space-x-2">
                <span className="font-semibold text-gray-400">Government ID:</span>
                {userInfo.governmentIdStatus === "Verified" ? (
                  <span className="flex items-center space-x-1 text-green-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-1 text-yellow-400 font-semibold">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Verification Pending</span>
                  </span>
                )}
              </p>
              <p className="flex items-center space-x-2">
                <span className="font-semibold text-gray-400">SEBI Document:</span>
                {userInfo.governmentIdStatus === "Verified" ? (
                  <span className="flex items-center space-x-1 text-green-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-1 text-green-400 font-semibold">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Verified</span>
                  </span>
                )}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* ✅ Chat Sidebar */}
      <AnimatePresence>
        {chatOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setChatOpen(false);
                setActiveChat(null);
              }}
            ></motion.div>

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed right-0 top-0 h-full w-80 bg-gray-800 border-l border-gray-700 shadow-lg flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                {activeChat ? (
                  <>
                    <button
                      onClick={() => setActiveChat(null)}
                      className="text-gray-300 hover:text-yellow-400 flex items-center"
                    >
                      <ArrowLeft className="w-5 h-5 mr-1" />
                      <span>Back</span>
                    </button>
                    <h2 className="text-lg font-semibold">{activeChat.name}</h2>
                    <div className="w-6"></div>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-semibold">Chats</h2>
                    <button
                      onClick={() => setChatOpen(false)}
                      className="text-gray-400 hover:text-yellow-400"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {!activeChat && (
                <div className="p-3 border-b border-gray-700 flex items-center bg-gray-800 sticky top-0 z-10">
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search chats..."
                    value={chatSearch}
                    onChange={(e) => setChatSearch(e.target.value)}
                    className="flex-1 bg-gray-700 text-gray-200 px-3 py-1.5 rounded-lg outline-none"
                  />
                </div>
              )}

              {/* Chat List */}
              {!activeChat && (
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {filteredChatUsers.map((chat, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveChat(chat)}
                      className="flex items-center justify-between bg-gray-700 rounded-lg p-3 hover:bg-gray-600 cursor-pointer transition"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-yellow-500 text-black font-bold w-10 h-10 rounded-full flex items-center justify-center">
                          {chat.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-yellow-400">{chat.name}</p>
                          <p className="text-sm text-gray-300">{chat.message}</p>
                        </div>
                      </div>
                      {chat.notifications > 0 && (
                        <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                          {chat.notifications}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Active Chat */}
              {activeChat && (
                <div className="flex flex-col flex-1">
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {(conversations[activeChat.name] || []).map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${
                          msg.from === "Alex" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${
                            msg.from === "Alex"
                              ? "bg-yellow-500 text-black"
                              : "bg-gray-700 text-gray-200"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="p-3 border-t border-gray-700 flex items-center space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 bg-gray-700 text-gray-200 px-3 py-2 rounded-lg outline-none"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-yellow-500 text-black p-2 rounded-lg hover:bg-yellow-400"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardAlex;
