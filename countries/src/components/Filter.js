import React from "react";

const Filter = ({ filter, filterChange }) => {
  return (
    <>
      find countries <input value={filter} onChange={filterChange}></input>
    </>
  );
};

export default Filter;
