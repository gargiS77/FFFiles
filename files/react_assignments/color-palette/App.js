import React, { useState } from "react";

export default function App() {
  const [hex, setHex] = useState("#ff0000");

  // Extremely basic shade logic: just change opacity
  const shades = [1, 0.8, 0.6, 0.4, 0.2];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Color Palette Generator</h2>
      <input type="color" value={hex} onChange={e => setHex(e.target.value)} />
      <span style={{ marginLeft: "10px" }}>{hex}</span>

      <div style={{ display: "flex", marginTop: "20px" }}>
        {shades.map((s, index) => (
          <div key={index} style={{
            width: "100px",
            height: "100px",
            backgroundColor: hex,
            opacity: s,
            border: "1px solid black",
            marginRight: "10px"
          }}>
          </div>
        ))}
      </div>
    </div>
  );
}
