import { useState } from "react";

function Conditional() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            {isLoggedIn ?
                <p>Bienvenido, usuario</p> :
                <button onClick={(e) => { setIsLoggedIn(!isLoggedIn) }}>Iniciar</button>
                // el estado isLoggedIn es un booleano que se inicializa en false
                // el boton llama a la funcion setIsLoggedIn que recibe el valor contrario de isLoggedIn
                // es decir, si isLoggedIn es false, setIsLoggedIn(true) y viceversa
                // el operador ? es el operador ternario
                // es decir, si isLoggedIn es true, se renderiza <p>Bienvenido, usuario</p>, si no, se renderiza 
                // <button onClick={(e) => { setIsLoggedIn(!isLoggedIn) }}>Iniciar</button>
            }
        </div>
    );
}

export default Conditional;