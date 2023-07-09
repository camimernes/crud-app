import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "./Alerta";

function AltaRegistro() {
  const [title, setTitle] = useState("");
  const [idUser, setIdUser] = useState(0);
  const [completed, setCompleted] = useState("");
  const [alerta, setAlerta] = useState(false);
  const [estado, setEstado] = useState("");

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
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
        .then((json) =>
          navigate("/", {
            state: {
              id: json.id,
              title: title,
              completed: completed,
              userId: idUser,
              type: "alta",
            },
          })
        );
      setAlerta(true);
      setEstado("success");
    } catch (error) {
      setAlerta(true);
      setEstado("error");
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
            setEstado("error");
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();

  return (
    <>
      <p className="h2">Alta de Registro</p>
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="needs-validation w-auto p-3 "
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
                    value={idUser}
                    onChange={(event) => {
                      setIdUser(event.target.value);
                    }}
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
                    value={title}
                    required
                    onChange={(event) => validateTitle(event.target.value)}
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
                    value={completed}
                    onChange={(event) => {
                      setCompleted(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="text-left">
              <button type="submit" className="btn btn-success m-2">
                Guardar
              </button>

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

export default AltaRegistro;
