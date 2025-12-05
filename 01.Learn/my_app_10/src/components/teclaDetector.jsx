import useTeclaPresionada from "../hooks/useTeclaPresionada";

function TeclaDetector (props) {
    const tecla = useTeclaPresionada(props.tecla);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px'}}>
            <p>{tecla ? `Presionaste la tecla ${props.tecla}` : `Presiona la tecla ${props.tecla}`}</p>
        </div>
    );
}

export default TeclaDetector;