import { Col, Row } from "react-bootstrap";
import insta from '../assets/logo.svg';
import { Link } from "react-router-dom";

function Social() {
  return (
    <>
      <Row className="text-center mb-10">
        <h1 className="w-full letter-colors font-gilda text-4xl sm:text-5xl md:text-6xl">
          Follow us on social
        </h1>
      </Row>

      <Row className="flex flex-wrap justify-center gap-4">
        {[insta].map((img, index) => (
          <Col
            key={index}
            xs={12}
            sm={6}
            md={2}
            className="flex justify-center"
          >
            <Link to='https://www.instagram.com/'>
            <img
              src={img}
              alt={`social ${index + 1}`}
              className="w-full max-w-[80px]  object-cover"
            />
            </Link>
          </Col>
        ))}
      </Row>

    </>
  );
}

export default Social;
