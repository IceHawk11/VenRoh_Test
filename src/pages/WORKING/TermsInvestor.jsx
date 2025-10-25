import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "./TermsStyles.css";

const TermsInvestor = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();

  const handleBack = () => {
    window.history.back();
  };

  const handleSubmit = async () => {
    const storedData = localStorage.getItem("InvestorFormData");
    if (!storedData) {
      alert("No form data found. Please fill the idea form again.");
      return;
    }

    const formData = JSON.parse(storedData);
    // Get files from navigation state (passed from Idea.jsx)
    const files = location.state || {};
    
    setSubmitting(true);

    try {
      // Create FormData object for multipart/form-data submission
      const submitFormData = new FormData();
      
      // Add all text fields
      submitFormData.append('name', formData.name);
      submitFormData.append('phone', formData.phone);
      submitFormData.append('age', formData.age);
      submitFormData.append('email', formData.email);
      submitFormData.append('about', formData.about);
      submitFormData.append('first_line_address', formData.first_line_address);
      submitFormData.append('password', formData.password);
      submitFormData.append('country', formData.country);
      submitFormData.append('state', formData.state);
      submitFormData.append('city', formData.city);
      submitFormData.append('pin_code', formData.pin_code);

      // Add files if they exist
      if (files.profilePhoto instanceof File) {
        submitFormData.append('profile_photo', files.profilePhoto);
      }
      
      if (files.govtId instanceof File) {
        submitFormData.append('govt_id', files.govtId);
      }
      
      // Submit to your backend API
      // Update this URL to match your actual backend endpoint
      const response = await fetch('http://localhost:5000/api/submit-investor', {
        method: 'POST',
        body: submitFormData,
        // Don't set Content-Type header - browser will set it automatically for FormData
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Check if response is OK and has content
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText || 'Unknown error'}`);
      }

      // Check if response has content before parsing JSON
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      if (!responseText.trim()) {
        throw new Error('Empty response from server');
      }

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid JSON response from server');
      }

      if (result.success) {
        alert("✅ Data submitted successfully!");
        localStorage.removeItem("investorFormData");
        sessionStorage.removeItem("investorFiles");
        // Optionally redirect to success page
        // navigate('/success');
      } else {
        throw new Error(result.message || 'Submission failed');
      }

    } catch (error) {
      console.error("❌ Error submitting data:", error);
      alert("❌ Failed to submit data. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelection = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="terms-container">
      <motion.div
        className="terms-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.button
          className="back-button"
          onClick={handleBack}
          whileHover={{ scale: 1.1, backgroundColor: "#caa92f" }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft className="back-icon" /> Back
        </motion.button>

        <motion.h1
          className="terms-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Terms & Conditions
        </motion.h1>

        <motion.div
          className="terms-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p>
            Welcome to our Venture Capital Portal. By proceeding, you agree to comply with
            and be bound by the following terms and conditions:
          </p>
          <ul>
            <li>1. Eligibility:</li> 
            <li> All users must be over 18 years old to access this platform. Furthermore, a Founder or Co-founder must create the account on behalf of their company using Registered Company Details. Founders and Investors alike must provide Valid Government documentation to identify themselves for protection of all the users.</li>
            <li>2. Services Provided:</li> 
            <li>This platform primarily connects Startups with Investors and vice versa. One user will not be allowed to search or access the profiles of other users of same kind.</li>
            <li>3. User Responsibilities:</li> 
            <li>Accuracy of Information: Users must provide true, complete, and updated information about themselves and their respective institutes.</li> 
            <li>Compliance with Law: Users are responsible for ensuring compliance with applicable laws and regulations.</li>
            <li>No Misuse: Users must not post false, misleading, or unlawful content.</li>
            <li>4. Subscription & Payment: </li>
            <li>Startups may be charged subscription fees as displayed on the Platform. Fees are non-refundable unless otherwise stated. Investors can access the platform for free.</li>
            <li>5. Verification: </li>
            <li>Startups may be required to submit proof of progress and other verification documents. VenRoh reserves the right to approve, reject, or remove profiles at our discretion.</li>
            <li>6. Disclaimer: </li>
            <li>We do not guarantee funding, investment interest, or business success. In a situation of any legal disputes or discrepancy between two users VenRoh will act as an unbiased mediator to its full capability (applicable only for informed investments).</li>
            <li>7. Intellectual Property: </li>
            <li>All platform content, trademarks, and materials are our property. Users may not copy, reproduce, or use our content without permission.</li>
            <li>8. Termination: </li>
            <li>We may suspend or terminate access if you breach these Terms. Users may close their accounts anytime by contacting support</li>
            <li>9. Changes to Terms: </li>
            <li>We may update these Terms at any time with prior notice. Continued use after changes will mean you accept the new Terms</li>
            <li>10. Contact: </li>
            <li>For any questions or concerns, email us at: admin@venroh.com</li>
         </ul>
        </motion.div>

        <motion.div
          className="terms-options"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className={`option-box ${selectedOption === "accept" ? "selected" : ""}`}
            whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(212,175,55,0.5)" }}
            onClick={() => handleSelection("accept")}
          >
            {selectedOption === "accept" && (
              <motion.div
                className="tick-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaCheckCircle />
              </motion.div>
            )}
            <span>I Accept</span>
          </motion.div>

          <motion.div
            className={`option-box ${selectedOption === "decline" ? "selected-decline" : ""}`}
            whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(255,0,0,0.3)" }}
            onClick={() => handleSelection("decline")}
          >
            {selectedOption === "decline" && (
              <motion.div
                className="tick-icon decline"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaCheckCircle />
              </motion.div>
            )}
            <span>I Don't Accept</span>
          </motion.div>
        </motion.div>

        {/* ✅ Visible only if "I Accept" is selected */}
        {selectedOption === "accept" && (
          <motion.button
            className="submit-button"
            onClick={handleSubmit}
            disabled={submitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {submitting ? "Submitting..." : "Submit Idea"}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default TermsInvestor;