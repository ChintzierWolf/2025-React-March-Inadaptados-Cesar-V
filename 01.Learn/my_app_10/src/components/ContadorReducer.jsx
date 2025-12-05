import useContadorReducer from "../hooks/useContadorReducer";

function ContadorReducer() {
    const { contador, incrementar, decrementar, reiniciar } = useContadorReducer(10);
    
    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px'}}>
            <h2>Contador {Reducer} : {contador}</h2>
            <button onClick={incrementar}> Aumentar + </button>
            <button onClick={decrementar}> Disminuir - </button>
            <button onClick={() => reiniciar(0)}> Reiniciar 0 </button>
        </div>
    );
}

export default ContadorReducer;
