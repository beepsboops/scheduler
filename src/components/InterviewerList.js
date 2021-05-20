import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  console.log("InterviewerList: props:", props);

  const interviewers = props.interviewers.map((interviewer) => {
    console.log("InterviewerList: interviewer:", interviewer);

    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={() => props.setInterviewer(interviewer.id)}
        selected={interviewer.id === props.interviewer}
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
