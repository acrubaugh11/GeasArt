import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import art5 from '../assets/art5.png';
import art6 from '../assets/art6.png';
import art7 from '../assets/art7.png';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category: string;
  createdAt: string;
};



function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const navigate = useNavigate();
  
    useEffect(() => {
        fetch('http://localhost:3000/products')
          .then((res) => res.json())
          .then((data) => setProducts(data))
          .catch((err) => console.error('Failed to fetch products:', err));
      }, []);


      const handleClick = () => {
    navigate('/shop');
  };
    
  return (
    <>
      <Container>
        <Row>
          <Col className="mb-8">
            <h1 className="letter-colors font-gilda text-3xl md:text-4xl text-center">Featured Products</h1>
          </Col>
        </Row>

        <div className="h-8"></div>

        <Row className="text-center">
          {products.slice(0,3).map((product) => (
            <Col  xs={12} md={4} lg={4} className="mb-8">
                <div
                  key={product.id}
                  className="group relative cursor-pointer"
                  onClick={() => handleClick()}
                >
                  <img
                    src={product.imageUrl}
                    alt={'Error'}
                    className="rounded-full w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 mx-auto object-cover"
                  />
                  <div className="mt-4 !letter-colors justify-between">
                    <div>
                      <h3 className="letter-colors font-gilda pt-4">
                        <span className="absolute inset-0 !letter-colors" />
                        {product.name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                      </h3>
                    </div>
                    <p className="text-lg letter-colors font-gilda">${product.price}</p>
                  </div>
                </div>
                </Col>
              ))}

        </Row>

        <Row>
          <Col className="pt-10 text-center">
          <Link to="/shop">
              <button className="rounded-lg bg-violet-700 leter-colors px-6 py-3 hover:bg-violet-800 transition letter-colors">
              Shop All
            </button>
          </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FeaturedProducts;
