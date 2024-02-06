export default function EventPost(props) {
  const { handleSubmit, handlePostStateChange, postState } = props;
  const { title, content, location, eventDescription } = postState;
  return (

    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="input-data textarea">
          <textarea
            id="new-title"
            className="input-data"
            value={title}
            onChange={() => {
              handlePostStateChange(event, "title");
            }}
            rows="8"
            cols="20"
            required
          ></textarea>
          <div className="underline"></div>
          <label htmlFor="new-title">Event Title:</label>
        </div>
      </div>

      <div className="form-row">
        <div className="input-data textarea">
          <textarea
            id="new-event-description"
            value={eventDescription}
            onChange={() => {
              handlePostStateChange(event, "event_description");
            }}
            rows="8"
            cols="80"
            required
          ></textarea>
          <br />
          <div className="underline"></div>
          <label htmlFor="new-content">Event Description</label>
        </div>
      </div>

      <div className="form-row">
        <div className="input-data textarea">
          <input
            type="datetime-local"
            id="new-start-date"
            className="input-data"
            // value={eventDate}
            onChange={() => {
              handlePostStateChange(event, "event_date");
            }}
            rows="8"
            cols="20"
            required
          ></input>
          <div className="underline"></div>
          <label htmlFor="new-date">Start Date:</label>
        </div>
        <div className="input-data textarea">
          <input
            type="datetime-local"
            id="new-end-date"
            className="input-data"
            // value={endDate}
            onChange={() => {
              handlePostStateChange(event, "end_date");
            }}
            rows="8"
            cols="20"
            required
          ></input>
          <div className="underline"></div>
          <label htmlFor="new-date">End Date:</label>
        </div>
      </div>
      <div className="form-row"> 
        <div className="input-data textarea">
        <textarea
            id="new-event-location"
            value={location}
            onChange={() => {
              handlePostStateChange(event, "event_location");
            }}
            rows="8"
            cols="80"
            required
          ></textarea>
          <div className="underline"></div>
          <label htmlFor="new-date">Location:</label>
        </div>
      </div>
          <button className="bubbly-button submit" type="submit">
            Post!
          </button>
    </form>
  );
}
