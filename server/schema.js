const { gql } = require('apollo-server-express');

exports.typeDefs = gql `
   type Hotel {
     hotel_id: Int!
     hotel_name: String!
     street: String!
     city: String!
     postal_code: String!
     price: Int!
     email: String!
     user_id: String!
   }

   type Booking {
     hotel_id: Int!
     booking_date: String!
     booking_start: String!
     booking_end: String!
     user_id: String!
   }

   type User {
    user_id: String!
    username: String!
    password: String!
    email: String!
   } 
   type Query {
     listUsers: [User]
     listHotels: [Hotel]
     getHotelByName(hotel_name: String!): [Hotel]
     getHotelByCity(city: String!): [Hotel]
     listBookings: [Booking]
     loginUser(username: String!, password: String!): User
   }

   type Mutation {
    createHotel(hotel_id: Int!
      hotel_name: String!
      street: String!
      city: String!
      postal_code: String!
      price: Int!
      email: String!
      user_id: String!): Hotel

    bookHotel(hotel_id: Int!
      booking_date: String!
      booking_start: String!
      booking_end: String!
      user_id: String!): Booking
    
    createUser(user_id: String!
      username: String!
      password: String!
      email: String!): User
    }
`