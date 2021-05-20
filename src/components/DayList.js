import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const days = props.days.map((day) => {
    console.log("LOG: DayList: props:", props);
    console.log("LOG: DayList: day.spots:", day.spots);
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });
  return <ul>{days}</ul>;
}

//   // const buttonClass = classnames("button", {
//   //   "button--confirm": props.confirm,
//   //   "button--danger": props.danger,
//   // });

// return (
//   <ul>
//     <DayListItem
//       name={"Monday"}
//       spots={day.spots}
//       selected={day.name === props.day}
//       setDay={props.setDay}
//     />

//     <DayListItem
//       name={"Tuesday"}
//       spots={day.spots}
//       selected={day.name === props.day}
//       setDay={props.setDay}
//     />
//   </ul>
// );
