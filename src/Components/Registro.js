import { Col, Button, Row, Container, Card, Form,Nav } from "react-bootstrap";
import "../Assets/css/Registro.css"
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import Contexto from "../Context/Contexto";



export default function Registro(){
    const navigate = useNavigate();
    const {regUsuario,regUserDatos} = useContext(Contexto);
    const [ nombre, setNombre] = useState("");
    const [ apellido, setApellido] = useState("");
    const [ numeroTel, setNumeroTel] = useState("");
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");


    const registrarUsuario = async (e) =>{
        e.preventDefault();
        const estado = true;
        await regUsuario(email,password);
        await regUserDatos(nombre,numeroTel,email,estado,apellido);
        navigate("/");
    }


    return(
        <>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow fondoBackground">
                            <Card.Body>
                                <div className="modal-header">						
                                    <h5 className="modal-title">¡Crea una Cuenta en Autoservicio Libertad!</h5>
                                </div>
                                <br></br>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <input type="text" className="form-control" required onChange={(ev)=> setNombre(ev.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Apellido</label>
                                        <input type="text" className="form-control" required onChange={(ev)=> setApellido(ev.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Número Telefono</label>
                                        <input type="text" className="form-control" required onChange={(ev)=> setNumeroTel(ev.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="form-control" required onChange={(ev)=> setEmail(ev.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Contraseña</label>
                                        <input type="password" className="form-control" required onChange={(ev)=> setPassword(ev.target.value)}/>
                                    </div>
                                </div>
                                <br></br>
                                <div className="modal-footer">
                                    <Nav.Link href="/"><input type="button" className="btn btn-default" data-dismiss="modal" value="Volver" /></Nav.Link>
                                    <input type="submit" className="btn btn-success" value="Registrar" onClick={registrarUsuario}/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}