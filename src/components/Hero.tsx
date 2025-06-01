import artImage from '../assets/art3.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Hero(){
return (
<>
  <Container className="relative w-full h-[90vh]  overflow-hidden mb-30">
    <Row>
      <Col className="relative w-full h-full p-0">
        <img
          src={artImage}
          alt="art image"
          className="w-full sm:h-full lg:mt-0 md:mt-20 sm:mt-20 h-[120vh] object-contain sm:object-fill brightness-80 pr-0 mr-0"
        />
        
        <div className="absolute inset-0 bg-purple-400 opacity-5"></div>

      </Col>
    </Row>
  </Container>
</>

)

}

export default Hero