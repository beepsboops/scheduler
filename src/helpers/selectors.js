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
