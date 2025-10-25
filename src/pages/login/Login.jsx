import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './LoginStyles.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Local login validation only
  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'pratik.venroh@gmail.com' && password === 'venroh@123') {
      setLoading(true);
      setTimeout(() => {
        console.log('✅ Logged in successfully!');
        navigate('/dashboard');
      }, 800); // small delay for smoother UX
    } else {
      alert('❌ Invalid credentials. Please try again.');
    }
  };

  // ✅ Dummy sign-up (for UI only)
   const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h1 
          className="login-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Welcome Back!
        </motion.h1>
        
        <motion.p 
          className="login-subtitle"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          We're glad to see you again! Let's get back.
        </motion.p>

        <motion.form 
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.input
            type="email"
            placeholder="Enter your E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            required
          />

          {/* 👁️ Password field with icon inside */}
          <div className="password-container">
            <motion.input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input password-input"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <motion.button
            type="submit"
            className="login-button"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {loading ? 'Loading...' : 'Login'}
          </motion.button>
        </motion.form>

        <motion.div 
          className="login-divider"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />

        <motion.p 
          className="signup-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Are you new?
        </motion.p>

        <motion.button
          onClick={handleSignUp}
          className="signup-button"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {loading ? 'Loading...' : 'Sign up'}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;
