const { AuthenticationError } = require('apollo-server-express');
const { User, Room, Category, Booking } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');  // using a test key from Stripe; in Roomion this would be process.env.STRIPE_KEY

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

      return await Room.find(params).populate('category');
    },
    room: async (parent, { _id }) => {
      return await Room.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'bookings.rooms',
          populate: 'category'
        });

        user.Bookings.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    booking: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'bookings.rooms',
          populate: 'category'
        });

        return user.Bookings.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const booking = new Booking({ Rooms: args.Rooms });
      const { rooms } = await booking.populate('Rooms').execPopulate();
      const line_items = [];
      const url = new URL(context.headers.referer).origin;

      for (let i = 0; i < Rooms.length; i++) {
        // generate room id with Stripe
        const room = await stripe.Rooms.create({
          name: rooms[i].name,
          description: rooms[i].description,
          images: [`${url}/images/${rooms[i].image}`]
        });
        // generate price id using the Room id
        const price = await stripe.prices.create({
          room: room.id,
          unit_amount: rooms[i].price * 100,
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
    addBooking: async (parent, { Rooms }, context) => {
      console.log(context);
      if (context.user) {
        const booking = new Booking({ Rooms });

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