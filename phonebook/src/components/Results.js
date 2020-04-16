import React from "react";

const Results = ({ results }) => {
  if (results.length === 0) {
    return <p>Add a new person</p>;
  } else {
    return (
      <>
        <div>{results}</div>
      </>
    );
  }
};

export default Results;
