import React, { useEffect, useState } from "react";
import "../styles.css";
import AddEvent from "./AddEvent"; 

function Event() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Load events from localStorage on component mount
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
    setFilteredEvents(storedEvents); 
  }, []);


  const handleEventAdded = (updatedEvents) => {
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
  };


  const handleDateFilterChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);
    if (selectedDate) {
      const filtered = events.filter((event) => event.date === selectedDate);
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  };


  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    const sorted = [...filteredEvents].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredEvents(sorted);
  };

  const deleteEvent = (indexToDelete) => {
    const updatedEvents = events.filter((_, index) => index !== indexToDelete);
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const isEventExpired = (eventDate, eventTime) => {
    const eventDateTime = new Date(`${eventDate}T${eventTime}`);
    const now = new Date();
    return now > eventDateTime;
  };

  const openInGoogleCalendar = (event) => {
    const startDateTime = `${event.date.replace(/-/g, "")}T${event.time
      .replace(/:/g, "")
      .slice(0, 4)}00Z`;
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${event.name}&dates=${startDateTime}/${startDateTime}&location=${event.location}`;
    window.open(url, "_blank");
  };

  return (
    <div className="event-table-container">
      <h2>Event Calendar</h2>

      <AddEvent onEventAdded={handleEventAdded} />

      <div className="filter-sort-container">
        <div>
          <label htmlFor="filterDate">Filter by Date:</label>
          <input
            id="filterDate"
            type="date"
            value={filterDate}
            onChange={handleDateFilterChange}
          />
        </div>
        <div>
          <label htmlFor="sortOrder">Sort by Date:</label>
          <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <table className="event-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>State</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event, index) => (
            <tr key={index}>
              <td
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                onClick={() => openInGoogleCalendar(event)}
              >
                {event.name}
              </td>
              <td>{event.date}</td>
              <td>{event.time}</td>
              <td>{event.location}</td>
              <td
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: isEventExpired(event.date, event.time)
                    ? "red"
                    : "green",
                }}
              >
                {isEventExpired(event.date, event.time) ? "Expired" : "Active"}
              </td>
              <td>
                <button
                  onClick={() => deleteEvent(index)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "red",
                  }}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Event;


