import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      {anecdote.content}
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  return (
    <div>
      {anecdotes.map((a) => (
        <Anecdote
          key={a.id}
          anecdote={a}
          handleClick={() => dispatch(vote(a.id))}
        />
      ))}
    </div>
  );
};

export default Anecdotes;
