import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";

function PantallaInicial(props) {
  const [lista, setLista] = useState([]);
  const [listaFiltrada, setListaFiltrada] = useState([])
  let navigate = useNavigate();
  const location = useLocation();
  const [modalEliminar, setModalEliminar] = useState(false);
  const [registro, setRegistro] = useState({
    userId: "",
    id: "",
    title: "",
    completed: false,
  });

  
  useEffect(() => {
    setLista(props.registers);
    if (location.state) {
      if (location.state.type === "modificacion") {
         actualizacion(props.registers)
      } else {
        creacion();
      }
    } else {
      navigate(location.pathname, {});
    }
  }, [props.registers, location.state]);


  const altaRegistro = () => {
    navigate("/alta");
  };

  const seleccionarRegistro = (item, caso) => {
    setRegistro(item);
    caso === "Editar"
      ? navigate("/editar", {
          state: { item },
        })
      : setModalEliminar(true);
  };

  const eliminar = () => {
    setLista(lista.filter((item) => item.id !== registro.id));
    setModalEliminar(false);
  };

  const creacion = () => {
    setLista(props.registers);
    var newData = location.state;
    setLista((currentList) => currentList.concat(newData));
  }

  const actualizacion = (lista) => {
    var dataNueva = lista;
    dataNueva.map((item) => {
      if (item.id === location.state.id) {
        item.title = location.state.title;
        item.completed = location.state.completed;
        item.userId = location.state.userId;
      }
    });
  };


  const changeOption = (event) => {
    if(event.target.value !== 'todos'){
      var result = lista.filter(item => item.completed.toString() === event.target.value);
      setListaFiltrada(result)
    }else{
      setListaFiltrada([])
      setLista(props.registers) 
    }
  }


  return (
    <>
      <div className="container">
        <p className="h2 m-2">Registros</p>
        <div class="row">
          <div class="col">
          <button
              type="button"
              className="btn btn-success"
              onClick={altaRegistro}
            >Crear registro
            </button>
          </div>
          <div class="col">
          <select className="custom-select w-50 m-2" onChange={changeOption}>
              <option selected value={"todos"}>
                Todos
              </option>
              <option value={"true"}>Completo</option>
              <option value={"false"}>No completo</option>
            </select>         
          </div>
        </div>
        <div className="table-responsive-sm">
          <table className="table table-bordered">
            <thead class="table-info">
              <tr>
                <th scope="col">User Id</th>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Completed</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {(listaFiltrada.length > 0 ? listaFiltrada : lista).map(
                (item, index) => (
                  <tr
                    key={index}
                    className={item.completed === false ? "table-warning" : ""}
                  >
                    <th scope="row">{item.userId}</th>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.completed.toString()}</td>
                    <td>
                      <button
                        className="btn bg-info text-white"
                        onClick={() => seleccionarRegistro(item, "Editar")}
                      >
                        <i class="bi bi-pencil-square"></i>
                      </button>{" "}
                      {"   "}
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-toggle="modal"
                        data-target="#myModal"
                        onClick={() => seleccionarRegistro(item, "Eliminar")}
                      ><i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          {modalEliminar && (
            <div id="myModal" className="modal fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Eliminar Registro</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>
                      Estás Seguro que deseas eliminar el registro{" "}
                      {registro && registro.id}
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      data-dismiss="modal"
                      className="btn btn-danger"
                      onClick={() => eliminar()}
                    >
                      Sí
                    </button>
                    <button
                      data-dismiss="modal"
                      className="btn btn-secondary"
                      onClick={() => setModalEliminar(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PantallaInicial;
