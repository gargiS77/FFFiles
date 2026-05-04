import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.github.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const showUser = (username) => {
    setLoading(true);
    fetch("https://api.github.com/users/" + username)
      .then(res => res.json())
      .then(data => {
        setDetail(data);
        setLoading(false);
      });
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>GitHub Users</h2>
      
      {detail ? (
        <div style={{ border: "1px solid black", padding: "20px" }}>
          <img src={detail.avatar_url} width="100" alt="avatar" />
          <h3>{detail.name || detail.login}</h3>
          <p>Bio: {detail.bio || "No bio"}</p>
          <p>Followers: {detail.followers}</p>
          <p>Following: {detail.following}</p>
          <button onClick={() => setDetail(null)}>Back</button>
        </div>
      ) : (
        <div>
          {users.map(u => (
            <div key={u.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px", border: "1px solid #ccc", padding: "10px" }}>
              <img src={u.avatar_url} width="50" style={{ borderRadius: "50%", marginRight: "10px" }} alt="avatar" />
              <b style={{ marginRight: "10px" }}>{u.login}</b>
              <button onClick={() => showUser(u.login)}>View Profile</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default App;
