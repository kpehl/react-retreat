import gql from 'graphql-tag';

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
    }
  }
`;

export const QUERY_ALL_ROOMS = gql`
  {
    rooms {
      _id
      name
      description
      price
      quantity
      category {
        name
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
    admin
    bookings {
      _id
    }
  }
}
`;

export const QUERY_ALL_USERS = gql`
{
  users {
    firstName
    lastName
    email
    password
    bookings {
      _id
      purchaseDate
      rooms {
        _id
        name
        description
        price
        quantity
      }
    }
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