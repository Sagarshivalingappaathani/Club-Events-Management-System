"use client";
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [organizerNames, setOrganizerNames] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role,setRole]=useState("");

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      console.log(user);
      setIsLoggedIn(true);
      const parsedDocument = JSON.parse(user);
      const rol = parsedDocument.role;
      setRole(rol);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/getEvents');
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error('Error fetching events:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchOrganizerNames = async () => {
      const names = {};
      await Promise.all(
        events.map(async (event) => {
          try {
            const response = await fetch(`http://localhost:8080/api/getOrganizer/${event.organizer}`);
            if (!response.ok) {
              throw new Error(`Error fetching organizer name: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            names[event.organizer] = data.name;
          } catch (error) {
            console.error('Error fetching organizer name:', error.message);
            names[event.organizer] = null;
          }
        })
      );
      setOrganizerNames(names);
    };

    fetchOrganizerNames();
  }, [events]);

  const handleCalendarChange = (value) => {
    setSelectedDate(value);
  };

  const handleDelete = (eventId) => {

    const deleteEvent = async (eventId) => {
      try {
        const response = await fetch(`http://localhost:8080/api/deleteEvent/${eventId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          window.location.href = '/events';
        } else {
          console.error('Error deleting event:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    };

    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(eventId);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2 text-center my-10">Events</h1>

      <h2 className="text-2xl font-semibold mb-2 text-center my-10">All Events</h2>
      <div className='flex justify-center'>
        <div>
          <Calendar
            onChange={handleCalendarChange}
            value={selectedDate}
            tileContent={({ date, view }) => {
              const currentDate = new Date(date);
              currentDate.setHours(0, 0, 0, 0);

              const eventsOnDate = events.filter((event) => {
                const eventDate = new Date(event.date);
                eventDate.setHours(0, 0, 0, 0);
                return currentDate.getTime() === eventDate.getTime();
              });

              if (eventsOnDate.length > 0) {
                return (
                  <div className="bg-green-500 text-white rounded-full p-2">
                  </div>
                );
              }

              return null;
            }}
            onClickDay={(value) => {
              if(role === 'admin'){
                window.location.href = '/events/createEvent';
              }
            }}

          />
        </div>
      </div>

      <div className='p-10'>
        <h2 className="text-4xl font-bold mb-8 text-center my-10 text-teal-600">✨ Elevate Your Experience: Join Our Exciting Events! 🚀</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event._id} className="bg-white border border-gray-300 p-6 rounded-md shadow-lg transition-transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 text-teal-600">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="flex items-center mb-2">
                <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2L18 6M6 18L2 14M22 14L18 18M6 6L2 10M22 10L18 6M10 2L6 6M10 22L14 18M22 10L18 14"></path>
                </svg>
                <p className="text-gray-700">Date: {new Date(event.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center mb-2">
                <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4a2 2 0 100-4 2 2 0 000 4zM12 18a2 2 0 100-4 2 2 0 000 4zM4 12a2 2 0 100-4 2 2 0 000 4zM20 12a2 2 0 100-4 2 2 0 000 4z"></path>
                </svg>
                <p className="text-gray-700">Location and Time: {event.location}</p>
              </div>
              <div className="flex items-center mb-4">
                <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 9a2 2 0 100-4 2 2 0 000 4zM16 15a2 2 0 100-4 2 2 0 000 4z"></path>
                </svg>
                <p className="text-gray-700">Organizer: {organizerNames[event.organizer]}</p>
              </div>
              {role === 'admin' && (
                <div className='flex justify-around'>
                  <a href={`/events/edit/${event._id}`} className="text-indigo-500 hover:underline mt-6 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit Event
                  </a>
                  <button className="text-red-500  mt-6 hover:underline flex items-center"  onClick={() => handleDelete(event._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="delete" stroke="#FF0000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <g fill="none" fill-rule="evenodd" stroke="#FF0000">
                        <path d="M5.5 7.5V20A1.5 1.5 0 0 0 7 21.5h11a1.5 1.5 0 0 0 1.5-1.5V7.5h-14z"></path>
                        <path stroke-linecap="round" d="M8.5 10.41v8.18M12.5 10.41v8.18M16.5 10.41v8.18M9 4.333V3.244C9 2.557 9.627 2 10.4 2h4.2c.773 0 1.4.557 1.4 1.244v1.09"></path>
                        <rect width="18" height="3" x="3.5" y="4.5" rx="1.5"></rect>
                      </g>
                    </svg>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;


