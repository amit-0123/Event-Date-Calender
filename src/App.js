import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Event from "./components/Event";

function App() {
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("events")) || []
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/events"
          element={
            <>
              {/* <AddEvent onEventAdded={setEvents} /> */}
              <Event events={events} />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
