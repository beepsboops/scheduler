import React, { useState } from "react";
import "components/Application.scss";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";

const appointmentData = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },

  {
    id: 2,
    time: "2pm",
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Bart Simpson",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      },
    },
  },

  {
    id: 3,
    time: "2:30pm",
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Lisa Simpson",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      },
    },
  },

  {
    id: 4,
    time: "11am",
  },
  {
    id: 5,
    time: "5pm",
    interview: {
      student: "Lisa Simpson",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      },
    },
  },

  {
    id: 5,
    time: "11am",
  },
  {
    id: 6,
    time: "5pm",
    interview: {
      student: "Maggie Simpson",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      },
    },
  },
];

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {
  // My useState implementation
  const [day, setDay] = useState(`Monday`);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {/*My map function for iterating over appointments data*/}
        {appointmentData.map((appointment) => {
          // console.log(
          //   "Application: appointment map: Array.isArray(appointment):",
          //   Array.isArray(appointment)
          // );
          // console.log("Application: appointment map:", appointment);
          // console.log(
          //   "Application: appointment.interview:",
          //   appointment.interview
          // );
          // console.log(
          //   "Application: appointment.interview.interviewer:",
          //   appointment.interview.interviewer
          // );
          return (
            <Appointment
              time={appointment.time}
              interview={appointment.interview}
            />
          );
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
