import WithAuth from "../utils/WithAuth.jsx";
import { IconButton, Button, TextField } from "@mui/material";
import { Restore } from "@mui/icons-material";
import { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { Toaster, toast } from "react-hot-toast";

function Home() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);
  const { createMeeting } = useContext(AuthContext);

  let handleMeeting = async () => {
    try {
      const response = await createMeeting();
      navigate(`/meeting/${response.data.meetingCode}`);
    } catch (error) {
      localStorage.removeItem("token");
      toast.error("Session expire");
      navigate("/auth");
    }
  };

  let handleJoinVideoCall = async () => {
    try {
      const response = await addToUserHistory(meetingCode);
      if (response.status === 404) {
        toast.error(response.data.message);
      } else {
        navigate(`/meeting/${meetingCode}`);
      }
    } catch (error) {
      let message = error.response.data.message;
      toast.error(message);
    }
  };
  const toastMessage = ()=>{
    toast.success("Welcome to LiveView Video call");
  }
  useEffect(() => {
    toastMessage();
    return () => {
      toast.dismiss();
    }
  }, []);
  return (
    <div>
      <Toaster position="top-center" />
      <div className="navBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>
            <span style={{ color: "#FF9839" }}>LiveView</span> Video Call
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => {
              navigate("/history");
            }}
          >
            <Restore />
          </IconButton>
          <p>History</p>
          <Button
            className="logOut"
            onClick={() => {
              localStorage.removeItem("token");
              toast.success("Logout succesfully");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="meetContainer">
        <div className="leftPanel">
          <div style={{ width: "100%" }}>
            <h2 className="element">
              Provideing Quality Video Call Just Like Quality Education
            </h2>
            <div className="element">
              <Button variant="contained" onClick={handleMeeting}>
                Create Meeting
              </Button>
            </div>
            <div className="element" style={{ gap: "10px" }}>
              <TextField
                label="Meeting Code"
                value={meetingCode}
                className="meetCode"
                onChange={(e) => setMeetingCode(e.target.value)}
              ></TextField>
              <Button variant="contained" onClick={handleJoinVideoCall}>
                Join
              </Button>
            </div>
          </div>
        </div>
        <div className="rightPanel">
          {/* Visit unDraw */}
          <img src="./logo3.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default WithAuth(Home);
