import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import flower from '../assets/flo.jpg';

function AboutUs() {

  return (
    <>
      <Row className="flex flex-col md:flex-row items-center p-0">
        <Col xs={12} md={6} className="flex justify-center mb-6 md:mb-0 !pl-10 !pr-10">
          <img
            src={flower}
            alt="Art"
            className="h-72 sm:h-[400px] md:h-[600px] lg:h-[800px] w-auto object-cover"
          />
        </Col>

        <Col xs={12} md={6} className=" text-center px-4">
          <h1 className="letter-colors  font-gilda !text-6xl !sm:text-5xl !md:text-6xl">Welcome To My</h1>
          <h1 className="letter-colors  font-gilda !text-6xl !sm:text-5xl !md:text-6xl">Art Gallery</h1>
          <p className="letter-colors  font-gilda mt-4 text-2xl !sm:text-lg">
          I craft handmade art and work in the mediums, watercolor, acrylic, colored pencil, and photography. 
          </p>
          <div className="h-8"></div>
          <Link to="/about">
            <button className="bg-violet-700 align-center letter-colors letter-colors px-6 py-3 rounded-lg hover:bg-violet-800 transition">
              Learn More
            
            </button>
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default AboutUs;
