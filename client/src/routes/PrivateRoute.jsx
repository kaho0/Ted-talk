
import {  Navigate, useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth'

const PrivateRoute = ({children}) => {
const { user,loading} =useAuth()
const navigate=useNavigate()
if(loading)return <span className="loading loading-spinner loading-lg"></span>
if(user)  return children
navigate('/login')

};

export default PrivateRoute;