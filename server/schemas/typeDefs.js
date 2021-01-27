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
  }

  type Checkout {
    session: ID
  }

  type Booking {
    _id: ID
    purchaseDate: String
    rooms: [Room]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    bookings: [Booking]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    rooms(category: ID, name: String): [Room]
    room(_id: ID!): Room
    user: User
    booking(_id: ID!): Booking
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addBooking(rooms: [ID]!): Booking
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateRoom(_id: ID!, quantity: Int!): Room
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
