import { useState } from "react";
import WeatherCard from "./WeatherCard";

function App() {
  const [cityInput, setCityInput] = useState("");
  const [cities, setCities] = useState([]);

  function handleAddCity(e) {
    e.preventDefault();
    const trimmed = cityInput.trim();
    if (!trimmed) return;
    if (cities.includes(trimmed.toLowerCase())) return;

    setCities([...cities, trimmed.toLowerCase()]);
    setCityInput("");
  }

  function handleRemove(cityToRemove) {
    setCities(cities.filter((c) => c !== cityToRemove));
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Mi Dashboard del Clima</h1>
      <p>Busca una ciudad y guárdala en tu lista</p>
      <form onSubmit={handleAddCity} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={cityInput}
          onChange={(e) => {
            setCityInput(e.target.value);
          }}
        ></input>
        <button type="submit">Agregar Ciudad</button>
      </form>
      {/* Render de tarjetas */}
      {cities.length === 0 ? (
        <p>Todavía no hay ciudades guardadas</p>
      ) : (
        cities.map((city) => {
          return (
            <div key={city}>
              <button onClick={() => handleRemove(city)}> X </button>
              <WeatherCard city={city} />
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;
