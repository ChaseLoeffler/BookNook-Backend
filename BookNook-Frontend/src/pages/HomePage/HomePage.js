import React from "react";
import useAuth from "../../hooks/useAuth";

const HomePage = () => {
  const [user, token] = useAuth();
  
  return (
    <div className="container">
      {console.log(user)}
      <h1>Welcome to BookNook, {user.userName}!</h1>
      <p>Please use the NavBar to search books or go to your Favorites</p>
    </div>
  );
};

export default HomePage;
