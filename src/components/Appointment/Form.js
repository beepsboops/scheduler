import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [name, setName] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  // State handling for form input errors
  const [error, setError] = useState("");

  // Reset function
  const reset = function () {
    setName("");
    // For resetting error message
    setError("");
    setInterviewer(null);
  };

  // Cancel function
  const cancel = function () {
    reset();
    props.onCancel && props.onCancel();
  };

  // For handling student name input
  const handleChange = function (e) {
    setName(e.target.value);
  };

  // For validating that student name entered and interviewer selected
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Interviewer must be selected");
      return;
    }
    // Resetting error message, saving appointment when no errors occur
    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={"Enter Student Name"}
            value={name}
            onChange={handleChange}
            // Test code
            data-testid="student-name-input"
            /*
          This must be a controlled component
        */
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
