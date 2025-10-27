import { useState } from "react";

function SimpleForm() {
    //const [nombre, setNombre] = useState('');
    //const [email, setEmail] = useState('');
    const [formulario, setFormulario] = useState({
        nombre:"",
        email:""
    });

    const [error, setError] = useState("");
    const [isSave, setIsSave] = useState(false);

    const manejarEnvio = (e) => {
        e.preventDefault();
        /* El preventDefault impide que se elabore el evento que está asociado a un botón varias veces
            para que la funcionalidad se ejecuté una sola vez */
        //console.log("Nombre:", nombre);
        //console.log("Email:", email);
        if (!formulario.nombre || !formulario.email){
            setError("Todos los campos son obligatorios");
            setIsSave(false);
            return;
        }

        if(!formulario.email.includes("@")){
            setError("El corrreo no es válido");
            setIsSave(false);
            return;
        }

        setIsSave (true);
        setError("");
        console.log("Formulario enviado");
    }

    const manejarCambio = (e) => {
        console.log(e.target.name,":", e.target.value);
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value,
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