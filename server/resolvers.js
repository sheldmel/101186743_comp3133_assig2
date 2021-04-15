const Hotel = require('./models/Hotel');
const Booking = require('./models/Booking')
const User = require('./models/User')
exports.resolvers = {
    Query: {
        listHotels: async (parent, args) => {
            return await Hotel.find({});
        },
        getHotelByName: async (parent, args) => {
            return await Hotel.find({'hotel_name': args.hotel_name})
        },
        getHotelByCity: async (parent, args) => {
            return await Hotel.find({'city': args.city})
        },
        listBookings: async (parent, args) => {
            return await Booking.find({});
        },
        listUsers: async (parent, args) => {
            return await Users.find({});
        }
    },
    Mutation: {
        createHotel: async (parent, args) => {
            console.log(args)
            let newHotel = new Hotel({
                'hotel_id': args.hotel_id,
                'hotel_name': args.hotel_name,
                'street': args.street,
                'city': args.city,
                'postal_code': args.postal_code,
                'price': args.price,
                'email': args.email,
                'user_id': args.user_id
            });
            return await newHotel.save();
        },
      
        bookHotel: async (parent, args) => {
            console.log(args)
            let newBooking = new Booking({
                'hotel_id': args.hotel_id,
                'booking_date': args.booking_date,
                'booking_start': args.booking_start,
                'booking_end': args.booking_end,
                'user_id': args.user_id
            });
            return await newBooking.save();
        },
        createUser: async (parent, args) => {
            console.log(args)
            let newUser = new User({
                'user_id': args.user_id,
                'username': args.username,
                'password': args.password,
                'email': args.email
            });
            return await newUser.save();
        }
    }
  }