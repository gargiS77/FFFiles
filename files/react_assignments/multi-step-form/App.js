import React, { useState } from "react";

export default function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const nextStep = () => {
    if (step === 1 && data.name === "") return alert("Enter name!");
    if (step === 2 && data.email === "") return alert("Enter email!");
    setStep(step + 1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registration - Step {step}</h2>
      
      {step === 1 && (
        <div>
          <label>Name: </label>
          <input value={data.name} onChange={e => setData({...data, name: e.target.value})} />
        </div>
      )}

      {step === 2 && (
        <div>
          <label>Email: </label>
          <input value={data.email} onChange={e => setData({...data, email: e.target.value})} />
        </div>
      )}

      {step === 3 && (
        <div>
          <label>Password: </label>
          <input type="password" value={data.password} onChange={e => setData({...data, password: e.target.value})} />
        </div>
      )}

      {step === 4 && (
        <div>
          <h3>Success!</h3>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
        </div>
      )}

      <br/>
      {step > 1 && step < 4 && <button onClick={() => setStep(step - 1)}>Back</button>}
      {step < 3 && <button onClick={nextStep}>Next</button>}
      {step === 3 && <button onClick={() => setStep(4)}>Submit</button>}
    </div>
  );
}
