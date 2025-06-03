import { Col, Row } from "react-bootstrap";
import Navbar from "../components/Navbar";
import gea from '../assets/gea2.jpg';
import ContactUs from "../components/ContactUs";

function About() {
  return (
    <>
      <Navbar />

      {/* Responsive Layout */}
      <Row className="flex flex-col md:flex-row sm:p-0 !mt-20 md:px-30">
        
        {/* Image column */}
        <Col
          xs={12}
          md={6}
          className="flex justify-center mb-6 pt-12 md:mb-0 px-5 order-1 md:order-2"
        >
          <img
            src={gea}
            alt="Art"
            className="h-62 sm:h-[400px] md:h-[600px] lg:h-[700px] bg-black rounded-md w-auto object-cover"
          />
        </Col>

        {/* Text column*/}
            <Col
            xs={12}
            md={6}
            className="flex items-center justify-center px-4 md:px-10 py-4 md:py-10 md:min-h-[600px] order-2 md:order-1"
            >

          {/* Desktop version of the text */}
          <div className="hidden md:block mt-5">
            <p className="letter-colors text-left leading-10 font-gilda mt-8 text-2xl px-6 py-2">
              Painting and drawing has always been an outlet and will serve as one forever.
              Expression is the beauty of life, and art keeps us alive and connected to all that exists—and what abstractly doesn't.
            </p>
            <p className="letter-colors text-left leading-10 font-gilda mt-6 text-2xl px-6 py-2">
              I focus on portraits and nature. My most used mediums are watercolor and acrylic,
              though I have a growing passion for pastel drawings.
              I hope to gain exposure for my art whilst having the opportunity to also sell them.
            </p>
          </div>

          {/* Mobile version of the text */}
          <div className="block md:hidden text-center">
            <h1 className="letter-colors font-gilda text-3xl sm:text-4xl mb-4">
              Welcome to Geas Art 🎨
            </h1>
            <p className="letter-colors px-4 text-left leading-8 font-gilda text-center">
              I focus on portraits and nature. My most used mediums are watercolor and acrylic,
              though I have a growing passion for pastel drawings.
            </p>
          </div>
        </Col>
      </Row>

      <div className="h-[10vh]"></div>

      <ContactUs />
    </>
  );
}

export default About;
