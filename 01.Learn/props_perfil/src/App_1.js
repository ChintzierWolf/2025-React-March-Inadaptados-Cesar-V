import PropTypes from 'prop-types';

function Perfil ({ nombre, edad }){
    return <p>{nombre} tiene {edad} años</p>;
}

Perfil.propTypes = {
    nombre: PropTypes.string.isRequired,
    edad: PropTypes.number,
};

// Uso incorrecto
// <Perfil nombre={true} edad="veinte"/>
// dentro del código no se va a poder renderizar correctamente la información