import React from "react";
import "../../styles/CalendarEvent.scss";


// Modal component
function CalendarEvent({ onClose }) {

  return (
    <div className="calendar_modal">
      <div className="calendar_modal_content">
        <span className="close_calendar_modal" onClick={onClose}>&times;</span>
        <h2 className="event_title">Event Added to your Google Calendar</h2>
        <img className="event_img" src="src/assets/Dog-Party-Invite.png" alt="eventImage" />
      </div>
    </div>
  );
};

export default CalendarEvent;
