import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors.js";
import useApplicationData from "hooks/useApplicationData";
console.log("useApplicationData:", useApplicationData);
export default function Application(props) {
  const {
    setState,
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();
  let dailyAppointments = getAppointmentsForDay(state, state.day);
  // console.log("LOG: Application: dailyAppointments", dailyAppointments);
  const interviewers = getInterviewersForDay(state, state.day);
  // console.log("LOG: Application: interviewers", interviewers);

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
        // console.log("LOG: Application: useEffect: all[0]", all[0]); // first
        // console.log("LOG: Application: useEffect: all[1]", all[1]); // second
        // console.log("LOG: Application: useEffect: all[2]", all[2]); // third

        const [first, second, third] = all;

        // console.log(
        //   "LOG: Application: useEffect: first, second, third",
        //   first,
        //   second,
        //   third
        // );

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
  dailyAppointments = getAppointmentsForDay(state, state.day);
  // console.log("LOG: state %%%%%%%:", state);
  console.log("LOG: dailyAppointments", dailyAppointments);

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
        {/*Mentor: Refactor below, pull out map function, return proper array for interview & interviews???*/}
        {dailyAppointments.map((appointment) => {
          console.log(
            "LOG: Application: dailyAppointments.map: appointment:",
            appointment
          );
          // console.log(
          //   "LOG: Application: Appointment Comp: appointment.interview:",
          //   appointment.interview
          // );
          // console.log(
          //   "LOG: Application: Appointment Comp: getInterview:",
          //   getInterview(state, appointment.interview)
          // );
          return (
            <Appointment
              time={appointment.time}
              id={appointment.id}
              key={appointment.id}
              interview={getInterview(state, appointment.interview)}
              interviewers={interviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          );
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
