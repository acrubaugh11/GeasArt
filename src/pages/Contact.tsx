import { Col, Row } from "react-bootstrap";
import Navbar from "../components/Navbar";
import contact from "../assets/fly.jpg";


function Contact() {

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const form = e.target as HTMLFormElement;

  // Extract values safely
  const name = (form.elements.namedItem('name') as HTMLInputElement).value;
  const email = (form.elements.namedItem('email') as HTMLInputElement).value;
  const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
  
  const res = await fetch('http://localhost:3000/contact/msg', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      message,
    }),
  });


  const data = await res.json();
  if (res.ok) alert('Message sent!');
  else alert(data.error || 'Failed to send message');
}


    return (
        <>
        <Navbar>
            
        </Navbar>
        <Row className="flex flex-col md:flex-row p-0 !mt-40 mx-auto w-3/4">

            <Col xs={12} md={6} className=" text-left px-4">
            <h1 className="letter-colors font-gilda !text-6xl !sm:text-5xl !md:text-6xl">Contact Me</h1>
            <p className="letter-colors  font-gilda mt-4 text-lg !sm:text-lg">
                Use the form below to contact me regarding any inquiries!
            </p>
            <p className="letter-colors  font-gilda">grsr418@gmail.com</p>
            <p className="letter-colors  font-gilda">(828) 712-9708</p>
            <div className="h-8"></div>

            <form onSubmit={handleSubmit} className="w-full max-w-md bg-violet-300 p-6 rounded-lg mb-20 ">
                        <div className="mb-4">
                        <label className="block text-xl font-medium letter-colors font-gilda mb-1">First and Last Name</label>
                        <input
                            name="name"
                            type="text"
                            className="w-full bg-violet-200 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-white-300"
                            placeholder="First Name"
                        />
                        </div>

                        <div className="mb-4">
                        <label className="block text-xl font-medium letter-colors font-gilda mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="w-full bg-violet-200 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-300"
                            placeholder="you@example.com"
                        />
                        </div>

                        <div className="mb-4">
                        <label className="block text-xl font-medium letter-colors font-gilda mb-1">Message</label>
                        <textarea
                            name="message"
                            rows={4}
                            className="w-full bg-violet-200 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-300"
                            placeholder="Your message..."
                        >
                        </textarea>
                        </div>

                        <button
                        type="submit"
                        className="w-full !bg-violet-300 border-1 border-white rounded letter-colors py-2 px-4 rounded-lg hover:bg-violet-800 transition"
                        >
                        Submit
                        </button>
                    </form>
            </Col>


            <Col xs={12} md={6} className="flex justify-center mb-6 md:mb-0 !pl-10 !pr-10">
                <img
                src={contact}
                alt="Art"
                className="h-62 sm:h-[400px] md:h-[600px] lg:h-[800px] w-auto object-cover object-[72%_75%] !mb-10"
            />
            </Col>

      </Row>
        </>
    )
}

export default Contact