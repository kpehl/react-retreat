const db = require('./connection');
const { User, Room, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Premium' },
    { name: 'Standard' },
    { name: 'Economy' }
  ]);

  console.log('categories seeded');

  await Room.deleteMany();

  const rooms = await Room.insertMany([
    {
      name: 'Suite',
      description:
        'Featuring a plush bed and living space with extra seating, a sleeper sofa, and a TV that can be seen from every angle of the suite. Each studio suite includes a workstation, a wet bar, a refrigerator, and a microwave.',
      image: 'imageExample.jpg',
      category: categories[0]._id,
      price: 299.99,
      quantity: 5
    },
    {
      name: 'King',
      description:
        'Our most spacious rooms, which offer striking views of the glittering Cauayan Island Bacuit Bay Beach through the windows, the React Retreat King Room offers a king-sized bed and seating area with armchairs, occasional tables and a desk. A large bathroom features a walk-in shower and bath, with an adjoining walk-in wardrobe and valet closet.',
      image: 'canned-coffee.jpg',
      category: categories[0]._id,
      price: 179.99,
      quantity: 15
    },
    {
      name: 'Double Queen',
      category: categories[1]._id,
      description:'Enjoy sweeping views of the Cauayan Island Bacuit Bay Beach and its surrounding mountains and landscape through floor windows in our City View Rooms. These rooms features two Queen beds, valet closet, seating and a desk. With large baths and stand-alone showers, bathrooms are encased with frosted glass panels.',
      image: '/rooms/doubleQueen/room-5.jpeg',
      price: 179.99,
      quantity: 20
    },
    {
      name: 'Queen',
      category: categories[1]._id,
      description:'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'soap.jpg',
      price: 139.99,
      quantity: 50
    },
    {
      name: 'Full',
      category: categories[2]._id,
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: '/rooms/full/room1.jpg',
      price: 99.99,
      quantity: 50
    }
  ]);

  console.log('rooms seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    admin: false,
    bookings: [
      {
        purchaseDate: '01/15/2020',
        bookingDateStart: '02/12/2020',
        bookingDateEnd: '02/15/2020',
        confirmed: true,
        room: [rooms[1]]
      },
      {
        purchaseDate: '01/29/2020',
        bookingDateStart: '04/02/2020',
        bookingDateEnd: '04/11/2020',
        confirmed: true,
        room: [rooms[3]]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345',
    admin: false,
    bookings: [
      {
        purchaseDate: '01/01/2020',
        bookingDateStart: '06/05/2020',
        bookingDateEnd: '06/13/2020',
        confirmed: true,
        room: [rooms[4]]
      }
    ]
  });

  await User.create({
    firstName: 'Benedict',
    lastName: 'Cumberbund',
    email: 'bcumberbund@testmail.com',
    password: 'password12345',
    admin: true
  });

  console.log('users seeded');

  process.exit();
});
