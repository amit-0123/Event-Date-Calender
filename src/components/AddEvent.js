import React, { useState } from "react";

function AddEvent({ onEventAdded }) {
  const [event, setEvent] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
    const updatedEvents = [...existingEvents, event];
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    onEventAdded(updatedEvents); 
    setEvent({ name: "", date: "", time: "", location: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="add-event-form">
      <input
        name="name"
        placeholder="Event Name"
        value={event.name}
        onChange={handleChange}
        required
      />
      <input
        name="date"
        type="date"
        value={event.date}
        onChange={handleChange}
        required
      />
      <input
        name="time"
        type="time"
        value={event.time}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        placeholder="Location"
        value={event.location}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Event</button>
    </form>
  );
}

export default AddEvent;
