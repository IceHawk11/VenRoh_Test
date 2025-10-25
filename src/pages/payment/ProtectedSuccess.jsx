import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Success from "../payment/Success";

const ProtectedSuccess = () => {
  const location = useLocation();

  if (!location.state?.fromCheckout || !location.state.sessionId) {
    return <Navigate to="/" replace />;
  }

  return <Success sessionId={location.state.sessionId} />;
};

export default ProtectedSuccess;
