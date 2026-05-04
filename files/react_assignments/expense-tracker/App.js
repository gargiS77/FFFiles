import React, { useState, useEffect } from "react";

export default function App() {
  const [list, setList] = useState(() => {
    let saved = localStorage.getItem("expenses");
    if (saved) return JSON.parse(saved);
    return [];
  });
  
  const [text, setText] = useState("");
  const [amt, setAmt] = useState("");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(list));
  }, [list]);

  const add = () => {
    if (text && amt) {
      setList([...list, { text, amt: parseFloat(amt) }]);
      setText("");
      setAmt("");
    }
  };

  const remove = (index) => {
    let newList = list.filter((_, i) => i !== index);
    setList(newList);
  };

  const total = list.reduce((sum, item) => sum + item.amt, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Expense Tracker</h2>
      <input placeholder="Expense Name" value={text} onChange={e => setText(e.target.value)} />
      <input type="number" placeholder="Amount" value={amt} onChange={e => setAmt(e.target.value)} />
      <button onClick={add}>Add</button>

      <ul>
        {list.map((item, i) => (
          <li key={i}>
            {item.text} - ${item.amt} 
            <button onClick={() => remove(i)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${total}</h3>
    </div>
  );
}
