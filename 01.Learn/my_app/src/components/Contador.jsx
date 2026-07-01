import useContador from "../hooks/useContador";

function Contador (){
    const { contador, incrementar, decrementar, reiniciar } = useContador (5);

    return(
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px'}}>
            <p>Has hecho clic {contador} veces</p>
            <button onClick={incrementar}> Aumentar + </button>
            <button onClick={decrementar}> Disminuir - </button>
            <button onClick={reiniciar}> Reiniciar 0 </button>
        </div>
    );
}

export default Contador;