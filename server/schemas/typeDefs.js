const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Room {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
    bookings: [Booking]
  }

  type Checkout {
    session: ID
  }

  type Booking {
    _id: ID
    purchaseDate: String
    bookingDateStart: String
    bookingDateEnd: String
    confirmed: Boolean
    user: User
    rooms: [Room]
  }

  type Bookings {
    bookings: [Booking]
  }

  type Order {
    _id: ID
    room: Room
    booking: Booking
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    admin: Boolean
  }

  type EditUser {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    admin: Boolean
  }

  type Auth {
    token: ID
    user: User
  }

  input currentBooking {
    bookingDateStart: String!
    bookingDateEnd: String!
    user: ID!
  }

  type Query {
    categories: [Category]
    rooms(category: ID, name: String): [Room]
    room(_id: ID!): Room
    user: User
    users: [EditUser]
    booking(_id: ID!): Booking
    bookings: [Booking]
    order(_id: ID!): Order
    checkout(_id: ID!, duration: Int!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(_id: ID!, input: currentBooking!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateRoom(_id: ID!, quantity: Int!): Room
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
