import { useState } from "react";

function SimpleForm() {
    //const [nombre, setNombre] = useState('');
    //const [email, setEmail] = useState('');
    const [formulario, setFormulario] = useState({
        nombre:"",
        email:""
    });

    const [isSave, setIsSave] = useState(false)

    const manejarEnvio = (e) => {
        e.preventDefault();
        //console.log("Nombre:", nombre);
        //console.log("Email:", email);
        console.log("FormData: ", formulario);
        setIsSave (true);
    }

    const manejarCambio = (e) => {
        console.log(e.target.name,":", e.target.value);
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <form onSubmit={manejarEnvio}>
            <label>
                Nombre:
                {/*<input type="text" value={nombre} onChange={(e)=>{setNombre(e.target.value)}}/>*/}
                <input name="nombre" type="text" value={formulario.nombre} onChange={manejarCambio}/>
            </label>
            <label>
                Email:
                {/*<input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>*/}
                <input name="email" type="text" value={formulario.email} onChange={manejarCambio}/>
            </label>

            <button type="submit">Enivar</button>

            {isSave && <p>Hola, {formulario.nombre}. Te enviaremos en breve información a {formulario.email}</p>}

            </form>
    );
}

export default SimpleForm;