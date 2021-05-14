import React from "react";
import "components/InterviewerListItem.scss";

const classnames = require("classnames");

export default function InterviewerListItem(props) {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  console.log("InterviewerListItem: props:", props);
  const handleClick = function () {
    props.setInterviewer(props.interviewer);
  };
  return (
    <li className={interviewerClass} onClick={handleClick}>
      <img
        className="interviewers__item-image"
        src={props.interviewer.avatar}
        alt={props.interviewer.name}
      />
      {props.selected && props.interviewer.name}
    </li>
  );

  /* Stock
    return (
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  );
  */
}
