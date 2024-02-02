// components/EventForm.js
import { useState, useEffect } from 'react';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = 'http://localhost:8080/api/createevent';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, date, organizer, description, location }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Event created successfully');
          setDate("");
          setDescription("");
          setLocation("");
          setOrganizer("");
          setTitle("");
          alert('Event created!');
        } else {
          console.error('Failed to create event');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md">
      <label className="block mb-4">
        <span className="text-gray-700">Event Title:</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Event Date:</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Organizer:</span>
        <select
          value={organizer}
          onChange={(e) => setOrganizer(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md bg-white text-black"
          style={{ appearance: 'menulist-button' }} // Added style to ensure text visibility
        >
          <option value="" disabled>
            Select Organizer
          </option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Description:</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Location:</span>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        Create Event
      </button>
    </form>
  );
};

export default EventForm;
