import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Alerta from "./Alerta";

function ModificacionRegistro() {
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [idUser, setIdUser] = useState(0);
  const [completed, setCompleted] = useState("");
  const [registro, setRegistro] = useState({
    userId: "",
    id: "",
    title: "",
    completed: false,
  });
  let navigate = useNavigate();
  const [alerta, setAlerta] = useState(false);
  const [estado, setEstado] = useState("");

  useEffect(() => {
    if (location) {
      setRegistro(location.state.item);
    }
  }, [location]);

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "PUT",
        body: JSON.stringify({
          title: title,
          completed: completed,
          userId: idUser,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then(() =>
          navigate("/", {
            state: {
              id: registro.id,
              title: registro.title,
              completed: registro.completed,
              userId: registro.userId,
              type: "modificacion",
            },
          })
        );

      setAlerta(true);
      setEstado("modifiedSuccess");
    } catch (error) {
      setAlerta(true);
      setEstado("modifiedError");
    }
  };

  const regresar = () => {
    navigate("/");
  };

  //TODO: mensaje de error que sea solo texto
  const validateTitle = (value) => {
    setTitle(value);
    if (typeof value !== "undefined") {
      if (!value.match(/^[a-zA-Z]+$/)) {
        console.log("solo texto");
      }
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRegistro((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  (function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            setAlerta(true);
            setEstado("modifiedError");
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();

  return (
    <>
      <p className="h2">Modificación de Registro</p>
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="needs-validation w-auto p-3"
          noValidate
        >
          <div className="container mt-2">
            <div className="text-left">
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">User Id</label>
                <div className="col-sm-2 col-md-3 col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    id="userId"
                    value={registro.userId}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Title</label>
                <div className="col-sm-2 col-md-3 col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={registro.title}
                    required
                    onChange={(event) => handleChange(event)}
                  />
                  <div className="invalid-feedback" id="error">
                    Inserte un titulo
                  </div>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Completed</label>
                <div className="col-sm-2 col-md-3 col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    id="completed"
                    value={registro.completed}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
              </div>
            </div>
            <div className="text-left">
              <button className="btn btn-success m-2">Guardar</button>

              <button
                type="button"
                className="btn btn-secondary m-2"
                onClick={regresar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
      {alerta && <Alerta alerta={alerta} estado={estado} />}
    </>
  );
}

export default ModificacionRegistro;
