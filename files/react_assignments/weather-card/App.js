import React from "react";

function WeatherCard({ city, temp, condition, humidity }) {
  let bgColor = "lightgray";
  if (condition === "Sunny") bgColor = "lightyellow";
  if (condition === "Rainy") bgColor = "lightblue";
  if (condition === "Cloudy") bgColor = "lightgray";

  return (
    <div style={{ backgroundColor: bgColor, padding: "20px", border: "1px solid black", width: "200px" }}>
      <h2>{city}</h2>
      <h1>{temp}°C</h1>
      <p>Condition: {condition}</p>
      <p>Humidity: {humidity}%</p>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Weather Dashboard</h2>
      <WeatherCard city="Mumbai" temp={32} condition="Sunny" humidity={60} />
      <br/>
      <WeatherCard city="London" temp={15} condition="Rainy" humidity={80} />
    </div>
  );
}
