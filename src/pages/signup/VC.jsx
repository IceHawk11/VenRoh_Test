import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaFileUpload, FaArrowLeft, FaFilePdf, FaFileWord, FaCheckCircle, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "./SignUpStyles2.css";

const VC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    first_line_address: "",
    country: "",
    state: "",
    city: "",
    pin_code: "",
    age: "",
    firm_name: "",
    firm_email: "",
  });

  const [phone, setPhone] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const [govtId, setGovtId] = useState(null);
  const [sebiDoc, setSebiDoc] = useState(null);

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation state
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    passwordsMatch: false
  });

  // Debounced password validation state
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
  const [showPasswordMatch, setShowPasswordMatch] = useState(false);
  const [passwordTypingTimeout, setPasswordTypingTimeout] = useState(null);
  const [confirmPasswordTypingTimeout, setConfirmPasswordTypingTimeout] = useState(null);

  // Address data from API
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Loading states
  const [loading, setLoading] = useState({
    countries: false,
    states: false,
    cities: false
  });

  // Error states
  const [errors, setErrors] = useState({
    countries: null,
    states: null,
    cities: null
  });

  // Password validation function
  const validatePassword = (password, confirmPassword) => {
    const validation = {
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      passwordsMatch: password === confirmPassword && password.length > 0
    };
    
    setPasswordValidation(validation);
    return validation;
  };

  // Check if password is valid
  const isPasswordValid = () => {
    return passwordValidation.minLength && 
           passwordValidation.uppercase && 
           passwordValidation.lowercase && 
           passwordValidation.number && 
           passwordValidation.specialChar && 
           passwordValidation.passwordsMatch;
  };

  // Check if all password requirements (except match) are met
  const arePasswordRequirementsMet = () => {
    return passwordValidation.minLength && 
           passwordValidation.uppercase && 
           passwordValidation.lowercase && 
           passwordValidation.number && 
           passwordValidation.specialChar;
  };

  // React-Select custom styles
  const selectStyles = {
     dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "#000", // solid black caret
    fontWeight: "bold", // makes it bolder
    fontSize: "1.2rem", // slightly larger
    padding: "8px",
    transition: "color 0.2s ease, transform 0.2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)", // smooth arrow flip
    "&:hover": {
      color: "#000"
    }
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: "#ccc"
  }),
    control: (provided, state) => ({
      ...provided,
      minHeight: '50px',
      border: '2px solid #ddd',
      borderRadius: '8px',
      fontSize: '16px',
      backgroundColor: '#fff',
      borderColor: state.isFocused ? '#d4af37' : '#ddd',
      boxShadow: state.isFocused ? '0 0 0 1px #d4af37' : 'none',
      '&:hover': {
        borderColor: '#d4af37'
      }
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: '200px',
      zIndex: 9999,
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }),
    menuList: (provided) => ({
      ...provided,
      scrollbarColor: "#000 #f0f0f0",
      maxHeight: '200px',
      overflowY: 'auto',
      '::-webkit-scrollbar': {
        width: '8px'
      },
      '::-webkit-scrollbar-track': {
        background: '#f1f1f1',
        borderRadius: '4px'
      },
      '::-webkit-scrollbar-thumb': {
        background: '#d4af37',
        borderRadius: '4px'
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#b8941f'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#d4af37' : state.isFocused ? '#ccc' : '#fff',
      color: state.isSelected ? '#fff' : '#333',
      padding: '10px 12px',
      cursor: 'pointer'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#999'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#333'
    }),
    loadingIndicator: (provided) => ({
      ...provided,
      color: '#fac208ff'
    })
  };

  // Fetch countries on component mount
  useEffect(() => {
    fetchCountries();
  }, []);

  // Validate password whenever password or confirmPassword changes
  useEffect(() => {
    validatePassword(formData.password, formData.confirmPassword);
    
    // Hide password requirements validation if all requirements are met
    if (arePasswordRequirementsMet() && showPasswordValidation) {
      setTimeout(() => {
        setShowPasswordValidation(false);
      }, 2000); // Hide after 2 seconds when all requirements are met
    }
    
    // Hide password match validation if passwords match
    if (passwordValidation.passwordsMatch && showPasswordMatch) {
      setTimeout(() => {
        setShowPasswordMatch(false);
      }, 2000); // Hide after 2 seconds when passwords match
    }
  }, [formData.password, formData.confirmPassword]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (passwordTypingTimeout) {
        clearTimeout(passwordTypingTimeout);
      }
      if (confirmPasswordTypingTimeout) {
        clearTimeout(confirmPasswordTypingTimeout);
      }
    };
  }, [passwordTypingTimeout, confirmPasswordTypingTimeout]);

  const fetchCountries = async () => {
    setLoading(prev => ({ ...prev, countries: true }));
    setErrors(prev => ({ ...prev, countries: null }));
    
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.msg || 'Failed to fetch countries');
      }
      
      if (data.data && Array.isArray(data.data)) {
        const sortedCountries = data.data
          .map(country => ({
            name: country.country,
            iso2: country.iso2 || '',
            iso3: country.iso3 || ''
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        
        setCountries(sortedCountries);
      } else {
        throw new Error('Invalid response format');
      }
      
    } catch (error) {
      console.error('Error fetching countries:', error);
      setErrors(prev => ({ ...prev, countries: 'Failed to load countries. Please refresh the page.' }));
      
      // Fallback to some essential countries
      const fallbackCountries = [
        { name: 'India', iso2: 'IN', iso3: 'IND' },
        { name: 'United States', iso2: 'US', iso3: 'USA' },
        { name: 'United Kingdom', iso2: 'GB', iso3: 'GBR' },
        { name: 'Canada', iso2: 'CA', iso3: 'CAN' },
        { name: 'Australia', iso2: 'AU', iso3: 'AUS' },
        { name: 'Germany', iso2: 'DE', iso3: 'DEU' },
        { name: 'France', iso2: 'FR', iso3: 'FRA' },
        { name: 'Japan', iso2: 'JP', iso3: 'JPN' }
      ];
      setCountries(fallbackCountries);
    } finally {
      setLoading(prev => ({ ...prev, countries: false }));
    }
  };

  const fetchStates = async (countryName) => {
    if (!countryName) return;
    
    setLoading(prev => ({ ...prev, states: true }));
    setErrors(prev => ({ ...prev, states: null }));
    setStates([]);
    setCities([]);
    
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country: countryName
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.msg || 'Failed to fetch states');
      }
      
      if (data.data && data.data.states && Array.isArray(data.data.states)) {
        const sortedStates = data.data.states
          .map(state => ({
            name: state.name,
            state_code: state.state_code || ''
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        
        setStates(sortedStates);
      } else {
        // Some countries might not have states data
        setStates([]);
      }
      
    } catch (error) {
      console.error('Error fetching states:', error);
      setErrors(prev => ({ ...prev, states: 'Failed to load states for this country.' }));
      setStates([]);
    } finally {
      setLoading(prev => ({ ...prev, states: false }));
    }
  };

  const fetchCities = async (countryName, stateName) => {
    if (!countryName || !stateName) return;
    
    setLoading(prev => ({ ...prev, cities: true }));
    setErrors(prev => ({ ...prev, cities: null }));
    setCities([]);
    
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country: countryName,
          state: stateName
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.msg || 'Failed to fetch cities');
      }
      
      if (data.data && Array.isArray(data.data)) {
        const sortedCities = data.data
          .map(city => ({ name: city }))
          .sort((a, b) => a.name.localeCompare(b.name));
        
        setCities(sortedCities);
      } else {
        setCities([]);
      }
      
    } catch (error) {
      console.error('Error fetching cities:', error);
      setErrors(prev => ({ ...prev, cities: 'Failed to load cities for this state.' }));
      setCities([]);
    } finally {
      setLoading(prev => ({ ...prev, cities: false }));
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const [ageError, setAgeError] = useState("");
   const handleAgeBlur = () => {
    if (formData.age === "") {
      setAgeError("Age is required");
    } else if (parseInt(formData.age) < 18) {
      setAgeError("You must be at least 18 years old.");
    } else {
      setAgeError("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  
    // Handle password field changes with debouncing
    if (name === "password") {
      // Clear existing timeout
      if (passwordTypingTimeout) {
        clearTimeout(passwordTypingTimeout);
      }

      // If password is empty, hide validation immediately
      if (value === "") {
        setShowPasswordValidation(false);
        return;
      }

      // Set new timeout to show validation after user stops typing
      const newTimeout = setTimeout(() => {
        setShowPasswordValidation(true);
      }, 800); // Show validation 800ms after user stops typing

      setPasswordTypingTimeout(newTimeout);
    }

    // Handle confirm password field changes
    if (name === "confirmPassword") {
      // Clear existing timeout
      if (confirmPasswordTypingTimeout) {
        clearTimeout(confirmPasswordTypingTimeout);
      }

      // If confirm password is empty, hide match validation immediately
      if (value === "") {
        setShowPasswordMatch(false);
        return;
      }

      // Set new timeout to show password match validation after user stops typing
      const newTimeout = setTimeout(() => {
        setShowPasswordMatch(true);
      }, 800); // Show match validation 800ms after user stops typing

      setConfirmPasswordTypingTimeout(newTimeout);
    }
  };

  const handleSelectChange = (name, selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    setFormData(prev => ({ ...prev, [name]: value }));

    // Handle cascading address field changes
    if (name === "country") {
      setFormData(prev => ({ ...prev, state: "", city: "" }));
      if (value) {
        fetchStates(value);
      } else {
        setStates([]);
        setCities([]);
      }
    } else if (name === "state") {
      setFormData(prev => ({ ...prev, city: "" }));
      if (value && formData.country) {
        fetchCities(formData.country, value);
      } else {
        setCities([]);
      }
    }
  };

  const handleFileChange = (e, setter, previewSetter = null) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setter(file);
      
      // Create preview for images (profile photo)
      if (previewSetter && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewSetter(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeFile = (setter, previewSetter = null) => {
    setter(null);
    if (previewSetter) {
      previewSetter(null);
    }
  };

  const getFileIcon = (file) => {
    if (!file) return <FaFileUpload />;
    
    const extension = file.name.split('.').pop().toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FaFilePdf />;
      case 'ppt':
      case 'pptx':
        return <FaFileWord />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FaCheckCircle />;
      default:
        return <FaCheckCircle />;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseInt(formData.age) < 18) {
      setAgeError("You must be at least 18 years old.");
      return; // block form submission
    }

    // Validate password requirements
    if (!isPasswordValid()) {
      alert("Please ensure your password meets all requirements and passwords match.");
      return;
    }

    // Validate mandatory file uploads
    if (!govtId) {
      alert("Please upload your Government ID. This field is mandatory.");
      return;
    }

    if (!sebiDoc) {
      alert("Please upload the SEBI Registration Document. This field is mandatory.");
      return;
    }

    // Prepare object for storage
    const dataToStore = {
      ...formData,
      phone,
      files: {
        profile_photo: profilePhoto ? profilePhoto.name : null,
        govt_id_url: govtId ? govtId.name : null,
        sebi_doc_url: sebiDoc ? sebiDoc.name : null,
      },
    };

    // Store meta info in localStorage
    localStorage.setItem("VCFormData", JSON.stringify(dataToStore));

    // Store actual file objects temporarily in sessionStorage
    sessionStorage.setItem("VCFiles", JSON.stringify({
      profilePhoto: profilePhoto ? { name: profilePhoto.name, type: profilePhoto.type } : null,
      govtId: govtId ? { name: govtId.name, type: govtId.type } : null,
      sebiDoc: sebiDoc ? { name: sebiDoc.name, type: sebiDoc.type } : null
    }));

    // Navigate with file objects in state
    navigate("/termsVC", {
      state: {
        profilePhoto,
        govtId,
        sebiDoc
      }
    });
  };

  // Password validation component (without password match)
  const PasswordValidationIndicator = () => (
    <div className="password-validation" style={{ 
      marginTop: '8px', 
      padding: '10px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '8px',
      fontSize: '14px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ 
          color: passwordValidation.minLength ? '#28a745' : '#dc3545',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {passwordValidation.minLength ? '✅' : '❌'} At least 8 characters
        </div>
        <div style={{ 
          color: passwordValidation.uppercase ? '#28a745' : '#dc3545',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {passwordValidation.uppercase ? '✅' : '❌'} At least 1 uppercase letter
        </div>
        <div style={{ 
          color: passwordValidation.lowercase ? '#28a745' : '#dc3545',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {passwordValidation.lowercase ? '✅' : '❌'} At least 1 lowercase letter
        </div>
        <div style={{ 
          color: passwordValidation.number ? '#28a745' : '#dc3545',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {passwordValidation.number ? '✅' : '❌'} At least 1 number
        </div>
        <div style={{ 
          color: passwordValidation.specialChar ? '#28a745' : '#dc3545',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {passwordValidation.specialChar ? '✅' : '❌'} At least 1 special character
        </div>
      </div>
    </div>
  );

  return (
    <div className="signup-container">
      <motion.div
        className="signup-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Back Button */}
        <motion.button
          className="back-button"
          onClick={handleBack}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft className="back-icon" /> 
        </motion.button>

        <motion.h1
          className="signup-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Venture Capital Information
        </motion.h1>

        <motion.form
          className="signup-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Profile Photo - Optional */}
          <label>Profile Photo </label>
          <motion.div className={`upload-box ${profilePhoto ? 'upload-success' : ''}`} whileHover={{ scale: 1.02 }}>
            {profilePhotoPreview ? (
              <div className="file-preview profile-preview">
                <div className="preview-content">
                  <img 
                    src={profilePhotoPreview} 
                    alt="Profile Preview" 
                    className="profile-preview-image"
                  />
                  <div className="file-info">
                    <p className="file-name-compact">{profilePhoto?.name}</p>
                    <button 
                      type="button" 
                      className="remove-file-btn-compact"
                      onClick={() => removeFile(setProfilePhoto, setProfilePhotoPreview)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="upload-placeholder">
                <FaUserCircle className="upload-icon golden-icon" />
                <p>Click or Drag to Upload</p>
              </div>
            )}
            <input
              type="file"
              name="profile_photo"
              accept="image/*"
              className="file-input-overlay"
              onChange={(e) => handleFileChange(e, setProfilePhoto, setProfilePhotoPreview)}
            />
          </motion.div>

          {/* Full Name */}
          <label>Full Name <span className="required-asterisk">*</span></label>
          <motion.input
            type="text"
            name="name"
            placeholder="Enter your full name"
            className="signup-input"
            required
            value={formData.name}
            onChange={handleChange}
            whileHover={{ scale: 1.02, boxShadow: "0 0 8px rgba(212, 175, 55, 0.5)" }}
            transition={{ type: "spring", stiffness: 300 }}
          />

          {/* Phone Number */}
          <label>Phone Number <span className="required-asterisk">*</span></label>
          <motion.div 
          whileHover={{ scale: 1.02, boxShadow: "0 0 8px rgba(212, 175, 55, 0.5)" }}
          transition={{ type: "spring", stiffness: 300 }}
          >
            <PhoneInput
              country="in"
              value={phone}
              onChange={setPhone}
              inputProps={{
                name: "phone",
                required: true,
                className: "signup-input-phone",
              }}
              enableSearch={true}
              countryCodeEditable={false}
              disableCountryCode={false}
              disableDropdown={false}
              containerClass="phone-input-container"
              buttonClass="phone-dropdown-button"
              dropdownClass="phone-dropdown"
              searchClass="phone-search"
              specialLabel=""
              autoFormat={true}
              onlyCountries={["us", "in", "gb", "ca", "au", "de", "fr", "jp", "cn"]}
            />
          </motion.div>

          {/* Email */}
          <label>Email ID <span className="required-asterisk">*</span></label>
          <motion.input
            type="email"
            name="email"
            placeholder="example@email.com"
            className="signup-input"
            required
            value={formData.email}
            onChange={handleChange}
            whileHover={{ scale: 1.02, boxShadow: "0 0 8px rgba(212, 175, 55, 0.5)" }}
            transition={{ type: "spring", stiffness: 300 }}
          />

          {/* Password */}
          <label>Password <span className="required-asterisk">*</span></label>
          <motion.div style={{ position: 'relative' }}>
            <motion.input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a new password"
              className="signup-input"
              required
              value={formData.password}
              onChange={handleChange}
              style={{ paddingRight: '40px' }}
             whileHover={{ scale: 1.02, boxShadow: "0 0 8px rgba(212, 175, 55, 0.5)" }}
             transition={{ type: "spring", stiffness: 300 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                fontSize: '16px'
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </motion.div>
          
          {/* Show password validation when user has stopped typing (without password match) - hide when all requirements met */}
          {showPasswordValidation && formData.password && !arePasswordRequirementsMet() && <PasswordValidationIndicator />}
         
         {/* Confirm Password */}
          <label>Confirm Password <span className="required-asterisk">*</span></label>
          <motion.div style={{ position: 'relative' }}>
            <motion.input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              className="signup-input"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{ paddingRight: '40px' }}
             whileHover={{ scale: 1.02, boxShadow: "0 0 8px rgba(212, 175, 55, 0.5)" }}
             transition={{ type: "spring", stiffness: 300 }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                fontSize: '16px'
              }}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </motion.div>
          
          {/* Show password match status only after user stops typing in confirm password field - hide when passwords match */}
          {showPasswordMatch && formData.confirmPassword && !passwordValidation.passwordsMatch && (
            <div style={{ 
              marginTop: '8px', 
              color: '#dc3545',
              fontSize: '14px'
            }}>
              ❌ Passwords do not match
            </div>
          )}

          {/* Address Fields */}
          {/* First Line of Address */}
          <label>First Line of Address <span className="required-asterisk">*</span></label>
          <motion.input
            type="text"
            name="first_line_address"
            placeholder="House/Flat No., Street Name, Area"
            className="signup-input"
            required
            value={formData.first_line_address}
            onChange={handleChange}
            whileHover={{ scale: 1.02, boxShadow: "0 0 8px rgba(212, 175, 55, 0.5)" }}
            transition={{ type: "spring", stiffness: 300 }}
          />

          {/* Country */}
          <label>Country <span className="required-asterisk">*</span></label>
           <motion.div className="dropdown-container"
           whileHover={{ 
            scale: 1.01, // Reduced scale to prevent overlap
            boxShadow: "0 0 8px rgba(212, 175, 55, 0.5)",
            zIndex: 10 // Ensure proper layering
            }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ 
          transformOrigin: "center", // Control scaling origin
          position: "relative" // Ensure z-index works
          }}
          >
            <Select
              options={countries.map(country => ({ 
                value: country.name, 
                label: country.name 
              }))}
              value={formData.country ? { value: formData.country, label: formData.country } : null}
              onChange={(selectedOption) => handleSelectChange("country", selectedOption)}
              placeholder={loading.countries ? "Loading countries..." : "Select Country"}
              isSearchable={true}
              isDisabled={loading.countries}
              isLoading={loading.countries}
              styles={selectStyles}
              menuPlacement="auto"
              name="country"
            />
            {errors.countries && (
              <p className="error-message">{errors.countries}</p>
            )}
          </motion.div>

          {/* State */}
          <label>State/Province <span className="required-asterisk">*</span></label>
           <motion.div className="dropdown-container"
           whileHover={{ 
            scale: 1.01, // Reduced scale to prevent overlap
            boxShadow: "0 0 8px rgba(212, 175, 55, 0.5)",
            zIndex: 10 // Ensure proper layering
            }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ 
          transformOrigin: "center", // Control scaling origin
          position: "relative" // Ensure z-index works
          }}
          >
            <Select
              options={states.map(state => ({ 
                value: state.name, 
                label: state.name 
              }))}
              value={formData.state ? { value: formData.state, label: formData.state } : null}
              onChange={(selectedOption) => handleSelectChange("state", selectedOption)}
              placeholder={
                loading.states ? "Loading states..." : 
                formData.country ? "Select State/Province" : "Select Country First"
              }
              isSearchable={true}
              isDisabled={!formData.country || loading.states}
              isLoading={loading.states}
              styles={selectStyles}
              menuPlacement="auto"
              name="state"
            />
            {errors.states && (
              <p className="error-message">{errors.states}</p>
            )}
          </motion.div>

          {/* City/District */}
          <label>City/District <span className="required-asterisk">*</span></label>
           <motion.div className="dropdown-container"
           whileHover={{ 
            scale: 1.01, // Reduced scale to prevent overlap
            boxShadow: "0 0 8px rgba(212, 175, 55, 0.5)",
            zIndex: 10 // Ensure proper layering
            }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ 
          transformOrigin: "center", // Control scaling origin
          position: "relative" // Ensure z-index works
          }}
          >
            <Select
              options={cities.map(city => ({ 
                value: city.name, 
                label: city.name 
              }))}
              value={formData.city ? { value: formData.city, label: formData.city } : null}
              onChange={(selectedOption) => handleSelectChange("city", selectedOption)}
              placeholder={
                loading.cities ? "Loading cities..." : 
                formData.state ? "Select City/District" : "Select State First"
              }
              isSearchable={true}
              isDisabled={!formData.state || loading.cities}
              isLoading={loading.cities}
              styles={selectStyles}
              menuPlacement="auto"
              name="city"
            />
            {errors.cities && (
              <p className="error-message">{errors.cities}</p>
            )}
          </motion.div>

          {/* Pin Code */}
          <label>Pin Code <span className="required-asterisk">*</span></label>
          <motion.input
            type="number"
            name="pin_code"
            placeholder="Enter Pin Code"
            className="signup-input"
            required
            value={formData.pin_code}
            onChange={handleChange}
            pattern="[0-9A-Za-z\s\-]{3,10}"
            title="Please enter a valid pin code"
            whileHover={{ scale: 1.02, boxShadow: "0 0 8px rgba(212, 175, 55, 0.5)" }}
            transition={{ type: "spring", stiffness: 300 }}
          />

          {/* Age */}
          <label>Age (in yrs) <span className="required-asterisk">*</span></label>
          <motion.input
            type="number"
            name="age"
            placeholder="Enter your age"
            className="signup-input"
            required
            value={formData.age}
            onChange={handleChange}
            onBlur={handleAgeBlur}
            whileHover={{ scale: 1.02, boxShadow: "0 0 8px rgba(212, 175, 55, 0.5)" }}
            transition={{ type: "spring", stiffness: 300 }}
          />
           {ageError && <p className="age-error-message">{ageError}</p>}


          {/* Govt ID - Mandatory */}
          <label>Govt. ID <span className="required-asterisk">*</span></label>
          <motion.div className={`upload-box ${govtId ? 'upload-success' : 'upload-required'}`} whileHover={{ scale: 1.02 }}>
            {govtId ? (
              <div className="file-preview document-preview">
                <div className="preview-content">
                  <div className="file-icon-compact">
                    {getFileIcon(govtId)}
                  </div>
                  <div className="file-info">
                    <p className="file-name-compact">{govtId.name}</p>
                    <p className="file-size-compact">
                      {(govtId.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </div>
                  <button 
                    type="button" 
                    className="remove-file-btn-compact"
                    onClick={() => removeFile(setGovtId)}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            ) : (
              <div className="upload-placeholder">
                <FaFileUpload className="upload-icon golden-icon" />
                <p>Upload Document (JPG, PNG, PDF) - Required</p>
              </div>
            )}
            <input
              type="file"
              name="govt_id"
              accept=".jpg,.png,.pdf"
              className="file-input-overlay"
              onChange={(e) => handleFileChange(e, setGovtId)}
            />
          </motion.div>

         {/* VC Name */}
         <label>Firm Name <span className="required-asterisk">*</span></label>
           <motion.input
            type="text"
            name="firm_name"
            placeholder="Enter your company's name"
            className="signup-input"
            required
            value={formData.firm_name}
            onChange={handleChange}
            whileHover={{ scale: 1.02, boxShadow: "0 0 8px rgba(212, 175, 55, 0.5)" }}
            transition={{ type: "spring", stiffness: 300 }}
            />

           {/* VC's Official Email */}
            <label>Firm's Official Email <span className="required-asterisk">*</span></label>
            <motion.input
            type="email"
            name="firm_email"
            placeholder="example@email.com"
            className="signup-input"
            required
            value={formData.firm_email}
            onChange={handleChange}
            whileHover={{ scale: 1.02, boxShadow: "0 0 8px rgba(212, 175, 55, 0.5)" }}
            transition={{ type: "spring", stiffness: 300 }}
            />

          {/* SEBI Regist. Doc*/}
          <label>SEBI Registration Document (PDF Upload) <span className="required-asterisk">*</span></label>
          <motion.div className={`upload-box ${sebiDoc ? 'upload-success' : 'upload-required'}`} whileHover={{ scale: 1.02 }}>
            {sebiDoc ? (
              <div className="file-preview document-preview">
                <div className="preview-content">
                  <div className="file-icon-compact">
                    {getFileIcon(sebiDoc)}
                  </div>
                  <div className="file-info">
                    <p className="file-name-compact">{sebiDoc.name}</p>
                    <p className="file-size-compact">
                      {(sebiDoc.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </div>
                  <button 
                    type="button" 
                    className="remove-file-btn-compact"
                    onClick={() => removeFile(setSebiDoc)}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            ) : (
              <div className="upload-placeholder">
                <FaFileUpload className="upload-icon golden-icon" />
                <p>Upload Document - Required</p>
              </div>
            )}
            <input
              type="file"
              name="sebi_doc"
              accept=".ppt,.pptx,.pdf,.docx"
              className="file-input-overlay"
              onChange={(e) => handleFileChange(e, setSebiDoc)}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="signup-button"
            whileHover={{ backgroundColor: "#f1d86d", scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!isPasswordValid()}
            style={{
              opacity: isPasswordValid() ? 1 : 0.6,
              cursor: isPasswordValid() ? 'pointer' : 'not-allowed'
            }}
          >
            Submit
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default VC;