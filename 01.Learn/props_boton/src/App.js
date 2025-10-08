function boton(props){
    // 1 solución decontruida, ya que se puede agregar la
    // propiedad dentro de una variable y hacer uso de ella
    const { texto, precio} = props
    return <button>{button}{precio}</button>;

    // 2 ejemplo de props sin decontruir
    // return <button>{props.button}{props.precio}</button>;

}

function app() {
    return(
        <div>
            <button texto="Comprar" precio="10"/>
           <button texto="Cancelar" precio="20"/>
        </div>
    );
}

export default App;