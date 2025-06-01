import { Col, Row } from "react-bootstrap";


function ContactUs() {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const form = e.target as HTMLFormElement;

  // Extract values safely
  const name = (form.elements.namedItem('name') as HTMLInputElement).value;
  const email = (form.elements.namedItem('email') as HTMLInputElement).value;
  const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
  
  const res = await fetch('https://geasart.onrender.com/contact/msg', {
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
        <div className="bg-violet-300">
            <Row>
                <Col xs={12} md={6} className=" text-center px-4 lg:py-[25vh] md:py-[20vh] sm:py-[20vh]">
                    <h1 className="letter-colors  font-gilda !text-5xl !sm:text-5xl !md:text-6xl pt-5">Contact Me</h1>
                    <p className="letter-colors  font-gilda mt-4 text-xl !sm:text-lg">
                    Get in contact with me for any personal or professional questions!
                    </p>
                    <div className="h-8"></div>
                </Col>
                <Col xs={12} md={6} className="flex justify-center items-center px-4 py-10">
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

            </Row>
        </div>
        </>
    )
}

export default ContactUs