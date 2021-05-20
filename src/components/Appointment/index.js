import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // save function receives name & interviewer from Form component & passes to bookInterview
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    console.log("LOG: save: interview", interview);
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  }

  // cancel Function receives name & interviewer from Form component & passes to cancelInterview
  function cancel(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(DELETING, true);
    props
      .cancelInterview(props.id, interview)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
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
          onCancel={() => (props.interview ? transition(SHOW) : back(EMPTY))}
          onConfirm={cancel}
        />
      )}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back(EMPTY)}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"Could not save appointment"}
          onClose={() => (props.interview ? transition(SHOW) : back(EMPTY))}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Could not cancel appointment"}
          onClose={() => transition(SHOW)}
        />
      )}
    </article>
  );
}
