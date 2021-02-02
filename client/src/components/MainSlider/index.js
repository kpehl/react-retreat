import React, { Component } from 'react';
import Slider from 'infinite-react-carousel';

export default class CustomSlider extends Component {
  render() {
    const settings =  {
      arrows: false,
      autoplay: true,
      duration: 300
    };
    return (
      <div>
        <Slider { ...settings }>
          <div>
          <img src="/images/hotel/image1.jpg" alt="Beach"/>
          </div>
          <div>
          <img src="/images/hotel/image2.jpg" alt="Beach"/>
          </div>
          <div>
          <img src="/images/hotel/image3.jpg" alt="Beach"/>
          </div>
          <div>
          <img src="/images/hotel/image4.jpg" alt="Beach"/>
          </div>
          <div>
          <img src="/images/hotel/image1.jpg" alt="Beach"/>
          </div>
          <div>
          <img src="/images/hotel/image2.jpg" alt="Beach"/>
          </div>
          <div>
          <img src="/images/hotel/image3.jpg" alt="Beach"/>
          </div>
          <div>
          <img src="/images/hotel/image4.jpg" alt="Beach"/>
          </div>
          <div>
            <h3>9</h3>
          </div>
          <div>
            <h3>10</h3>
          </div>
        </Slider>
      </div>
    );
  }
}