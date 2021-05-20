////////////////////////////////////
// getAppointmentsForDay Function //
////////////////////////////////////

export function getAppointmentsForDay(state, day) {
  const dayFound = state.days.find((eachDay) => eachDay.name === day);
  if (!dayFound) {
    return [];
  }
  const appointments = dayFound.appointments.map(
    (appointmentId) => state.appointments[appointmentId]
  );
  return appointments;
}

////////////////////////////////////
// getInterviewersForDay Function //
////////////////////////////////////

export function getInterviewersForDay(state, day) {
  const dayFound = state.days.find((eachDay) => eachDay.name === day);
  if (!dayFound) {
    return [];
  }

  const interviewers = dayFound.interviewers.map(
    (interviewerId) => state.interviewers[interviewerId]
  );
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
  return schedulerObj;
}
