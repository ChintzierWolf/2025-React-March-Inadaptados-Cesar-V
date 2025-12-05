import { useEffect, useState } from "react";
// useEffect nos permite manejar efectos secundarios en componentes funcionales
// como suscripciones, temporizadores, o cambios en el DOM
// useState nos permite agregar estado local a componentes funcionales

function Contador() {
    const [contador, setContador] = useState (0);
    // contador es la variable de estado que almacena el valor actual del contador
    // setContador es la función que nos permite actualizar el valor del contador
    // useState(0) inicializa el contador en 0

    useEffect(() => {
        console.log(`Contador: ${contador}`);
        // este efecto se ejecuta cada vez que el valor de contador cambia
    }, [contador]);
    // el segundo argumento [contador] es una lista de dependencias
    // el efecto solo se ejecuta cuando alguna de las dependencias cambia
    // si dejamos el array vacío [], el efecto solo se ejecuta una vez al montar el componente

    useEffect(()=>{
        const id = setInterval(()=>{
            // este efecto crea un temporizador que imprime "Tic-tac" cada segundo
            console.log("Tic-tac");
        },1000);
        // la función devuelta por useEffect se ejecuta cuando el componente se desmonta
        // aquí limpiamos el temporizador para evitar fugas de memoria

        return()=>{
            clearInterval(id);
            // clearInterval detiene el temporizador usando su id
        };
    }, []);

    return(
        <div>
            <p>Has hecho clic {contador} veces</p>
            <button onClick={()=>{setContador(contador+1)}}> Aumentar </button>
        </div>
    );
}

export default Contador;