import "../styles/LandingPage.css"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function LandingPage() {
  const router = useNavigate(AuthContext);
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>
            <span style={{ color: "#FF9839" }}>LiveView</span>
          </h2>
        </div>
        <div className="navlist">
            <div role="button">
                <p onClick={() => router("/auth")}>Register</p>
            </div>
          <div role="button">
            <p onClick={() => router("/auth")}>Login</p>
          </div>
        </div>
      </nav>
      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> with your loved
            once
          </h1>
          <p>
            Cover a distance by{" "}
            <span style={{ color: "#FF9839" }}>LiveView</span> Video Call
          </p>
          <div role="button" className="btn">
            <Link to={"/home"}>Get Started</Link>
          </div>
          <div className="badges">
            <div className="badge">🔒 Secure</div>
            <div className="badge">⚡ Fast</div>
            <div className="badge">🎥 HD Quality</div>
          </div>
        </div>
        <div>
          <img src="./mobile.png" alt="" />
        </div>
      </div>
    </div>
  );
}
