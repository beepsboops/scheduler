////////////////////////////////////
// getAppointmentsForDay Function //
////////////////////////////////////

export function getAppointmentsForDay(state, day) {
  // In passed in object "state" find a day that matches passed in "day"
  const dayFound = state.days.find((eachDay) => eachDay.name === day);
  // If no match is found, return an empty array
  if (!dayFound) {
    return [];
  }
  // If match is found, dayFound = object containing array of appointemnt IDs
  // Map through dayFound.appointments and match appointment IDs with keys in state.appointments. These values of these keys correspond with scheduler time slots.
  const appointments = dayFound.appointments.map(
    (appointmentId) => state.appointments[appointmentId]
  );
  return appointments;
}

////////////////////////////////////
// getInterviewersForDay Function //
////////////////////////////////////

export function getInterviewersForDay(state, day) {
  // In passed in object "state" find a day that matches passed in "day"
  const dayFound = state.days.find((eachDay) => eachDay.name === day);
  // If no match is found, return an empty array
  if (!dayFound) {
    return [];
  }

  const interviewers = dayFound.interviewers.map(
    (interviewerId) => state.interviewers[interviewerId]
  );
  // console.log("LOG: getInterviewersForDay: interviewers:", getInterviewersForDay);
  return interviewers;
}

///////////////////////////
// getInterview Function //
///////////////////////////

export function getInterview(state, interviewObj) {
  if (!interviewObj) {
    return null;
  }
  const schedulerObj = {};
  const interviewerId = interviewObj.interviewer;
  schedulerObj.student = interviewObj.student;
  schedulerObj.interviewer = state.interviewers[interviewerId];
  // console.log("LOG2: schedulerObj:", schedulerObj);
  return schedulerObj;
}
