import React, { useState } from "react";

export default function App() {
  const [data] = useState([
    { id: 1, name: "Alice", grade: "A" },
    { id: 2, name: "Bob", grade: "B" },
    { id: 3, name: "Charlie", grade: "C" },
    { id: 4, name: "David", grade: "A" }
  ]);
  const [search, setSearch] = useState("");

  const filtered = data.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student List</h2>
      <input 
        type="text" 
        placeholder="Search name..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <div style={{ marginTop: "20px" }}>
        {filtered.map(s => (
          <div key={s.id} style={{ border: "1px solid black", margin: "10px 0", padding: "10px", width: "200px" }}>
            <b>{s.name}</b>
            <p>Grade: {s.grade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
