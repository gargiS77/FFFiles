import React, { useState, useEffect } from "react";

function App() {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Programming");

  const fetchJoke = () => {
    setLoading(true);
    fetch("https://v2.jokeapi.dev/joke/" + category + "?type=single")
      .then(res => res.json())
      .then(data => {
        if (data.joke) {
          setJoke(data.joke);
        } else {
          setJoke("Could not find a joke. Try again.");
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Random Joke Generator</h2>
      
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="Programming">Programming</option>
        <option value="Misc">Misc</option>
        <option value="Pun">Pun</option>
        <option value="Any">Any</option>
      </select>
      
      <br/><br/>
      
      <div style={{ padding: "20px", border: "1px solid black", minHeight: "50px", marginBottom: "20px" }}>
        {loading ? <p>Loading joke...</p> : <p>{joke}</p>}
      </div>

      <button onClick={fetchJoke}>Get New Joke</button>
    </div>
  );
}
export default App;
