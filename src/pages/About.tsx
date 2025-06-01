import { Col, Row } from "react-bootstrap"
import Navbar from "../components/Navbar"
import gea from '../assets/gea2.jpg'
import ContactUs from "../components/ContactUs"


function About() {
    return (
        <>
        <Navbar>
        </Navbar>
        <Row className="flex flex-col md:flex-row p-0 !mt-25">

            <Col xs={12} md={6} className=" text-center px-4 pt-10 tracking-wide">
            <h1 className="letter-colors  font-gilda !text-4xl/14 !sm:text-5xl !md:text-6xl">"Whoever wants to know something about me ... they should look attentively at my pictures and there seek to recognize what I am and what I want".</h1>
            <h1 className="letter-colors  font-gilda !text-4xl !sm:text-5xl !md:text-6xl">- Gustav Klimt</h1>
            <p className="letter-colors pl-10 pt-10 !text-left  font-gilda mt-4 text-2xl/10 !sm:text-lg">
            I am a graduate student, studying in a field far away from the arts. Painting and drawing has always been an outlet and will serve as one forever. To me, expression is the beauty of life and I believe that art, whether as a hobby or not should remain closely with everyone. Through said closeness we become more alive and can connect with all that exists and what abstractly doesn't exist.
            </p>
            <p className="letter-colors pl-10 pt-10 !text-left  font-gilda mt-4 text-2xl/10 !sm:text-lg">
            I focus on portraits and nature. My most used mediums are watercolor and acrylic, though I have a growing passion for pastel drawings.
            I hope to gain exposure for my art whilst having the opportunity to also sell them.
            </p>
            <div className="h-8"></div>
            </Col>


            <Col xs={12} md={6} className="flex justify-center mb-6 pt-12 md:mb-0 !pl-10 !pr-10">
            <img
                src={gea}
                alt="Art"
                className="h-62 sm:h-[400px] md:h-[600px] lg:h-[700px] bg-black rounded-md w-auto object-cover"
            />
            </Col>

      </Row>
      <div className="h-[10vh]"></div>

      <ContactUs>
        
      </ContactUs>

        </>
    )
}

export default About