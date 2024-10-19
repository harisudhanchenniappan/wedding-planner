
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { UserModel ,BookingModel,DecoratorBookingModel,CatererBookingModel,PhotographerBookingModel,EventModel,BudgetModel,EventPreferenceModel} = require('./Schema');
const { connectDB } = require('./db');

const app = express();



app.use(cors());
app.use(bodyParser.json());


connectDB();

app.post('/signup', async (req, res) => {
    const { username, password, email, age } = req.body;

    try {

        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists.' });
        }


        const newUser = new UserModel({ username, password, email, age });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }

        
        else
        if (password!=user.password) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }

        
        res.status(200).json({ message: 'Login successful!', id: user._id });
       // res.send(user)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/book-hall', async (req, res) => {
    const { userId, hallId, hallName, bookingDetails } = req.body;

    try {
        
        const existingBooking = await BookingModel.findOne({ userId, hallId });
        if (existingBooking) {
            return res.status(400).json({ error: 'You have already booked this hall.' });
        }

        
        const newBooking = new BookingModel({ userId, hallId, hallName, bookingDetails });
        await newBooking.save();
        res.status(201).json({ message: 'Booking confirmed!', booking: newBooking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/booked-halls/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await BookingModel.find({ userId });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/cancel-booking/:bookingId', async (req, res) => {
    const { bookingId } = req.params;

    // Check if the bookingId is a valid ObjectId
    if (!mongoose.isValidObjectId(bookingId)) {
        return res.status(400).json({ error: 'Invalid booking ID' });
    }

    try {
        const deletedBooking = await BookingModel.findByIdAndDelete(bookingId);
        if (!deletedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/book-decorator', async (req, res) => {
    const { userId, decoratorId, decoratorName, bookingDate,theme,contactNumber,minBudget } = req.body;

    try {
        const existingBooking = await DecoratorBookingModel.findOne({ userId, decoratorId });
        if (existingBooking) {
            return res.status(400).json({ error: 'You have already booked this decorator.' });
        }

        const newBooking = new DecoratorBookingModel({ userId, decoratorId, decoratorName, bookingDate,theme,contactNumber,minBudget });
        await newBooking.save();
        res.status(201).json({ message: 'Decorator booking confirmed!', booking: newBooking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/booked-decorators/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await DecoratorBookingModel.find({ userId });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/cancel-decorator-booking/:bookingId', async (req, res) => {
    const { bookingId } = req.params;

    try {
        const deletedBooking = await DecoratorBookingModel.findByIdAndDelete(bookingId);
        if (!deletedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json({ message: 'Decorator booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/book-caterer', async (req, res) => {
    const { userId, catererId, catererName, guestCount, contactNumber,cuisine,pricePerPerson } = req.body;

    try {
        const existingBooking = await CatererBookingModel.findOne({ userId, catererId });
        if (existingBooking) {
            return res.status(400).json({ error: 'You have already booked this caterer.' });
        }

        const newBooking = new CatererBookingModel({ userId, catererId, catererName, guestCount, contactNumber,cuisine,pricePerPerson });
        await newBooking.save();
        res.status(201).json({ message: 'Caterer booking confirmed!', booking: newBooking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/booked-caterers/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await CatererBookingModel.find({ userId });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.delete('/cancel-caterer-booking/:bookingId', async (req, res) => {
    const { bookingId } = req.params;

    try {
        const deletedBooking = await CatererBookingModel.findByIdAndDelete(bookingId);
        if (!deletedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json({ message: 'Caterer booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/photographer-bookings', async (req, res) => {
    const { userId, photographerId, photographerName, videoSelected, budget, droneSelected, contactNumber } = req.body;

    try {
        const newBooking = new PhotographerBookingModel({
            userId,
            photographerId,
            photographerName,
           budget,
            videoSelected,
            droneSelected,
            contactNumber,
        });
        await newBooking.save();
        res.status(201).json({ message: 'Photographer booking confirmed!', booking: newBooking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/photographer-bookings/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await PhotographerBookingModel.find({ userId });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.delete('/photographer-bookings/:bookingId', async (req, res) => {
    const { bookingId } = req.params;

    try {
        const deletedBooking = await PhotographerBookingModel.findByIdAndDelete(bookingId);
        if (!deletedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json({ message: 'Photographer booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/events', async (req, res) => {
    const userId = req.query.userId;
    try {
      const events = await EventModel.find({ userId });
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  });
  
 
  app.post('/events', async (req, res) => {
    const { name, time, userId } = req.body;
    const newEvent = new EventModel({ name, time, userId });
  
    try {
      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
    } catch (error) {
      res.status(400).json({ error: 'Failed to add event' });
    }
  });
  
  
  app.put('/events/:id', async (req, res) => {
    const { id } = req.params;
    const updatedEvent = req.body;
  
    try {
      const event = await EventModel.findByIdAndUpdate(id, updatedEvent, { new: true });
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update event' });
    }
  });
  
  
  app.delete('/events/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await EventModel.findByIdAndDelete(id);
      res.status(204).send(); // No content to send back
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete event' });
    }
  });

  app.post('/api/event-preferences', async (req, res) => {
    const { userId, eventName, date, location, theme, additionalNotes } = req.body;
    const eventPreference = new EventPreferenceModel({ userId, eventName, date, location, theme, additionalNotes });
    
    try {
      await eventPreference.save();
      res.status(201).json(eventPreference);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
 
  app.get('/api/event-preferences/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const preferences = await EventPreferenceModel.find({ userId });
      res.json(preferences);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put('/api/event-preferences/:id', async (req, res) => {
    const { id } = req.params;
    const updatedPreference = await EventPreferenceModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedPreference);
  });
  
  app.delete('/api/event-preferences/:id', async (req, res) => {
    const { id } = req.params;
    await EventPreferenceModel.findByIdAndDelete(id);
    res.sendStatus(204);
  });


  app.get('/budgets', async (req, res) => {
    const userId = req.headers['x-user-id'];
    try {
      const budgets = await BudgetModel.find({ userId });
      res.json(budgets);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  
  app.post('/budgets', async (req, res) => {
    const { category, amount, paid } = req.body;
    const userId = req.headers['x-user-id'];
    const newBudget = new BudgetModel({ userId, category, amount, paid });
  
    try {
      const budget = await newBudget.save();
      res.json(budget);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  
  app.put('/budgets/:id', async (req, res) => {
    const { paid } = req.body;
    const userId = req.headers['x-user-id'];
  
    try {
      const updatedBudget = await BudgetModel.findOneAndUpdate(
        { _id: req.params.id, userId },
        { paid },
        { new: true }
      );
      res.json(updatedBudget);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  
  app.delete('/budgets/:id', async (req, res) => {
    const userId = req.headers['x-user-id'];
    try {
      await BudgetModel.findOneAndDelete({ _id: req.params.id, userId });
      res.sendStatus(204);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });


app.listen(4000, () => {
    console.log(`Server running on port `);
});
