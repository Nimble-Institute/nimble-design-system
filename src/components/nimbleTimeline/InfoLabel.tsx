import React from "react";
import moment from "moment";

export default ({ item, group, time }) => {
  const date = moment(time, "x");
  const label = group ? group.title : "";
  return (
    <div
      style={{
        position: "fixed",
        left: 100,
        bottom: 50,
        background: "rgba(0, 0, 0, 0.5)",
        color: "white",
        padding: 10,

        fontSize: 20,
        borderRadius: 5,
        zIndex: 85
      }}
    >
      {`${date.format("LLL")}, ${label} `}
    </div>
  );
};
