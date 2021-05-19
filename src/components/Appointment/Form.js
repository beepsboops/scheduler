import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

// Not seeing changes in state in console
export default function Form(props) {
  // console.log("LOG: Form: props:", props);
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  // Reset function
  const reset = function () {
    setName("");
    setInterviewer(null);
  };

  // Cancel function
  const cancel = function () {
    reset();
    props.onCancel && props.onCancel();
  };

  const handleChange = function (e) {
    // console.log("handleChange:", e.target.value);
    setName(e.target.value);
  };

  // const createOrEdit = function()

  return (
    <main className="appointment__card appointment__card--create">
      {/* {interviewer.avatar}____ */}
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            // Logic to either render Form in CREATE mode or EDIT
            placeholder={props.student ? props.student : "Enter Student Name"}
            // placeholder="Enter Student Name"
            value={name}
            onChange={handleChange}
            /*
          This must be a controlled component
        */
          />
        </form>
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
          <Button confirm onClick={() => props.onSave(name, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
