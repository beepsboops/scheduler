import React, { useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  ///////////
  // State //
  ///////////

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
  });

  /////////////////////
  // setDay Function //
  /////////////////////

  // Sets the current day
  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  // This is equivalent to: const setDay = (item) => setState((prev) => ({ ...prev, day:item }));

  ////////////////////////////
  // bookInterview Function //
  ////////////////////////////

  // Creates new interview from empty slot
  function bookInterview(id, interview) {
    // console.log("LOG: bookInterview:", interview.interviewer.id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // console.log("LOG: bookInterview: id", id);
    // console.log("LOG: bookInterview: appointments[id]:", appointments[id]);
    // console.log("LOG: *********:", interview);
    return (
      axios
        .put(`/api/appointments/${id}`, { interview })
        // When the response comes back update the state using the existing setState
        .then(() => {
          setState((prev) => ({ ...prev, appointments }));
        })
    );
  }

  //////////////////////////////
  // cancelInterview Function //
  //////////////////////////////

  // Uses appointment id to find the right appointment slot and set it's interview data to null
  function cancelInterview(id, interview) {
    console.log("LOG: Application: hit cancelInterview function");
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return (
      axios
        .delete(`/api/appointments/${id}`)
        // When the response comes back update the state using the existing setState
        .then(() => {
          setState((prev) => ({ ...prev, appointments }));
        })
    );
  }

  return { state, setState, setDay, bookInterview, cancelInterview };
}
