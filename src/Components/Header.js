import React, { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import ContextoAuth from "../Context/Contexto";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Pagar: "",
      CarritoCant: "",
      Usuario: "",
    };
  }

  componentDidMount() {
    this.Total();
  }

  Total = () => {
    const { Carrito } = this.context;
    let sumar = 0;
    let CantidadItem = 0;

    Carrito.forEach((numero) => {
      sumar += numero["Total"];
      CantidadItem += numero["Cantidad"];
    });

    this.setState({
      Pagar: sumar,
      CarritoCant: CantidadItem,
    });
  };

  desconectarseUser = async (e) => {
    e.preventDefault();
    const { user, actualizarEstado, modoAdmin, desconectar } = this.context;

    if (user) {
      const estado = false;
      const email = user.email;
      console.log("Desconectando " + user.email);

      await actualizarEstado(email, estado);
      modoAdmin(email, estado);

      desconectar()
        .then(() => {
          console.log("Desconexión exitosa");
        })
        .catch((error) => {
          console.error("Error al desconectar:", error.message);
        });
    }
  };

  ListaCarrito = async () => {
    const { lstCarritoUser } = this.context;
    const { Usuario } = this.state;
    await lstCarritoUser(Usuario);
  };

  ElimnarCarri = (id) => {
    const { EliminarCarrito } = this.context;
    const { Usuario } = this.state;
    EliminarCarrito(id, Usuario);
  };

  render() {
    const { user, estadoAdmin } = this.context;
    const { Pagar, CarritoCant } = this.state;

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
                            this.ListaCarrito();
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
                        <ul
                          className="dropdown-menu dropdown-menu-dark "
                          aria-labelledby="navbarDarkDropdownMenuLink"
                        >
                          <div className="overflow-auto ">
                            {user ? (
                              <>
                                {this.context.Carrito.map((producto, index) => (
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
                                                  this.ElimnarCarri(producto.id)
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
                      </li>
                    </ul>
                  </Nav>
                )}

                {estadoAdmin ? (
                  <Nav>
                    <ul className="navbar-nav  ">
                      <li className="nav-item dropdown ">
                        <a
                          className="nav-link dropdown-toggle text-info"
                          href="#"
                          id="navbarDarkDropdownMenuLink"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fa-solid fa-user-gear text-info"></i>
                          {"   "}Administrador
                        </a>
                        <ul
                          className="dropdown-menu dropdown-menu-dark text-center bg-grey-700"
                          aria-labelledby="navbarDarkDropdownMenuLink"
                        >
                          <Nav.Link href="/Productos" className="dropdown-item text-info">
                            {" "}
                            Alta de Producto
                          </Nav.Link>
                          <Nav.Link href="/Clientes" className="dropdown-item  text-info">
                            {" "}
                            Gestion de Cuentas (Clientes)
                          </Nav.Link>

                          <Nav.Link href="/" className="dropdown-item text-info">
                            {" "}
                            Mensajeria
                          </Nav.Link>
                          <Nav.Link href="/" className="dropdown-item text-info">
                            {" "}
                            Configuracion
                          </Nav.Link>
                        </ul>
                      </li>
                    </ul>
                  </Nav>
                ) : (
                  <p></p>
                )}

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
                  <Nav.Link href="/Login" onClick={this.desconectarseUser}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    {"   "}Logout
                  </Nav.Link>
                ) : (
                  <p>{""}</p>
                )}
              </Nav>
              <Nav>
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
}

Header.contextType = ContextoAuth;

export default Header;
