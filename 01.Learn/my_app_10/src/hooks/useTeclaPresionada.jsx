import { useEffect, useState } from "react";

function useTeclaPresionada (teclaObjetivo) {
    const [teclaPresionada, setTeclaPresionada] = useState(false);

    useEffect(() => {
        const handleKeydown = (evento) => {
            if (evento.key === teclaObjetivo) {
                setTeclaPresionada(true);
            }
        };

        const alLiberarTecla = (evento) => {
            if (evento.key === teclaObjetivo) {
                setTeclaPresionada(false);
            }
        };

        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('keyup', alLiberarTecla);
    },[teclaObjetivo]);

    return teclaPresionada;
}

export default useTeclaPresionada;