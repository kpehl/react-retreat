const { AuthenticationError } = require('apollo-server-express');
const { isValidObjectId } = require('mongoose');
const { User, Room, Category, Booking, Order } = require('../models');
const { populate } = require('../models/User');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');  // using a test key from Stripe; in Production this would be process.env.STRIPE_KEY

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    rooms: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Room.find(params)
        .populate('category')
        .populate('bookings')
        .populate({
          path: 'bookings',
          populate: 'user'
        });
    },
    room: async (parent, { _id }) => {
      return await Room.findById(_id)
        .populate('category')
        .populate('booking')
        .populate({
          path: 'bookings',
          populate: 'user'
        });
      },
    user: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id)
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async (parent, args, context) => {
      if (context.user) {
        return await User.find()
      }

      throw new AuthenticationError('Not authorized');
    },
    booking: async (parent, { _id }, context) => {
      if (context.user) {
        return await (await Booking.findById( _id ))
          .populate('user')
          .populate('rooms')
      }

      throw new AuthenticationError('Not logged in');
    },
    bookings: async (parent, args, context) => {
      return await Booking.find()
        .populate('user')
        .populate('rooms')
    },
    checkout: async (parent, { _id, duration}, context) => {
      console.log("in checkout");
      console.log(_id);
      console.log(duration);
    
      const currentRoom = await Room.find({_id}, function(err, docs){
        if(!err){
          return(docs);
        } else {
          throw err;
        }
      });

      console.log('currentRoom');
      console.log(currentRoom);

        //const order = new Order({ room: currentRoom, booking: currentRoom.bookings[currentRoom.bookings.length - 1] });

    const line_items = [];
      const url = new URL(context.headers.referer).origin;

      for (let i = 0; i < currentRoom.length; i++) {
        // generate room id with Stripe
        const room = await stripe.products.create({
          name: currentRoom[i].name,
          description: currentRoom[i].description,
          images: [`${url}/images/${currentRoom[i].image}`]
        });
        // generate price id using the Room id
        const price = await stripe.prices.create({
          product: room.id,
          //unit_amount: rooms[i].price * 100,
          unit_amount: (duration * currentRoom[i].price) *100,
          currency: 'usd'
        });
        // add price id to the line items array
        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      // generate a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}`
      });

      return { session: session.id }
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { Rooms }, context) => {
      console.log(context);
      if (context.user) {
        const booking = new Booking({ Rooms });
        console.log('booking in resolver');
        console.log(booking);
        await User.findByIdAndUpdate(context.user._id, { $push: { bookings: booking } });

        return booking;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateRoom: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Room.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;