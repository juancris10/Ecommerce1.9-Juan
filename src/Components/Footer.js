import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Footer(){
    
    return(
        <>
            <Navbar collapseOnSelect bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Copyright Grupo 4 2022</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            <Navbar.Brand target="_blank">Puedes Buscarnos en</Navbar.Brand>
                            <Navbar.Brand href="https://www.instagram.com/luciano.rojas.29/" target="_blank"><i className="fa-brands fa-instagram"></i>{' '}</Navbar.Brand>
                            <Navbar.Brand href="/" target="_blank"><i className="fa-brands fa-facebook"></i>{' '}</Navbar.Brand>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}