import gql from 'graphql-tag';

export const QUERY_BOOKINGS = gql`
  {
    bookings {
    _id
    purchaseDate
    bookingDateStart
    bookingDateEnd
    user {
      _id
      firstName
      lastName
      }
    }
  }
`;

export const QUERY_ROOMS = gql`
  query getRooms($category: ID) {
    rooms(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
      bookings {
        _id
        purchaseDate
        bookingDateStart
        bookingDateEnd
        user {
          _id
          firstName
          lastName
        }
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
{
  categories {
    _id
    name
  }
}
`;

export const QUERY_USER = gql`
{
  user {
    firstName
    lastName
    email
    admin
    _id
  }
}
`;

export const QUERY_ALL_USERS = gql`
{
  users {
    _id
    firstName
    lastName
    email
    admin
    password
  }
}
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($rooms: [ID]!) {
    checkout(rooms: $rooms) {
      session
    }
  }
`;