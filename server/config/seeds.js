const db = require('./connection');
const { User, Room, Category, Booking } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Premium' },
    { name: 'Standard' },
    { name: 'Economy' }
  ]);

  console.log('categories seeded');

  await User.deleteMany();

  const users =  await User.create([
    {
      firstName: 'Pamela',
      lastName: 'Washington',
      email: 'pamela@testmail.com',
      password: 'password12345',
      admin: false
    },
    {
      firstName: 'Elijah',
      lastName: 'Holt',
      email: 'eholt@testmail.com',
      password: 'password12345',
      admin: false
    },
    {
      firstName: 'Benedict',
      lastName: 'Cumberbund',
      email: 'bcumberbund@testmail.com',
      password: 'password12345',
      admin: true
    }
]);

  console.log('users seeded');

  await Booking.deleteMany();

  const bookings = await Booking.insertMany([
    {
      purchaseDate: '01/15/2020',
      bookingDateStart: '02/12/2020',
      bookingDateEnd: '02/15/2020',
      confirmed: true,
      user: [users[0]._id],
    },
    {
      purchaseDate: '01/29/2020',
      bookingDateStart: '04/02/2020',
      bookingDateEnd: '04/11/2020',
      confirmed: true,
      user: [users[1]._id],
    },
    {
      purchaseDate: '01/01/2020',
      bookingDateStart: '06/05/2020',
      bookingDateEnd: '06/13/2020',
      confirmed: true,
      user: [users[1]._id],
    },
    {
      purchaseDate: '01/31/2020',
      bookingDateStart: '02/12/2020',
      bookingDateEnd: '02/15/2020',
      confirmed: true,
      user: [users[1]._id],
    }
  ]);

  console.log('bookings seeded');

  await Room.deleteMany();

  const rooms = await Room.insertMany([
    {
      name: 'Suite',
      description:
        'Featuring a plush bed and living space with extra seating, a sleeper sofa, and a TV that can be seen from every angle of the suite. Each studio suite includes a workstation, a wet bar, a refrigerator, and a microwave.',
      image: 'rooms/suite/alexander-kaunas-67-sOi7mVIk-unsplash.jpg',
      category: categories[0]._id,
      price: 299.99,
      quantity: 5,
      bookings: [bookings[0]._id]
    },
    {
      name: 'King',
      description:
        'Our most spacious rooms, which offer striking views of the glittering Cauayan Island Bacuit Bay Beach through the windows, the React Retreat King Room offers a king-sized bed and seating area with armchairs, occasional tables and a desk. A large bathroom features a walk-in shower and bath, with an adjoining walk-in wardrobe and valet closet.',
      image: 'imageExample.jpg',
      category: categories[0]._id,
      price: 179.99,
      quantity: 15,
      bookings: [
         bookings[1]._id, 
         bookings[2]._id
      ]
    },
    {
      name: 'Double Queen',
      category: categories[1]._id,
      description:'Enjoy sweeping views of the Cauayan Island Bacuit Bay Beach and its surrounding mountains and landscape through floor windows in our City View Rooms. These rooms features two Queen beds, valet closet, seating and a desk. With large baths and stand-alone showers, bathrooms are encased with frosted glass panels.',
      image: 'rooms/doubleQueen/room-5.jpeg',
      price: 179.99,
      quantity: 20
    },
    {
      name: 'Queen',
      category: categories[1]._id,
      description:'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'rooms/queen/room-4.jpeg',
      price: 139.99,
      quantity: 50
    },
    {
      name: 'Full',
      category: categories[2]._id,
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: 'rooms/full/kim-schouten-f7h2nTvEknM-unsplash.jpg',
      price: 99.99,
      quantity: 50,
      bookings: [bookings[3]._id]
    }
  ]);

  console.log('rooms seeded');

  await Booking.findByIdAndUpdate(bookings[0]._id, {$push: {rooms: rooms[0]._id}}, {upsert: true})
  await Booking.findByIdAndUpdate(bookings[1]._id, {$push: {rooms: rooms[1]._id}}, {upsert: true})
  await Booking.findByIdAndUpdate(bookings[2]._id, {$push: {rooms: rooms[1]._id}}, {upsert: true})
  await Booking.findByIdAndUpdate(bookings[3]._id, {$push: {rooms: rooms[4]._id}}, {upsert: true})

  console.log('rooms added to bookings')

  process.exit();
});
