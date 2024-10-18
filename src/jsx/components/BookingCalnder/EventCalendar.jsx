import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Card } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import Swal from "sweetalert2";

const EventCalendar = () => {
  const [bookings, setBookings] = useState();

  const calendarRef = useRef(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8082/Booking");
        setBookings(response.data); // Store the fetched data in the state
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookings();
  }, []);

  const handleEventClick = (eventClick) => {
    const booking = bookings.find((b) => b.id === eventClick.event.id);
    if (booking) {
      Swal.fire({
        title: `${booking.firstName} ${booking.LastName}`,
        html: `
          <div class="table-responsive">
            <table class="table">
              <tbody>
                <tr><td>Phone</td><td><strong>${
                  booking.phoneNumber
                }</strong></td></tr>
                <tr><td>Entry Date</td><td><strong>${
                  booking.EntryDate
                }</strong></td></tr>
                <tr><td>Exit Date</td><td><strong>${
                  booking.ExitDate
                }</strong></td></tr>
                <tr><td>Guests</td><td><strong>${
                  booking.Numberofguests
                }</strong></td></tr>
                <tr><td>Chalet</td><td><strong>${
                  booking.ChaletName || "N/A"
                }</strong></td></tr>
              </tbody>
            </table>
          </div>`,
        showCancelButton: false,
        confirmButtonColor: "#26b396",
        confirmButtonText: "Close",
      });
    }
  };

  const renderEventContent = (eventInfo) => {
    const booking = bookings.find((b) => b.id === eventInfo.event.id);
    if (booking) {
      return (
        <div className="d-flex flex-column align-items-center">
          <h3 className="text-center m-0 font-weight-bold w-80 overflow-hidden">
            {`${booking.ChaletName}` || "No Chalet"}
          </h3>
          <br />
          <h5 className="text-center m-0 font-weight-bold w-75 overflow-hidden">
            {`${booking.firstName} ${booking.LastName}`}
          </h5>
        </div>
      );
    }
    return <></>;
  };

  const events = bookings?.map((booking) => ({
    id: booking.id,
    title: `${booking.firstName} ${booking.LastName}`,
    start: new Date(booking.EntryDate),
    end: new Date(booking.ExitDate),
    allDay: true,
    backgroundColor: getEventColor(booking.ChaletName),
    borderColor: getEventColor(booking.ChaletName),
  }));

  function getEventColor(chaletName) {
    const colorMap = {
      "02f6": "#FFB3BA", // Light pink
      "51dd": "#BAFFC9", // Light green
    };
    return colorMap[chaletName] || "#BAE1FF"; // Default light blue
  }

  return (
    <div className="animated fadeIn demo-app">
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              <div className="demo-app-calendar" id="mycalendartest">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  headerToolbar={{
                    start: "prev,next today",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay",
                  }}
                  initialView="dayGridMonth"
                  editable={false}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  weekends={true}
                  events={events}
                  eventContent={renderEventContent}
                  eventClick={handleEventClick}
                  ref={calendarRef}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EventCalendar;
