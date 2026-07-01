import { useState } from "react";

function SimpleForm() {
    //const [nombre, setNombre] = useState('');
    //const [email, setEmail] = useState('');
    const [formulario, setFormulario] = useState({
        // Inicializamos el estado del formulario con un objeto que contiene los campos nombre y email
        nombre:"",
        email:""
    });

    const [error, setError] = useState("");
    // Estado para almacenar mensajes de error de validación
    // Inicialmente está vacío, lo que indica que no hay errores
    const [isSave, setIsSave] = useState(false);
    // Estado para indicar si el formulario se ha enviado correctamente
    // Inicialmente es false, lo que indica que no se ha enviado

    const manejarEnvio = (e) => {
        e.preventDefault();
        /* El preventDefault impide que se elabore el evento que está asociado a un botón varias veces
            para que la funcionalidad se ejecuté una sola vez */
        //console.log("Nombre:", nombre);
        //console.log("Email:", email);
        if (!formulario.nombre || !formulario.email){
            setError("Todos los campos son obligatorios");
            // Si algún campo está vacío, mostramos un mensaje de error
            // y no marcamos el formulario como enviado
            setIsSave(false);
            // Detenemos la ejecución de la función
            return;
        }

        if(!formulario.email.includes("@")){
            setError("El corrreo no es válido");
            // Si el correo no contiene "@", mostramos un mensaje de error
            // y no marcamos el formulario como enviado
            setIsSave(false);
            return;
        }

        setIsSave (true);
        setError("");
        console.log("Formulario enviado");
    }

    const manejarCambio = (e) => {
        console.log(e.target.name,":", e.target.value);
        // Manejamos los cambios en los campos del formulario
        setFormulario({
            ...formulario,
            // los tres puntos (...) crean una copia del estado actual del formulario
            // esto es importante para no perder los valores de los otros campos
            // Actualizamos el campo correspondiente en el estado del formulario
            [e.target.name]: e.target.value,
            // e.target.name obtiene el nombre del campo que se está modificando
            // e.target.value obtiene el nuevo valor del campo
        });
    }

    return (
        // Contiene la funcionalidad del componente de SimpleForm
        <form onSubmit={manejarEnvio}>
        {/* Se utiliza La etiqueta form de html, que es muy independiente de la función que estamos declarando, va a tener un evento llamado manejarEnvio
            Cuando se utiliza la funcionalidad de tipo Submit, se da a entender que se va a elaborar la función de enviar todo el formulario contenido
            dentro de lo que se acaba de entregar dentro de toda la etiqueta form*/} 
            <label>
                Nombre:
                {/*<input type="text" value={nombre} onChange={(e)=>{
                console.log("nombre onchange:", nombre);
                setNombre(e.target.value)}}/>
                    OnChange, quiere decir que por cada vez que se elabora un cambio, este vuelve a tomar el nuevo valor */}
                <input name="nombre" type="text" value={formulario.nombre} onChange={manejarCambio}/>
            </label>
            <label>
                Email:
                {/*<input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>*/}
                <input name="email" type="text" value={formulario.email} onChange={manejarCambio}/>
            </label>

            <button type="submit">Enivar</button>

            {isSave && <p>Hola, {formulario.nombre}. Te enviaremos en breve información a {formulario.email}</p>}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            </form>
    );
}

export default SimpleForm;