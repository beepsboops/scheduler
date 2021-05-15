import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "helpers/selectors.js";

// Old hardcoded appointments data. Replaced with const dailyAppointments
// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       },
//     },
//   },

//   {
//     id: 2,
//     time: "2pm",
//   },
//   {
//     id: 3,
//     time: "3pm",
//     interview: {
//       student: "Bart Simpson",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       },
//     },
//   },

//   {
//     id: 3,
//     time: "2:30pm",
//   },
//   {
//     id: 4,
//     time: "4pm",
//     interview: {
//       student: "Lisa Simpson",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       },
//     },
//   },

//   {
//     id: 4,
//     time: "11am",
//   },
//   {
//     id: 5,
//     time: "5pm",
//     interview: {
//       student: "Ralph Wiggum",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       },
//     },
//   },
// ];

// Old hardcoded days array. Replaced with const [days, setDays] = useState([]);
// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

export default function Application(props) {
  // My useState implementation, deprecated W07D03 Managing State
  // const [day, setDay] = useState(`Monday`);

  // From W07D3 Requesting the Days, deprecated W07D03 Managing State
  // const [days, setDays] = useState([]);

  // New way of using and setting state W07D03 Managing State

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  console.log("Application: dailyAppointments", dailyAppointments);

  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  // This is equivalent to: const setDay = (item) => setState((prev) => ({ ...prev, day:item }));

  // W07D03 Retrieving Appointments: setDays deprecated, replaced with setState
  // const setDays = (days) => setState((prev) => ({ ...prev, days }));
  // This is equivalent to: const setDays = (items) => setState((prev) => ({ ...prev, days:items }));

  // My useEffect axios function to request days
  useEffect(() => {
    // W07D03 Retrieving Appointments: deprecated, replaced with Promise.all
    // axios
    // .get("/api/days")
    // .then((response) => {
    //   console.log(
    //     "Application: useEffect: axios: response.data",
    //     response.data
    //   );
    //   setDays(response.data);
    // })

    // New way of getting data W07D03 Retrieving Appointemnts
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8001/api/days")),
      Promise.resolve(axios.get("http://localhost:8001/api/appointments")),
      Promise.resolve(axios.get("http://localhost:8001/api/interviewers")),
    ])
      .then((all) => {
        console.log("Application: useEffect: all[0]", all[0]); // first
        console.log("Application: useEffect: all[1]", all[1]); // second
        console.log("Application: useEffect: all[2]", all[2]); // third

        const [first, second, third] = all;

        console.log(
          "Application: useEffect: first, second, third",
          first,
          second,
          third
        );

        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

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
          <DayList days={state.days} day={state.day} setDay={setDay} />
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
        {dailyAppointments.map((appointment) => {
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
