const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
});

const BookingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    hallId: { type: Number, required: true },
    hallName: { type: String, required: true },
    bookingDetails: {
        name: { type: String, required: true },
        date: { type: Date, required: true },
    },
});

const decoratorBookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    decoratorId: { type: Number, required: true },
    decoratorName: { type: String, required: true },
    bookingDate: { type: String, required: true },
    theme: { type: String, required: true },
    contactNumber: { type: String, required: true },
    minBudget:{ type: Number, required: true },
});

const CatererBookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    catererId: { type: Number, required: true },
    catererName: { type: String, required: true },
    guestCount: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now },
    contactNumber: { type: String, required: true },
    cuisine:{ type: String, required: true },
    pricePerPerson:{ type: Number, required: true },
});

const PhotographerBookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    photographerId: { type: Number, required: true },
    photographerName: { type: String, required: true },
    budget:{ type: Number, required: true },
    videoSelected: { type: Boolean, default: false },
    droneSelected: { type: Boolean, default: false },
    contactNumber: { type: String, required: true },
    bookingDate: { type: Date, default: Date.now },
});

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    time: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  });

  const budgetItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    amountPaid: { type: Number, default: 0 },
    initialBudget:{ type: Number, required: true },
    userId: { type: String, required: true }, 
  });

  const formEventSchema = new mongoose.Schema({
    userId: String,
    eventName: String,
    date: Date,
    location: String,
    theme: String,
    additionalNotes: String,
  });
  
  const EventPreferenceModel = mongoose.model('EventPreference', formEventSchema);
  
  
  const BudgetModel = mongoose.model('BudgetPlanner', budgetItemSchema);
  
  
const EventModel = mongoose.model('EventPlanner', eventSchema);
  

const PhotographerBookingModel = mongoose.model('PhotographerBooking', PhotographerBookingSchema);


const CatererBookingModel = mongoose.model('CatererBooking', CatererBookingSchema);

const DecoratorBookingModel = mongoose.model('DecoratorBooking', decoratorBookingSchema);

const BookingModel = mongoose.model('HallBooking', BookingSchema);

const UserModel = mongoose.model('User', userSchema);

module.exports={
    UserModel,
    BookingModel,
    DecoratorBookingModel,
    CatererBookingModel,
    PhotographerBookingModel,
    EventModel,
    BudgetModel,
    EventPreferenceModel,
}