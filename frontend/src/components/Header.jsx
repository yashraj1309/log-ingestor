import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#"><b>LOG INGESTOR</b></Navbar.Brand>
        <p className='mt-1'>Full Stack Application using MERN Stack for Log Management</p>
      </Container>
    </Navbar>
  );
}

export default Header;