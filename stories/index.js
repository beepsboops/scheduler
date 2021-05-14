import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import "index.scss";
import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment/index.js";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";

////////////
// Button //
////////////

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

/////////////////
// DayListItem //
/////////////////

storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  }) // Provides the default background color for our component
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ));

/////////////
// DayList //
/////////////

// Test Data
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));

/////////////////////////
// InterviewerListItem //
/////////////////////////

// Test Data
const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png",
};

storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={(event) => action("setInterviewer")(interviewer.id)}
      // setInterviewer={action("setInterviewer")}
    />
  ));

/////////////////////
// InterviewerList //
/////////////////////

// Test Data
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      setInterviewer={action("setInterviewer")}
    />
  ))
  .add("Preselected", () => (
    <InterviewerList
      interviewers={interviewers}
      interviewer={3}
      setInterviewer={action("setInterviewer")}
    />
  ));

/////////////////
// Appointment //
/////////////////

storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }],
  })
  .add("Appointment base", () => <Appointment />)
  .add("Appointment with Time", () => <Appointment time="12pm" />)
  .add("Header", () => <Header time="12pm" />)
  .add("Empty", () => <Empty onAdd={action("onAdd")} />)
  // Edit
  .add("Form edit", () => (
    <Form
      name={"Bart Simpson"}
      interviewers={interviewers}
      interviewer={2}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  ))
  // Create
  .add("Form create onSave", () => (
    <Form
      onSave={action("onSave")}
      onCancel={action("onCancel")}
      interviewers={interviewers}
    />
  ))
  // For assignment Displaying Appointments
  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="12pm" />
      <Appointment id="last" time="1pm" />
    </Fragment>
  ))
  .add("Appointment Booked", () => (
    <Fragment>
      <Appointment
        id={1}
        time="12pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment id="last" time="1pm" />
    </Fragment>
  ));

//////////
// Show //
//////////

storiesOf("Show", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }],
  })
  .add("Show", () => (
    <Show
      student={"Bart Simpson"}
      interviewer2={interviewer.name}
      onEdit={action("onEdit")}
      onDelete={action("onDelete")}
    />
  ));

/* Original, before refactoring
  .add("Show base", () => <Show />)
  .add("Some student", () => <Show student={"Bart Simpson"} />)
  .add("Interviewer", () => <Show interviewer2={interviewer.name} />)
  .add("Edit", () => <Show onEdit={action("onEdit")} />)
  .add("Delete", () => <Show onDelete={action("onDelete")} />);
*/

/////////////
// Confirm //
/////////////

storiesOf("Confirm", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }],
  })
  .add("Delete", () => (
    <Confirm
      message={"Delete the appointment?"}
      onConfirm={action("onConfirm")}
      onCancel={action("onCancel")}
    />
  ));

/* Original, before refactoring
  .add("Delete base", () => <Confirm />)
  .add("Delete appt message", () => (
    <Confirm message={"Delete the appointment?"} />
  ))
  .add("Confirm delete appt", () => <Confirm onConfirm={action("onConfirm")} />)
  .add("Cancel delete appt", () => <Confirm onCancel={action("onCancel")} />);
*/

////////////
// Status //
////////////

storiesOf("Status", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }],
  })
  .add("Status base", () => <Status />)
  .add("Status message", () => <Status message={"Deleting"} />);

///////////
// Error //
///////////

storiesOf("Error", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }],
  })
  .add("Error base", () => <Error />)
  .add("Error message", () => (
    <Error message={"Could not delete appointment."} />
  ))
  .add("onClose", () => <Error onClose={action("onClose")} />);
