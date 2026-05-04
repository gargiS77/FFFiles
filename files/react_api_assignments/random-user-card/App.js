import React, { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = () => {
    setLoading(true);
    fetch("https://randomuser.me/api/")
      .then(res => res.json())
      .then(data => {
        setUser(data.results[0]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Random User Card</h2>
      
      {loading ? (
        <p>Loading user data...</p>
      ) : (
        user && (
          <div style={{ border: "1px solid black", padding: "20px", width: "300px", margin: "0 auto" }}>
            <img src={user.picture.large} alt="user profile" style={{ borderRadius: "50%" }} />
            <h3>{user.name.first} {user.name.last}</h3>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Phone:</b> {user.phone}</p>
            <p><b>Location:</b> {user.location.city}, {user.location.country}</p>
          </div>
        )
      )}
      
      <br />
      <button onClick={fetchUser}>Fetch New User</button>
    </div>
  );
}
export default App;
