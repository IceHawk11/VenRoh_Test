import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import toast, { Toaster } from "react-hot-toast";

// Second login
import Login from "./pages/login/Login";
// Second signup
import SignUp from "./pages/signup/SignUp_1";

// New role-based sign-up pages
import Idea from "./pages/signup/Idea";
import Startup from "./pages/signup/Startup";
import Investor from "./pages/signup/Investor";
import VC from "./pages/signup/VC";

import Terms from "./pages/WORKING/Terms";
import TermsStartup from "./pages/WORKING/TermsStartup";
import TermsInvestor from "./pages/WORKING/TermsInvestor";
import TermsVC from "./pages/WORKING/TermsVC";

// Dashboard User Profile
import Dashboard from "./dashboard/Dashboard.jsx";



import NotificationsPage from "./pages/NotificationsPage";
import NetworkPage from "./pages/NetworkPage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import FormPage from "./pages/FormPage";
import MyPlans from "./pages/MyPlans";
import Success from "./pages/payment/Success";
import Failure from "./pages/payment/Failure";
import MessagePage from "./pages/MessagePage";

import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";
import SettingsPage from "./pages/SettingsPage";
import Contact from "./pages/LandingPage/Contact.jsx";

const App = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) {
          return null;
        }
        toast.error(err.response.data.message || "Something went wrong");
      }
    },
  });

  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth().catch((err) => {
      toast.error(err?.response?.data?.message || "Authentication failed");
    });
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <Layout>
      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/landing" />}
        />

        {/* Landing Page */}
        <Route path="/landing" element={<LandingPage />} />

        {/* Auth Pages */}
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/form" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />

        {/* Role-specific SignUp pages */}
        <Route path="/idea" element={<Idea/>} />
        <Route path="/startup" element={<Startup/>} />
        <Route path="/investor" element={<Investor/>} />
        <Route path="/vc" element={<VC/>} />

         <Route path="/terms" element={<Terms />} />
         <Route path="/termsStartup" element={<TermsStartup/>} />
         <Route path="/termsInvestor" element={<TermsInvestor/>} />
         <Route path="/termsVC" element={<TermsVC/>} />
         
         {/* Dashboard Page for user profile */}
         <Route path="/dashboard" element={<Dashboard/>} />
       

        {/* Authenticated Pages */}
        <Route
          path="/form"
          element={authUser ? <FormPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/notifications"
          element={authUser ? <NotificationsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/network"
          element={authUser ? <NetworkPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/search"
          element={authUser ? <SearchPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:username"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/myplans"
          element={authUser ? <MyPlans /> : <Navigate to="/login" />}
        />
        <Route
          path="/success"
          element={authUser ? <Success /> : <Navigate to="/login" />}
        />
        <Route
          path="/cancel"
          element={authUser ? <Failure /> : <Navigate to="/login" />}
        />
        <Route
          path="/message"
          element={authUser ? <MessagePage /> : <Navigate to="/login" />}
        />

        {/* General Pages */}
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/contactus" element={<Contact />} />
      </Routes>
      <Toaster />
    </Layout>
  );
};

export default App;
