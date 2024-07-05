import React from 'react';
import { Carousel } from 'react-bootstrap';
import './MovieCarousel.css'; // Import your custom CSS for styling

const MovieCarousel = () => {
  return (
    <div className="movie-carousel-container">
      <Carousel interval={3000}  controls={false}  prevIcon={null} nextIcon={null} className="custom-carousel">
        <Carousel.Item>
          <div className="carousel-item-wrapper">
            <img
              src="https://img.freepik.com/free-photo/vertical-shot-traditional-indian-paneer-butter-masala-cheese-cottage-curry-black-surface_181624-32001.jpg?t=st=1717733608~exp=1717737208~hmac=a2905231934c6fb6c441753231656d98ab7ff9416646f0c1c72ab139dd6d509d&w=360"
              width="250"
              height="300"
              alt="First slide"
            />
            <img
              src="https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg?t=st=1717733702~exp=1717737302~hmac=81b844450e4ad8c1f70bb7b3fd5cd5ff2a11a6d3f0d7065b1c33407839f8b063&w=996"
              width="250"
              height="300"
              alt="Second slide"
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-item-wrapper">
            <img
              src="https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg?t=st=1717733826~exp=1717737426~hmac=58b2b1b5fd6ca889b9f4d1878e1b1fabfcfd9d6b74776e54d6b5ec253e094584&w=1060"
              width="250"
              height="300"
              alt="Third slide"
            />
            <img
              src="https://img.freepik.com/free-psd/bowl-biryani-with-chicken-pieces-transparent-background_84443-1317.jpg?t=st=1717733888~exp=1717737488~hmac=230495437dbb5f57838f3ec5a8e214237ecfd81e749a1f0f4ea8b2c0080fd919&w=740"
              width="250"
              height="300"
              alt="Fourth slide"
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-item-wrapper">
            <img
              src="https://img.freepik.com/free-photo/side-view-shawarma-with-fried-potatoes-board-cookware_176474-3215.jpg?t=st=1717733969~exp=1717737569~hmac=c356b05dfa32eb3678cdb628b9c01763a30bcb299fe1aedb760ce0043bc87430&w=740"
              width="250"
              height="300"
              alt="Third slide"
            />
            <img
              src="https://img.freepik.com/free-psd/vindaloo-isolated-transparent-background_191095-31952.jpg?t=st=1717734023~exp=1717737623~hmac=843ae9b3c8815fca715ea163f4ded917d82474cdb8ba4eddc83379f2d128a77a&w=740"
              width="250"
              height="300"
              alt="Fourth slide"
            />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default MovieCarousel;
