import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from '../HeroSection/image1.jpg';
import image2 from '../HeroSection/image2.jpg';
import image3 from '../HeroSection/image3.jpg';

function HeroSection() {
  return (
    <Carousel className='w-100 px-sm-5 px-md-5 py-0'>
      <Carousel.Item interval={1000} className='h-96'>
        <img
          className="d-block w-100"
          src={image1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500} className='h-96'>
      <img
          className="d-block w-100"
          src={image2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='h-96'>
      <img
          className="d-block w-100"
          src={image3}
          alt="third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HeroSection;