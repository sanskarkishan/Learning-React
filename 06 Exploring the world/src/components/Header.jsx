import { LOGO } from "../utils/constants";
import { useState } from "react";

const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState("Login");

  const handleClick = () => {
    // setIsLoggedIn("Logout"); // to change the state to Logout when clicked
    
    isLoggedIn === "Login" ? setIsLoggedIn("Logout") : setIsLoggedIn("Login"); // toggle between login and logout
  }

  return (
    <div className="header"> 

      <div className="logo-container">
        <img className="logo" src={LOGO} alt="Logo" />
      </div>
      
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Cart</li>
          <button className="login" onClick={handleClick}>{isLoggedIn}</button>
        </ul>
      </div>

    </div>
  );
};

export default Header;