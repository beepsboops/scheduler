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
          updateSpotsOnCurrentDay(-1);
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
          updateSpotsOnCurrentDay(1);
        })
    );
  }

  ////////////////////////////////
  // getSpotsRemaining Function //
  ////////////////////////////////

  // Get index of current day; get copy of state.days; update correct day inside copy; then set state.days to the copy

  function updateSpotsOnCurrentDay(delta) {
    console.log("LOG: state.day:", state.day);
    console.log("LOG: state.days:", state.days);

    for (let index in state.days) {
      let daysCopy = state.days;
      if (daysCopy[index].name === state.day) {
        console.log("index:", index);
        console.log("state.day:", state.day);
        console.log("daysCopy[index].spots:", daysCopy[index].spots);
        daysCopy[index].spots = daysCopy[index].spots + delta;
        console.log("daysCopy[index].spots:", daysCopy[index].spots);
        console.log("daysCopy:", daysCopy);
        setState((prev) => ({ ...prev, daysCopy }));
        // setState(...prev, daysCopy);
        // setState(daysFound);
        // day.spots = day.spots + delta
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
