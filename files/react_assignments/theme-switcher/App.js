import React, { useState, useContext, createContext } from "react";

const ThemeContext = createContext();

function Navbar() {
  const { theme } = useContext(ThemeContext);
  return <div style={{ background: theme === 'light' ? '#eee' : '#333', color: theme === 'light' ? '#000' : '#fff', padding: '10px' }}>Navbar ({theme} mode)</div>;
}

function Card() {
  const { theme } = useContext(ThemeContext);
  return <div style={{ border: "1px solid black", background: theme === 'light' ? '#fff' : '#555', color: theme === 'light' ? '#000' : '#fff', padding: '20px', margin: '20px 0' }}>This is a card component</div>;
}

export default function App() {
  const [theme, setTheme] = useState('light');

  const toggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme }}>
      <div style={{ background: theme === 'light' ? '#fff' : '#222', color: theme === 'light' ? '#000' : '#fff', minHeight: '100vh', padding: '20px' }}>
        <h2>Theme Switcher App</h2>
        <button onClick={toggle}>Toggle Theme</button>
        <br/><br/>
        <Navbar />
        <Card />
      </div>
    </ThemeContext.Provider>
  );
}
