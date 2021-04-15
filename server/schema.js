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
     user_id: Int!
   }

   type Booking {
     hotel_id: Int!
     booking_date: String!
     booking_start: String!
     booking_end: String!
     user_id: Int!
   }

   type User {
    user_id: Int!
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
   }

   type Mutation {
    createHotel(hotel_id: Int!
      hotel_name: String!
      street: String!
      city: String!
      postal_code: String!
      price: Int!
      email: String!
      user_id: Int!): Hotel

      bookHotel(hotel_id: Int!
        booking_date: String!
        booking_start: String!
        booking_end: String!
        user_id: Int!): Booking
      
      createUser(user_id: Int!
        username: String!
        password: String!
        email: String!): User
    }
`