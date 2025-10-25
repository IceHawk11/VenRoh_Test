import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './SignUpStyles.css';

const SignUp_1 = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const handleSelection = (role) => {
    setSelectedRole(role);

    if (role === "I have a Startup Idea") navigate("/idea");
    if (role === "I am a Startup Founder") navigate("/startup");
    if (role === "I am an Investor") navigate("/investor");
    if (role === "I own a Venture Capital Firm") navigate("/vc");
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="signup-container">
      <motion.div
        className="signup-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="signup-header">
          <motion.button
            className="back-button-icon"
            onClick={handleBack}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft className="back-icon-rem" />
          </motion.button>

          <motion.h1
            className="signup-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Let's Get Started!
          </motion.h1>
        </div>

        <motion.p
          className="signup-subtitle"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Tell us who you are to personalize your experience.
        </motion.p>

        <motion.div
          className="role-options"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {["I have a Startup Idea", "I am a Startup Founder", "I am an Investor", "I own a Venture Capital Firm"].map((role, index) => (
            <motion.button
              key={index}
              onClick={() => handleSelection(role)}
              className={`role-button ${selectedRole === role ? "selected" : ""}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {role}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="signup-divider"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />
      </motion.div>
    </div>
  );
};

export default SignUp_1;
