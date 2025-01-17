import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //Crear State de citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    //State citas
    const [error, actualizarError] = useState(false)

    //Función que se ejecuta al escribir input
    const actualizarState = e =>{
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        });
    }

    //Extraer los valores
    const { mascota, propietario , fecha, hora, sintomas} = cita;

    //Envío de formulario
    const submitCita = e => {
        e.preventDefault();

        //Validar
        if(mascota.trim() === '' || propietario.trim() === ''  || fecha.trim() === ''  || hora.trim() === ''  || sintomas.trim() === '' ){
            actualizarError(true);
            return;
        }
        actualizarError(false);

        //Asignar un ID
        cita.id = uuid();

        //Crear cita
        crearCita(cita);

        //Reinicar form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return (          
        <Fragment>
        <h2>Crear Cita</h2>
        { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
        <form
            onSubmit={submitCita}
        >
            <label htmlFor="mascota">Nombre de Mascota</label>
            <input
                id="mascota"
                type="text"
                name="mascota"
                className="u-full-width"
                placeholder="Nombre"
                onChange={actualizarState}
                value={mascota}
            />
            <label htmlFor="propietario">Nombre Dueño</label>
            <input 
                id="propietario"
                type="text"
                name="propietario"
                className="u-full-width"
                placeholder="Nombre Dueño de la mascota"
                onChange={actualizarState}
                value={propietario}

            />

            <label htmlFor="fecha">Fecha</label>
            <input 
                id="fecha"
                type="date"
                name="fecha"
                className="u-full-width"
                onChange={actualizarState}
                value={fecha}
            />

            <label htmlFor="hora">Hora</label>
            <input 
                id="hora"
                type="time"
                name="hora"
                className="u-full-width"
                onChange={actualizarState}
                value={hora}
            />

            <label htmlFor="sintomas">Síntomas</label>
            <textarea
                id="sintomas"
                className="u-full-width"
                name="sintomas"
                onChange={actualizarState}
                value={sintomas}            
            ></textarea>   

            <button
                type="submit"
                className="u-full-width button-primary"
            >Agregar Cita</button>                     
            
        </form>    

        </Fragment>
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

 
export default Formulario;