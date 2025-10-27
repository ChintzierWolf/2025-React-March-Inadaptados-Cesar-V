import { useEffect, useState } from "react";

function Contador() {
    const [contador, setContador] = useState (0);

    useEffect(() => {
        console.log(`Contador: ${contador}`);
    }, [contador]);

    useEffect(()=>{
        const id = setInterval(()=>{
            console.log("Tic-tac");
        },1000);

        return()=>{
            clearInterval(id);
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