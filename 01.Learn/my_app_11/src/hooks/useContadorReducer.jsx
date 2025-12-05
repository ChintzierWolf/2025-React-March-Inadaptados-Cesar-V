import { useReducer } from "react";

const acciones = {
    INCREMENTAR: "incrementar",
    DECREMENTAR: "decrementar",
    REINICIAR: "reiniciar",
};

function reducer (estado, accion) {
    switch (accion.type) {
        case acciones.INCREMENTAR:
            return { contador: estado.contador + 1 };
        case acciones.DECREMENTAR:
            return { contador: estado.contador - 1 };
        case acciones.REINICIAR:
            return { contador: accion.payload || 0 };
        default:
            return estado;
    }
}

function useContadorReducer(valorIncial = 0){
    const [estado, dispatch] = useReducer(reducer, { contador: valorIncial });
    
    const incrementar = () => dispatch({ type: acciones.INCREMENTAR });
    const decrementar = () => dispatch({ type: acciones.DECREMENTAR });
    const reiniciar = (v = valorIncial) => dispatch({ type: acciones.REINICIAR, payload: v });
    
    return { contador: estado.contador, incrementar, decrementar, reiniciar };
}

export default useContadorReducer;