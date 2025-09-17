const promesa = new Promise ((resolve, reject) =>{
    setTimeout (() =>{
        resolve("Datos recibidos");
    }, 2000);
});

promesa.then ((respuesta) => {
    console.log(respuesta); // Datos recibidos
})
.catch ((error) => {
    console.log(error);
});;