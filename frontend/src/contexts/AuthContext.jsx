import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import httpStatus from "http-status";
export const AuthContext = createContext({});
import server from "../environment.js";

const client = axios.create({
  baseURL: `${server}/api/v1/users`
});



export const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState(authContext);
  const router = useNavigate();

  const handleRegister = async (name, username, password) => {
    try {
      let request = await client.post("/register", {
        name: name,
        username: username,
        password: password
      });
      if (request.status === httpStatus.CREATED) {
        return request.data.message;
      }
    } catch (e) {
      throw e;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      let request = await client.post("/login", {
        username: username,
        password: password
      });
      console.log(request.data);
      if (request.status === httpStatus.OK) {
        localStorage.setItem("token", request.data.token);
        router("/home");
      }
    } catch (error) {
      throw error;
    }
  };
  const getHistoryOfUser = async () => {
    try {
      let request = await client.get("/activity", {
        params:{
          token : localStorage.getItem("token")
        }
      });
      return request.data;
    } catch (error) {
      throw error;
    }
  };

  const addToUserHistory = async (meetingCode)=>{
    try {
      let request = await client.post("/activity", {
        token : localStorage.getItem("token"),
        meetingCode : meetingCode
      });
      return request;
    } catch (error) {
      throw error;
    }
  };

  const createMeeting = async ()=>{
    try {
      let request = await client.post("/meeting", {
        token : localStorage.getItem("token")
      });
      return request;
    } catch (error) {
      throw error;
    }
  };

  const getUserName = async ()=>{
     try {
      let request = await client.post("/user", {
        token : localStorage.getItem("token")
      });
      return request;
    } catch (error) {
      throw error;
    }
  };

  const data = {
    userData,
    setUserData,
    handleRegister, 
    handleLogin,
    getHistoryOfUser,
    addToUserHistory,
    createMeeting,
    getUserName,
  };
  return (
    <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
  );
};


