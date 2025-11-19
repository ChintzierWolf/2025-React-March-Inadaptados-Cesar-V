import { useState } from "react";
import WeatherCard from "./WeatherCard";

function App() {
  const [cityInput, setCityInput] = useState("");
  const [cities, setCities] = useState([]);

  function handleAddCity(e) {
    e.preventDefault();
    // la funcino preventDefault previene que exista más de una captura del valor con el botón, se congela hasta que la acción termine
    const trimmed = cityInput.trim();
    if (!trimmed) return;
    // trim elimina los espacios existentes de cada una de las cadenas que se entregan dentro del input

    if(cities.includes(trimmed.toLowerCase())) return;

    setCities([...cities, trimmed.toLowerCase()]);
    // los tres puntos, elaboran ina acción donde se duplica el valor de cities o la variable y se le adiciona el nuevo valor aparte
    // es como el +=, a = 1, b = a + 1 => b = 1 + 1
    setCityInput("");
    // Después de agregar la entrada del textbox, se está mandado el valor vacío para que el text vuelva a aparecer de manera inicial, vacío
  }

  function handleRemove(cityToRemove) {
    setCities(cities.filter((c) => c !== cityToRemove ));
  }
  return (
    <div style={{ fontFamily: "sans-serif", padding:"2rem" }}>
      <h1>Mi DashBoard del Clima</h1>
      <p>Busca una ciudad y guárdala en tu lista</p>
      <form onSubmit={handleAddCity} style={{marginButtom: "1rem "}}>
        <input type="text" value={cityInput} onChange={(e) => {setCityInput(e.target.value)}}></input>
        <button type="submit">Agregar Ciudad</button>
      </form>
      {/* Render de tarjetas */}
      {cities.length  === 0 ? <p>Todavía no hay ciudades guaradadas</p> : (cities.map((city) => {
        return <div hey = {city} >
          <button onClick={() => handleRemove(city)}> X </button>
          <WeatherCard city = {city}/>
        </div>
      }))}
    </div>);
}

export default App;