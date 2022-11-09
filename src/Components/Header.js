import { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Contexto from "../Context/Contexto";
export default function Header(props) {
  const {
    desconectar,
    user,
    actualizarEstado,
    estadoAdmin,
    modoAdmin,
    EliminarCarrito,
    Carrito,
    lstCarritoUser,
  } = useContext(Contexto);

  const [Pagar, setPagar] = useState("");
  const [CarritoCant, setCarritoCant] = useState("");

  try {
    var Usuario = user.email;
  } catch (error) {
  }

  const Total = () => {
    var sumar = 0;
    var CantidadItem = 0;
    Carrito.forEach(function (numero) {
      sumar += numero["Total"];
      CantidadItem += numero["Cantidad"];
    });
    setPagar(sumar);
    setCarritoCant(CantidadItem);
  };

  const desconectarseUser = async (e) => {
    e.preventDefault();
    if (user) {
      const estado = false;
      const email = user.email;
      console.log("desconenctando " + user.email);
      await actualizarEstado(email, estado);
      modoAdmin(email, estado);
      desconectar();
    }
  };

  const ListaCarrito = async () => {
    await lstCarritoUser(Usuario);
  };

  useEffect(() => {
    Total();
  });

  const ElimnarCarri = (id) => {
    EliminarCarrito(id, Usuario);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <i className="fa-brands fa-shopify"></i> Autoservicio Libertad
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            {/* Carrito */}
            <Nav>
              {estadoAdmin ? (
                <p></p>
              ) : (
                <Nav>
                  <ul className="navbar-nav ">
                    <li className="nav-item dropdown ">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDarkDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        onClick={() => {
                          ListaCarrito();
                        }}
                      >
                        <i className="fa-solid fa-cart-shopping"></i>
                        {"   "}Carrito
                        {user ? (
                          <span className="badge bg-primary rounded-pill">
                            {CarritoCant}
                          </span>
                        ) : (
                          <span className="badge bg-primary rounded-pill">0</span>
                        )}
                      </a>
                      {/* Esta es la lista dentro del dropdown */}
                      <ul
                        className="dropdown-menu dropdown-menu-dark "
                        aria-labelledby="navbarDarkDropdownMenuLink"
                      >
                        <div className="overflow-auto ">
                          {user ? (
                            <>
                              {Carrito.map((producto, index) => (
                                <div key={index}>
                                  <div>
                                    <div
                                      className="card mb-1 "
                                      style={{
                                        width: "400px",
                                        height: "105px",
                                      }}
                                    >
                                      <div className="row g-0">
                                        <div className="col-md-4">
                                          <img
                                            src={producto.Foto}
                                            style={{
                                              height: "105px",
                                              width: "110px",
                                            }}
                                            className="  img-fluid rounded-start"
                                            alt="..."
                                          />
                                        </div>
                                        <div className="col-md-8">
                                          <div className="card-body ">
                                            <h5 className="card-title ">
                                              {producto.Nombre} x{" "}
                                              {producto.Cantidad}
                                            </h5>
                                            <p className="card-text">
                                              <small className="">
                                                {" "}
                                                Precio por Unidad: ${" "}
                                                {producto.PrecioUnitario}
                                              </small>
                                            </p>
                                            <a
                                              type="button"
                                              onClick={() =>
                                                ElimnarCarri(producto.id)
                                              }
                                            >
                                              <i
                                                className="material-icons text-dark p-2 position-absolute top-0 end-0  "
                                                data-toggle="tooltip"
                                                title="Delete"
                                              >
                                                &#xE872;
                                              </i>
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </>
                          ) : (
                            <h1></h1>
                          )}
                        </div>

                        <div>
                          {user ? (
                            <Nav.Link href="" className="btn btn-success">
                              <i className="fa-solid fa-money-check-dollar"></i>
                              {"   "}Realizar Pago {" || "} : Total ${Pagar}
                            </Nav.Link>
                          ) : (
                            <Nav.Link href="/Login" className="btn btn-success">
                              Su carrito esta Vacio!
                              <br></br>
                              Inicie Sesion
                            </Nav.Link>
                          )}
                        </div>
                      </ul>
                      {/* Esta es la lista dentro del dropdown */}
                    </li>
                  </ul>
                </Nav>
              )}

              {estadoAdmin ? (
                <Nav>
                  <ul className="navbar-nav ">
                    <li className="nav-item dropdown ">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDarkDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa-solid fa-user-gear"></i>
                        {"   "}Administrador
                      </a>
                      {/* Esta es la lista dentro del dropdown */}
                      <ul
                        className="dropdown-menu dropdown-menu-dark text-center"
                        aria-labelledby="navbarDarkDropdownMenuLink"
                      >
                        <Nav.Link href="/Productos" className="dropdown-item">
                          {" "}
                          Alta de Producto
                        </Nav.Link>
                        <Nav.Link href="/Clientes" className="dropdown-item">
                          {" "}
                          Gestion de Cuentas (Clientes)
                        </Nav.Link>
                        <Nav.Link href="/" className="dropdown-item">
                          {" "}
                          Mensajeria
                        </Nav.Link>
                        <Nav.Link href="/" className="dropdown-item">
                          {" "}
                          Configuracion
                        </Nav.Link>
                      </ul>
                      {/* Esta es la lista dentro del dropdown */}
                    </li>
                  </ul>
                </Nav>
              ) : (
                <p></p>
              )}

              {/* <Nav.Link href="#verCarrito"><i className="fa-solid fa-cart-shopping"></i>{'   '}Carrito</Nav.Link> */}
              {estadoAdmin ? (
                <p></p>
              ) : (
                <Nav.Link href="/">
                  <i className="fa-solid fa-headset"></i>
                  {"   "}Soporte
                </Nav.Link>
              )}
              {user ? (
                <Nav.Link href="/">
                  <i className="fa-solid fa-house"></i> {user.email}
                </Nav.Link>
              ) : (
                <Nav.Link
                  href="#addCuentaModal"
                  className="btn btn-success"
                  data-toggle="modal"
                >
                  <i className="fa-regular fa-user"></i>
                  {"   "}Mi Cuenta
                </Nav.Link>
              )}
              {user ? (
                <Nav.Link href="/" onClick={desconectarseUser}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  {"   "}Logout
                </Nav.Link>
              ) : (
                <p>{""}</p>
              )}
            </Nav>
            <Nav>
              {/* <!-- Añadir cuenta --> */}
              <div id="addCuentaModal" className="modal fade">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div>
                      <div className="modal-header">
                        <h5 className="modal-title">
                          ¡Bienvenido a Autoservicio Libertad!
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-hidden="true"
                        >
                          &times;
                        </button>
                      </div>
                      <div className="modal-body mt-2 mb-2 text-center">
                        <p className="text-dark">
                          <strong>
                            Escoja una opcion para iniciar su Compra
                          </strong>
                        </p>
                        <div className="form-group">
                          <label>¿Todavia no tienes una Cuenta? </label>
                          <Nav.Link href="/Registro">
                            <input
                              type="submit"
                              className="btn btn-dark"
                              value="Registrarse"
                            />
                          </Nav.Link>
                          <label>¿Tienes una Cuenta? </label>
                          <Nav.Link href="/Login">
                            <input
                              type="submit"
                              className="btn btn-dark"
                              value="Ingresar/Logearse"
                            />
                          </Nav.Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
