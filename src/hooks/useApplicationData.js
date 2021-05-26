import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
  });

  // My useEffect axios function to request days
  useEffect(() => {
    // Retrieving Appointments
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
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
  }, [setState]);

  // Sets the current day
  const setDay = (day) => setState((prev) => ({ ...prev, day }));

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
      if (state.appointments[id].interview === null) {
        updateSpotsOnCurrentDay(-1);
      }
      setState((prev) => ({ ...prev, appointments }));
    });
  }

  // Uses appointment id to find the right appointment slot and set it's interview data to null
  function cancelInterview(id) {
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

  // Updates remaining interview spots in sidebar menu
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
