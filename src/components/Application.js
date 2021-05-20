import React, { useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors.js";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    setState,
    state,
    setDay,
    bookInterview,
    cancelInterview,
    getSpotsRemaining,
  } = useApplicationData();

  let dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  // My useEffect axios function to request days
  useEffect(() => {
    // Retrieving Appointemnts
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8001/api/days")),
      Promise.resolve(axios.get("http://localhost:8001/api/appointments")),
      Promise.resolve(axios.get("http://localhost:8001/api/interviewers")),
    ])
      .then((all) => {
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

  // Storing appointments for a specific day
  dailyAppointments = getAppointmentsForDay(state, state.day);

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
        {dailyAppointments.map((appointment) => {
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
