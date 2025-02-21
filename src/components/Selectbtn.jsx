import React from "react";

const Selectbtn = ({ day, setDays }) => {
  return (
    <span
      onClick={() => {
        setDays(day.value);
        console.log("day.val is " + day.value);
      }}
      className=" "
    >
      {day.label}
    </span>
  );
};

export default Selectbtn;
