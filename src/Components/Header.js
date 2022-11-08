import { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Contexto from "../Context/Contexto";
import { fs } from "../Services/Firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
export default function Header(props) {
  const {
    desconectar,
    user,
    actualizarEstado,
    estadoAdmin,
    modoAdmin,
    EliminarCarrito,
  } = useContext(Contexto);

  const [Carrito, setCarrito] = useState([]);
  const [Pagar, setPagar] = useState("");

  const Total = () => {
    var sumar = 0;
    Carrito.forEach(function (numero) {
      sumar += numero["Total"];
    });
    setPagar(sumar);
    console.log(Pagar);
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

  useEffect(() => {
    const colRef = collection(fs, "Carrito");
    const q = query(colRef);
    const mostrarDatos = onSnapshot(q, (querysnapshot) => {
      const docs = [];
      querysnapshot.forEach((productos) => {
        docs.push({ ...productos.data(), id: productos.id });
      });
      console.log(docs);
      setCarrito(docs);
    });
  }, []);

  useEffect(() => {
    Total();
  });

  const Prueba = (id) => {
    EliminarCarrito(id);
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
            <Nav className="me-auto">
              <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                <input
                  type="search"
                  className="form-control form-control-dark "
                  placeholder="Buscar Producto..."
                  aria-label="Buscar"
                />
              </form>
            </Nav>
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
                      >
                        <i className="fa-solid fa-cart-shopping"></i>
                        {"   "}Carrito
                        <span class="badge bg-primary rounded-pill"></span>
                      </a>
                      {/* Esta es la lista dentro del dropdown */}
                      <ul
                        className="dropdown-menu dropdown-menu-dark "
                        aria-labelledby="navbarDarkDropdownMenuLink"
                      >
                        <div className="overflow-auto ">
                          {Carrito.map((producto) => (
                            <div key={producto.ProductoId}>
                              <div>
                                <div
                                  className="card mb-1 "
                                  style={{ width: "400px", height: "105px" }}
                                >
                                  <div className="row g-0">
                                    <div className="col-md-4">
                                      <img
                                        src={producto.Foto}
                                        style={{ height: "100px" }}
                                        className="img-fluid rounded-start"
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
                                        <a type="button">
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
                        </div>

                        <div>
                          <Nav.Link href="" className="btn btn-success">
                            <i className="fa-solid fa-money-check-dollar"></i>
                            {"   "}Realizar Pago {" || "} Total : $ {Pagar}
                          </Nav.Link>
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
