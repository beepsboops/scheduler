import React, { useState } from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

// What's going on here??? Differences in section. How function works with state? setInterviewer?
export default function InterviewerList(props) {
  console.log("InterviewerList: props:", props);
  // const [interviewerId, setInterviewerId] = useState(1);
  const interviewers = props.interviewers.map((interviewer) => {
    console.log("InterviewerList: interviewer:", interviewer);
    const isSelected =
      props.interviewer &&
      props.interviewer.id !== null &&
      props.interviewer.id === interviewer.id;
    return (
      <InterviewerListItem
        key={interviewer.id}
        interviewer={interviewer}
        setInterviewer={props.setInterviewer}
        selected={isSelected}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}

/* Stock
<section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list"></ul>
</section>
*/
