import React, { useState } from "react";

function Counter({ label, val, setVal }) {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px", width: "200px" }}>
      <h3>{label}: {val}</h3>
      <button onClick={() => setVal(val + 1)}>+</button>
      <button onClick={() => setVal(val - 1)}>-</button>
      <button onClick={() => setVal(0)}>Reset</button>
    </div>
  );
}

export default function App() {
  const [c1, setC1] = useState(0);
  const [c2, setC2] = useState(0);
  const [c3, setC3] = useState(0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Triple Counter</h2>
      <Counter label="Counter 1" val={c1} setVal={setC1} />
      <Counter label="Counter 2" val={c2} setVal={setC2} />
      <Counter label="Counter 3" val={c3} setVal={setC3} />
      <h3>Grand Total: {c1 + c2 + c3}</h3>
    </div>
  );
}
