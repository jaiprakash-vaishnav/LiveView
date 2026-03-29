import { Button } from "@mui/material";
import "../styles/NotFound.css";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    let navigate = useNavigate();
  return (
    <div className="notfound-container">

      <div className="content">
        <h1>404</h1>
        <h2>Page Not Found</h2>

        <p>
          Oops! The page you're looking for doesn’t exist or has been moved.
        </p>

        <div className="buttons">
          <Button onClick={()=>{ navigate("/")}} className="btn primary">Go Landing Page</Button>
        </div>
      </div>

    </div>
  );
}