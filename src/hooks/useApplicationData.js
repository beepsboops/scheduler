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

  ////////////////////////////
  // bookInterview Function //
  ////////////////////////////

  // Creates new interview from empty slot
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState((prev) => ({ ...prev, appointments }));
      updateSpotsOnCurrentDay(-1);
    });
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
          updateSpotsOnCurrentDay(1);
        })
    );
  }

  ////////////////////////////////
  // getSpotsRemaining Function //
  ////////////////////////////////

  function updateSpotsOnCurrentDay(delta) {
    for (let index in state.days) {
      let daysCopy = state.days;
      if (daysCopy[index].name === state.day) {
        daysCopy[index].spots = daysCopy[index].spots + delta;
        setState((prev) => ({ ...prev, daysCopy }));
      }
    }
  }

  return {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
