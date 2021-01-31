// In this index it has all of the rooms and the homepage with their perspective images to match with every page

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
      <div className="carousel">
        <Slider { ...settings }>
          <div className="slide">
          <img src="/images/hotel/image1.jpg" alt="Beach"/>
          </div>
          <div className="slide">
          <img src="/images/hotel/image2.jpg" alt="Beach"/>
          </div>
          <div className="slide">
          <img src="/images/hotel/image3.jpg" alt="Beach"/>
          </div>
          <div className="slide">
          <img src="/images/hotel/image4.jpg" alt="Beach"/>
          </div>
          <div className="slide">
          <img src="/images/hotel/image5.jpg" alt="Beach"/>
          </div>
        </Slider>
      </div>
    );
  }
}

// ------------------------------------------------------------------------------------------------
// Rooms

// Suites
// export default class Suites extends Component {
//   render() {
//     const settings =  {
//       arrows: true,
//       autoplay: true,
//       duration: 300
//     };
//     return (
//       <div>
//         <Slider { ...settings }>
//           <div>
//           <img src="/images/hotel/image1.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image2.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image3.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image4.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image1.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image2.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image3.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image4.jpg" alt="Beach"/>
//           </div>
//           <div>
//             <h3>9</h3>
//           </div>
//           <div>
//             <h3>10</h3>
//           </div>
//         </Slider>
//       </div>
//     );
//   }
// }

// // King
// export default class King extends Component {
//   render() {
//     const settings =  {
//       arrows: true,
//       autoplay: true,
//       duration: 300
//     };
//     return (
//       <div>
//         <Slider { ...settings }>
//           <div>
//           <img src="/images/hotel/image1.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image2.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image3.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image4.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image1.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image2.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image3.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image4.jpg" alt="Beach"/>
//           </div>
//           <div>
//             <h3>9</h3>
//           </div>
//           <div>
//             <h3>10</h3>
//           </div>
//         </Slider>
//       </div>
//     );
//   }
// }

// // Double Queen
// export default class DoubleQueen extends Component {
//   render() {
//     const settings =  {
//       arrows: true,
//       autoplay: true,
//       duration: 300
//     };
//     return (
//       <div>
//         <Slider { ...settings }>
//           <div>
//           <img src="/images/hotel/image1.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image2.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image3.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image4.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image1.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image2.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image3.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image4.jpg" alt="Beach"/>
//           </div>
//           <div>
//             <h3>9</h3>
//           </div>
//           <div>
//             <h3>10</h3>
//           </div>
//         </Slider>
//       </div>
//     );
//   }
//   // Queen
// }
// export default class Queen extends Component {
//   render() {
//     const settings =  {
//       arrows: true,
//       autoplay: true,
//       duration: 300
//     };
//     return (
//       <div>
//         <Slider { ...settings }>
//           <div>
//           <img src="/images/hotel/image1.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image2.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image3.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image4.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image1.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image2.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image3.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image4.jpg" alt="Beach"/>
//           </div>
//           <div>
//             <h3>9</h3>
//           </div>
//           <div>
//             <h3>10</h3>
//           </div>
//         </Slider>
//       </div>
//     );
//   }
// }
// // Full
// export default class Full extends Component {
//   render() {
//     const settings =  {
//       arrows: true,
//       autoplay: true,
//       duration: 300
//     };
//     return (
//       <div>
//         <Slider { ...settings }>
//           <div>
//           <img src="/images/hotel/image1.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image2.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image3.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image4.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image1.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image2.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image3.jpg" alt="Beach"/>
//           </div>
//           <div>
//           <img src="/images/hotel/image4.jpg" alt="Beach"/>
//           </div>
//           <div>
//             <h3>9</h3>
//           </div>
//           <div>
//             <h3>10</h3>
//           </div>
//         </Slider>
//       </div>
//     );
//   }
// }