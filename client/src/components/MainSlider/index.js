// In this index it has all of the rooms and the homepage with their perspective images to match with every page

import React, { Component } from 'react';
import Slider from 'infinite-react-carousel';

export default class CustomSlider extends Component {
  render() {
    const room = this.props.room
    // console.log(room)
    const settings = {
      arrows: false,
      autoplay: true,
      duration: 300
    };
    switch (room) {
        //
        case 'Suite':
          return (
            // <div className="carousel">
            //   <Slider {...settings}>
            //     <div className="slide">
            //       <img src="/images/hotel/image5.jpg" alt="Beach" />
            //     </div>
            //     <div className="slide">
            //       <img src="/images/hotel/image2.jpg" alt="Beach" />
            //     </div>
            //     <div className="slide">
            //       <img src="/images/hotel/image3.jpg" alt="Beach" />
            //     </div>
            //     <div className="slide">
            //       <img src="/images/hotel/image4.jpg" alt="Beach" />
            //     </div>
            //     <div className="slide">
            //       <img src="/images/hotel/image6.jpg" alt="Beach" />
            //     </div>
            //   </Slider>
            // </div>
            <img src = "\images\rooms\suite\alexander-kaunas-67-sOi7mVIk-unsplash.jpg" alt="room pic" />
          );
      //
      case 'King':
        return (
          // <div className="carousel">
          //   <Slider {...settings}>
          //     <div className="slide">
          //       <img src="/images/hotel/image5.jpg" alt="Beach" />
          //     </div>
          //     <div className="slide">
          //       <img src="/images/hotel/image2.jpg" alt="Beach" />
          //     </div>
          //     <div className="slide">
          //       <img src="/images/hotel/image3.jpg" alt="Beach" />
          //     </div>
          //     <div className="slide">
          //       <img src="/images/hotel/image4.jpg" alt="Beach" />
          //     </div>
          //     <div className="slide">
          //       <img src="/images/hotel/image6.jpg" alt="Beach" />
          //     </div>
          //   </Slider>
          // </div>
          <img src = "\images\rooms\queen\room-4.jpeg" alt="room pic" />
        );
      //
      case 'Queen':
        return (
          // <div className="carousel">
          //   <Slider {...settings}>
          //     <div className="slide">
          //       <img src="/images/hotel/image5.jpg" alt="Beach" />
          //     </div>
          //     <div className="slide">
          //       <img src="/images/hotel/image2.jpg" alt="Beach" />
          //     </div>
          //     <div className="slide">
          //       <img src="/images/hotel/image3.jpg" alt="Beach" />
          //     </div>
          //     <div className="slide">
          //       <img src="/images/hotel/image4.jpg" alt="Beach" />
          //     </div>
          //     <div className="slide">
          //       <img src="/images/hotel/image6.jpg" alt="Beach" />
          //     </div>
          //   </Slider>
          // </div>
          <img src = "\images\rooms\queen\room-8.jpeg" alt="room pic" />
        );
      //
      case 'Double Queen':
        return (
          // <div className="carousel">
          //   <Slider {...settings}>
          //     <div className="slide">
          //       <img src="/images/hotel/image5.jpg" alt="Beach" />
          //     </div>
          //     <div className="slide">
          //       <img src="/images/hotel/image2.jpg" alt="Beach" />
          //     </div>
          //     <div className="slide">
          //       <img src="/images/hotel/image3.jpg" alt="Beach" />
          //     </div>
          //     <div className="slide">
          //       <img src="/images/hotel/image4.jpg" alt="Beach" />
          //     </div>
          //     <div className="slide">
          //       <img src="/images/hotel/image6.jpg" alt="Beach" />
          //     </div>
          //   </Slider>
          // </div>
          <img src = "\images\rooms\doubleQueen\room-5.jpeg" alt="room pic" />
        );
      //
      case 'Full':
        return (
          // <div className="carousel">
          //   <Slider {...settings}>
          //     <div className="slide">
          //       <img src="/images/hotel/image5.jpg" alt="Beach" />
          //     </div>
          //     <div className="slide">
          //       <img src="/images/hotel/image2.jpg" alt="Beach" />
          //     </div>
          //     <div className="slide">
          //       <img src="/images/hotel/image3.jpg" alt="Beach" />
          //     </div>
          //     <div className="slide">
          //       <img src="/images/hotel/image4.jpg" alt="Beach" />
          //     </div>
          //     <div className="slide">
          //       <img src="/images/hotel/image6.jpg" alt="Beach" />
          //     </div>
          //   </Slider>
          // </div>
          <img src = "\images\rooms\full\kim-schouten-f7h2nTvEknM-unsplash.jpg" alt="room pic" />
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