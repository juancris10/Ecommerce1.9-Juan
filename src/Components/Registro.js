import React, { Component } from "react";
import { Col, Row, Container, Card, Nav } from "react-bootstrap";
import "../Assets/css/Registro.css";
import ContextoAuth from "../Context/Contexto";

class Registro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      apellido: "",
      numeroTel: "",
      email: "",
      password: "",
    };

    this.navigate = props.useNavigate; // Asegúrate de que useNavigate esté siendo pasado correctamente
    // this.context = ContextoAuth; // No es necesario asignar this.context aquí
  }

  registrarUsuario = async (e) => {
    e.preventDefault();
    const { regUsuario, regUserDatos } = this.context; // Accede al contexto usando this.context
    const { email, password, nombre, numeroTel, apellido } = this.state;

    const estado = true;
    await regUsuario(email, password);
    await regUserDatos(nombre, numeroTel, email, estado, apellido);
    this.navigate("/");
  };

  render() {
    return (
      <ContextoAuth.Consumer>
        {(context) => {
          this.context = context; // Asigna el contexto proporcionado al this.context
          return (
            <Container>
              <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                  <div className="border border-3 border-primary"></div>
                  <Card className="shadow fondoBackground">
                    <Card.Body>
                      <div className="modal-header">
                        <h5 className="modal-title">
                          ¡Crea una Cuenta en Autoservicio Libertad!
                        </h5>
                      </div>
                      <br></br>
                      <div className="modal-body">
                        <div className="form-group">
                          <label>Nombre</label>
                          <input
                            type="text"
                            className="form-control"
                            required={true}
                            onChange={(ev) =>
                              this.setState({ nombre: ev.target.value })
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label>Apellido</label>
                          <input
                            type="text"
                            className="form-control"
                            required={true}
                            onChange={(ev) =>
                              this.setState({ apellido: ev.target.value })
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label>Número Telefono</label>
                          <input
                            type="text"
                            className="form-control"
                            required={true}
                            onChange={(ev) =>
                              this.setState({ numeroTel: ev.target.value })
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            required={true}
                            onChange={(ev) =>
                              this.setState({ email: ev.target.value })
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label>Contraseña</label>
                          <input
                            type="password"
                            className="form-control"
                            required={true}
                            onChange={(ev) =>
                              this.setState({ password: ev.target.value })
                            }
                          />
                        </div>
                      </div>
                      <br></br>
                      <div className="modal-footer">
                        <Nav.Link href="/">
                          <input
                            type="button"
                            className="btn btn-default"
                            data-dismiss="modal"
                            value="Volver"
                          />
                        </Nav.Link>
                        <input
                          type="submit"
                          className="btn btn-success"
                          value="Registrar"
                          onClick={this.registrarUsuario}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          );
        }}
      </ContextoAuth.Consumer>
    );
  }
}

export default Registro;

