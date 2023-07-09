import React, { useEffect, useState } from "react";


function Alerta(props){
  const [message, setMessage] = useState('')
  const [color, setColor] = useState('')


  useEffect(() => {
    if(props.estado.toString() === 'success'){
        setMessage('El registro se creó correctamente')
        setColor('alert alert-success')
    }
    if(props.estado.toString() === 'error'){
        setMessage('Error al crear el registro')
        setColor('alert alert-danger')
    }
    if(props.estado.toString() === 'modifiedSuccess'){
        setMessage('El registro se actualizó correctamente')
        setColor('alert alert-success')
    }
    if(props.estado.toString() === 'modifiedError'){
        setMessage('Error al actualizar el registro')
        setColor('alert alert-danger')
    }

 }, [props.estado]);

console.log(props)
  return (
    <div>
      <div className={`${color} ${"fixed-bottom position-absolute w-25 p-3 m-5"}`} role="alert">
      <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          {message}
          
        </div>
    </div>
  );
}

export default Alerta;