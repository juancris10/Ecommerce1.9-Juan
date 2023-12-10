import { useContext, useEffect, useState } from "react";
import Contexto from "../Context/Contexto";

export default function Clientes() {
  const { clientes, lstClientes, EliminarCliente } = useContext(Contexto);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  useEffect(() => {
    lstClientes();
  }, []);

  const handleEliminarCliente = () => {
    if (clienteSeleccionado) {
      EliminarCliente(clienteSeleccionado.id);
      setClienteSeleccionado(null);
    }
  };

  return (
    <>
      <div className="container-xl bg-dark">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="col-sm-6 ">
                <h2>Clientes</h2>
              </div>
              <div className="col-xs-6 h3 bg-transparent">
                <a href="/ " className="btn btn-outline-secondary mt-2 mb-2">
                  <i className="fa-solid fa-left-long"></i>{" "}
                  <span className="text-light">Regresar</span>
                </a>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Nombre y Apellido</th>
                  <th>Email</th>
                  <th>Nro. Telefono</th>
                  <th>Conectado</th>
                  <th>Cuenta Creada (Fecha)</th>
                  <th>Opciones (Eliminar)</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((client) => (
                  <tr key={client.id}>
                    <td>{client.Nombre} {client.Apellido} {client.NombreCompleto}</td>
                    <td>{client.Email}</td>
                    {client.Phone ? (
                      <td>{client.Phone}</td>
                    ) : (
                      <td>Sin Número</td>
                    )}
                    {client.Conectado ? (
                      <td>Conectado</td>
                    ) : (
                      <td>Desconectado</td>
                    )}
                    <td className="text-center">2/11/2022</td>
                    <td className="text-center">
                      <a
                        href="#deleteEmployeeModal"
                        className="delete"
                        data-toggle="modal"
                        onClick={() => setClienteSeleccionado(client)}
                      >
                        <i className="material-icons" data-toggle="tooltip" title="Delete">
                          &#xE872;
                        </i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Eliminar Usuario */}
      <div id="deleteEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Eliminar Cliente</h4>
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar este Cliente?</p>
              <p className="text-warning">
                <small>Esta acción no se puede revertir.</small>
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">
                Cancelar
              </button>
              <button type="button" className="btn btn-danger" onClick={handleEliminarCliente}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
