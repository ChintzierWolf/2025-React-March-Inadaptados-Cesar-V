import { useEffect, useState } from "react";

const FAKE_WEATHER_DB = 
{
    aguascalientes:{
        temp:26,
        condition:"Soleado",
        humidity: 30,
    },

    guadalajara:{
        temp:24,
        condition:"Parcialmente nublado",
        humidity: 40,
    },

    monterrey:{
        temp:45,
        condition:"Calor seco",
        humidity: 20,
    },
}

export default function WeatherCard({ city }){
    // kas tres variables necesarias para que pueda renderizar de manera más efectiva la función
    // con el estado, el error y el loading del componente

    const [data, setData ] = useState(null);
    const [loading, setLoading ] = useState(false);
    const [error, setError ] = useState(null);

    // const [status, setStatus ] = useState("loading"); // "loading" || "ready" || "error"
    // en todo caso de funcionalidad se debe de tener nuevamente el conocimiento de la presencia de un error,
    // una confirmación y un cargando

    useEffect (() => {
        setLoading(true);
        const timeOutId = setTimeout (() => {
            const info = FAKE_WEATHER_DB[city.toLowerCase()];
            if (info){
                setData(info);
                setLoading(false);
            } else {
                setError("Error, la ciudad no existe en la BD");
                setLoading(false);
            }
        }, 2000);

        return () => clearTimeout(timeOutId);

    }, [data]);
    // Ls propiedades no cambian
    // Los estados de las variables, si

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const cardStyle = {
        background: "#ffff",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "1rem",
        marginBottom: "1rem",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    };

    return (
    data && (<div style={cardStyle}>
        <h2>{city}</h2>
        <p><strong>{data.temp} °C </strong> - {data.condition}</p>
        <p>Húmedad: {data.humidity}</p>
    </div>)
    );
}