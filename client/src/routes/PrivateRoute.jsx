/* eslint-disable react/prop-types */
import  { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; 

    if (!user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <span className="loading loading-spinner loading-lg text-center text-2xl font-bold"></span>
    );
  }

  return user ? children : null; 
};

export default PrivateRoute;
