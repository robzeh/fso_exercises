import React from "react";

// const Result = ({ result }) => {
//   return <>{result.name}</>;
// };

const Results = ({ results }) => {
  if (results === "") {
    return <p>Search a country</p>;
  } else {
    return (
      <>
        <div>{results}</div>
      </>
    );
  }
};

export default Results;
