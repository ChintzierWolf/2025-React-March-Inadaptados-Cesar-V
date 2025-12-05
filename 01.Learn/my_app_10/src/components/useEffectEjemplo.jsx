import { useEffect } from "react";

function Ejemplo() {
    useEffect (()=> {
        //Lo siguiente es una función flecha que se ejecutará en la función UseEffect
        console.log("El componente se montó");

        //Limpieza

        return () => {
            console.log("El componente se desmontó");
        };
    }, []);

    //Dentro del funcionamiento del programa, existe el primer console.log que nos permitirá
    // saber que es lo que acaba de ejecutarse dentro de la función useEffect
    
    // Y una vez que se haya montado el funcionamiento dentro de la lógica del código
    // se podrá ver otra respuesta de como se desmonta, al momento de reiniciar el servidor o la página

    return <p>Hola desde REACT</p>
    // Cuando el valor del estado contador cambia y se pone dentro del valor visible del useEffect
    // cada que ese estado se ejecute va a cambiar el valor fninal del useEffect
    //}, [contador]);
}

export default Ejemplo;