import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  console.log("index: props:", props);
  console.log("index: props.interview.interviewer:", props.interview);
  return (
    <article className="appointment">
      <Header id={props.id} time={props.time} />
      {/* {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer2={props.interview.interviewer.name}
        />
      ) : (
        <Empty />
      )} */}
      {props.interview && (
        <Show
          student={props.interview.student}
          interviewer2={props.interview.interviewer.name}
        />
      )}
      {!props.interview && <Empty />}
    </article>
  );
}
// From W07D2 Displaying Appointments: need to include the <Appointment id="last" time="1pm" /> as our constant last component??
