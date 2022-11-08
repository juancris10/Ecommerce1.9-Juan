import { Col, Button, Row, Container, Card, Form,Nav } from "react-bootstrap";
import Contexto from "../Context/Contexto";
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";


export default function Login(){
    const navigate = useNavigate(); 
    const {loginUser,loginGoogle, restartPassword,desconectar,actualizarEstado} = useContext(Contexto);
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ error, setError] = useState();

    
    const logearseUser = async (e) => {
        e.preventDefault();
        try {
            const estado = true;
            await loginUser(email,password);
            console.log("conectado " + email);
            await actualizarEstado(email,estado);
            
            navigate("/");
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                setError("Correo Invaildo");
                } 
            else if (error.code === "auth/weak-password"){
                setError("La contraseña debe tener al menos 6 caracteres "); 
                }
            else if (error.code === "auth/email-already-in-use") {
                    setError("El Correo ya esta en uso");
                } 
            else if (error.code === "auth/user-not-found"){
                      setError("El Nombre de usuario no Existe");
                } 
            else if (error.code === "auth/wrong-password"){
                    setError("La contraseña es Incorrecta");
                } 
            else if(error.code === "auth/too-many-request"){
                    setError("El acceso a esta cuenta a sido inahabilitado, Tienes que cambiar inmediatamente tu contraseña o intentar mas tarde.")
                }
        }
    }

    const logearseGoogle = async () => {
        await loginGoogle();
        navigate("/");
    }

    const recuperarPassword = async (e) => {
        e.preventDefault();
        await restartPassword(email);
        navigate("/");
    }

    return(
        <>
            {/* Login Interfaz*/}
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow fondoBackground">
                            <Card.Body>
                                <div className="modal-header">						
                                    <h5 className="modal-title">¡Ingresa con tu Cuenta!</h5>
                                </div>
                                <br></br>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="form-control" required onChange={(ev)=> setEmail(ev.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Contraseña</label>
                                        <input type="password" className="form-control" required onChange={(ev)=> setPassword(ev.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        {error && <p className="text-danger"><strong>{error}</strong></p>}
                                    </div>
                                    <div className="form-group">
                                        <Nav.Link href="#olvidarContraseña" className="btn btn-default m-2" data-toggle="modal">¿Olvidaste tu Contraseña?</Nav.Link>
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                        <p className="mb-0  text-center text-dark"><strong>Tambien puedes Ingresar por estos Metodos</strong></p>
                                    </div>
                                    <div className="mt-1 mb-0 text-center">
                                        <Button className="m-1 bg-transparent border-light" onClick={logearseGoogle}><i className="fa-brands fa-google"></i></Button>
                                        <Button className="m-1 bg-transparent border-light"><i className="fa-brands fa-github"></i></Button>
                                        <Button className="m-1 bg-transparent border-light"><i className="fa-brands fa-facebook"></i></Button>
                                    </div>
                                </div>
                                <br></br>
                                <div className="modal-footer">
                                    <Nav.Link href="/"><input type="button" className="btn btn-default" data-toggle="modal" value="Volver" /></Nav.Link>
                                    <input type="submit" className="btn btn-success" value="Ingresar" onClick={logearseUser}/>
                                </div> 
                                {/* Olvidar Contraseña Modal Emergente */}
                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <div id="olvidarContraseña" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div>
                                <div className="modal-header">						
                                    <h5 className="modal-title">Recuperacion de Contraseña</h5>
                                    <button type="button" className="close " data-dismiss="modal" aria-hidden="true">&times;</button>
                                </div>
                                <div className="modal-body mt-2 mb-2 text-center">
                                    <p className="text-dark"><strong>Ingrese su Correo Electronico</strong></p>	
                                    <div className="form-group">
                                        <Nav.Link href=""><input type="email" className="form-control mt-2" required onChange={(ev)=> setEmail(ev.target.value)}/></Nav.Link>
                                        <Nav.Link href=""><input type="submit" className="btn btn-dark mt-2" value="Enviar Solicitud" onClick={recuperarPassword}/></Nav.Link>
                                    </div>	
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
        
}