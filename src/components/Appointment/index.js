import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";

export default function Appointment(props) {
  console.log("index: props:", props);
  console.log("index: props.interview.interviewer:", props.interview);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    // W07D04 Using Our Custom Hook: My conditional logic. Proper???
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header id={props.id} time={props.time} />
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer2={props.interview.interviewer.name}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={[]}
          onSave={props.onSave}
          onCancel={() => back(EMPTY)}
        />
      )}
    </article>
  );
}
// From W07D2 Displaying Appointments: need to include the <Appointment id="last" time="1pm" /> as our constant last component??
