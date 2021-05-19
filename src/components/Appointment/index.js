import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

export default function Appointment(props) {
  console.log("LOG: index: Appointment: props:", props);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // save Function receives name & interviewer from Form component & passes this to props.bookInterview
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    // Transition to SHOW when the promise returned by props.bookInterview resolves
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  }

  // cancel Function receives name & interviewer from Show component & passes this to props.cancelInterview
  function cancel(name, interviewer) {
    // console.log("LOG: index: hit cancel function");
    // console.log("LOG: index: name, interviewer:", name, interviewer);
    const interview = {
      student: name,
      interviewer,
    };
    transition(DELETING);
    props.cancelInterview(props.id, interview).then(() => {
      // console.log("LOG: index: cancel function: promise returned");
      transition(EMPTY);
    });
  }

  return (
    <article className="appointment">
      <Header id={props.id} time={props.time} />
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer2={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back(EMPTY)}
        />
      )}
      {mode === SAVING && <Status />}
      {mode === CONFIRM && (
        <Confirm
          message={"Delete the appointment?"}
          onCancel={() => back(EMPTY)}
          onConfirm={cancel}
        />
      )}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back(EMPTY)}
        />
      )}
    </article>
  );
}
// From W07D2 Displaying Appointments: need to include the <Appointment id="last" time="1pm" /> as our constant last component??
