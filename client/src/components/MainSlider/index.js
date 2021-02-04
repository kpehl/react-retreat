// In this index it has all of the rooms and the homepage with their perspective images to match with every page

import React, { Component } from 'react';
import Slider from 'infinite-react-carousel';

export default class CustomSlider extends Component {
  render() {

 const room = this.props.room

    const settings = {
      arrows: false,
      autoplay: true,
      duration: 300
    };
    switch (room) {
      //
      case 'King':
        return (
          <div className="carousel">
            
            <Slider {...settings}>
              <div className="slide">
                <img src="/images/hotel/image1.jpg" alt="Beach" />
              </div>
              <div className="slide">
                <img src="/images/hotel/image2.jpg" alt="Beach" />
              </div>
              <div className="slide">
                <img src="/images/hotel/image3.jpg" alt="Beach" />
              </div>
              <div className="slide">
                <img src="/images/hotel/image4.jpg" alt="Beach" />
              </div>
              <div className="slide">
                <img src="/images/hotel/image6.jpg" alt="Beach" />
              </div>
            </Slider>
          </div>
        );
      //
      default:
        return (
          <div className="carousel">

            <Slider {...settings}>
              <div className="slide">
                <img src="/images/hotel/image5.jpg" alt="Beach" />
              </div>
              <div className="slide">
                <img src="/images/hotel/image2.jpg" alt="Beach" />
              </div>
              <div className="slide">
                <img src="/images/hotel/image3.jpg" alt="Beach" />
              </div>
              <div className="slide">
                <img src="/images/hotel/image4.jpg" alt="Beach" />
              </div>
              <div className="slide">
                <img src="/images/hotel/image6.jpg" alt="Beach" />
              </div>
            </Slider>
          </div>
        );
        
    }
  }
}