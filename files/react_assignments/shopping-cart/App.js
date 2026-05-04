import React, { useReducer } from "react";

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { id: Date.now(), name: action.name, price: action.price, qty: 1 }];
    case "INC":
      return state.map(item => item.id === action.id ? { ...item, qty: item.qty + 1 } : item);
    case "DEC":
      return state.map(item => item.id === action.id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item);
    case "DEL":
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
}

export default function App() {
  const [cart, dispatch] = useReducer(reducer, initialState);

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shopping Cart</h2>
      <button onClick={() => dispatch({ type: "ADD", name: "Apple", price: 2 })}>Add Apple ($2)</button>
      <button onClick={() => dispatch({ type: "ADD", name: "Banana", price: 1 })}>Add Banana ($1)</button>

      <ul style={{ marginTop: "20px" }}>
        {cart.map(item => (
          <li key={item.id} style={{ marginBottom: "10px" }}>
            {item.name} - ${item.price} x {item.qty} 
            <button onClick={() => dispatch({ type: "INC", id: item.id })}>+</button>
            <button onClick={() => dispatch({ type: "DEC", id: item.id })}>-</button>
            <button onClick={() => dispatch({ type: "DEL", id: item.id })}>Remove</button>
          </li>
        ))}
      </ul>

      <h3>Total: ${total}</h3>
    </div>
  );
}
