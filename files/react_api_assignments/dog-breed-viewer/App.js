import React, { useState, useEffect } from "react";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then(res => res.json())
      .then(data => {
        // data.message contains the breeds object
        let list = Object.keys(data.message);
        setBreeds(list);
      });
  }, []);

  const fetchImage = (breedName) => {
    setLoading(true);
    fetch("https://dog.ceo/api/breed/" + breedName + "/images/random")
      .then(res => res.json())
      .then(data => {
        setImgUrl(data.message);
        setLoading(false);
      });
  };

  return (
    <div style={{ padding: "20px", display: "flex", gap: "20px" }}>
      <div style={{ width: "200px", height: "400px", overflowY: "scroll", border: "1px solid black", padding: "10px" }}>
        <h3>Dog Breeds</h3>
        {breeds.map((b, index) => (
          <div key={index} style={{ cursor: "pointer", margin: "5px 0", color: "blue" }} onClick={() => fetchImage(b)}>
            {b}
          </div>
        ))}
      </div>

      <div style={{ border: "1px solid black", padding: "20px", width: "300px", textAlign: "center" }}>
        <h3>Breed Image</h3>
        {loading ? (
          <p>Loading image...</p>
        ) : (
          imgUrl ? <img src={imgUrl} alt="dog" width="250" /> : <p>Select a breed</p>
        )}
      </div>
    </div>
  );
}
export default App;
