/*const Event = require('../../models/event')


function eventController() {

    return {
        
        async createevent(req, res) {
                const { title, description, date, location, organizer  } = req.body

                // Create a user 
                const event = new Event({
                    title, 
                    description, 
                    date, 
                    location, 
                    organizer
                });

                event.save()
                .then((event) => {
                    console.log("event added to the database");
                    return res.status(200).json({ message: "event added to the database"});;
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(404).json({ message: "Something went wrong" });;
                });

        },
        async getEvents(req, res) {
            try {
              const events = await Event.find();
              return res.status(200).json(events);
            } catch (error) {
              console.error(error);
              return res.status(500).json({ message: 'Internal Server Error' });
            }
          },
          
    }
}

module.exports = eventController*/

const Event = require('../../models/event');

function eventController() {
  return {
    async createEvent(req, res) {
      const { title, description, date, location, organizer } = req.body;

      // Create an event
      const event = new Event({
        title,
        description,
        date,
        location,
        organizer,
      });

      try {
        await event.save();
        console.log("Event added to the database");
        return res.status(200).json({ message: "Event added to the database" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
      }
    },

    async getEvents(req, res) {
      try {
        const events = await Event.find();
        return res.status(200).json(events);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    },
    
    async getEventDetails(req, res) {
      const { eventId } = req.params;

      try {
        const event = await Event.findById(eventId);
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }

        return res.status(200).json(event);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    },

    async updateEvent(req, res) {
      const { eventId } = req.params;
      const { title, description, date, location, organizer } = req.body;

      try {
        const event = await Event.findById(eventId);
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }

        // Update event details
        event.title = title;
        event.description = description;
        event.date = date;
        event.location = location;
        event.organizer = organizer;

        await event.save();

        console.log('Event updated successfully');
        return res.status(200).json({ message: 'Event updated successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    },

    async deleteEvent(req, res) {
      const { eventId } = req.params;

      try {
        const event = await Event.findByIdAndDelete(eventId);
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }

        console.log('Event deleted successfully');
        return res.status(200).json({ message: 'Event deleted successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    },
  };
}

module.exports = eventController;
