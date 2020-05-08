import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { changeNotification } from "../reducers/notificationReducer";

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

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return filter
      ? anecdotes.filter((a) => a.content.toLowerCase().includes(filter))
      : anecdotes;
  });

  const addVote = (anecdote) => {
    dispatch(vote(anecdote));
    dispatch(changeNotification(`You voted ${anecdote.content}`));
    setTimeout(() => {
      dispatch(changeNotification(null));
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map((anec) => (
        <Anecdote
          key={anec.id}
          anecdote={anec}
          handleClick={() => addVote(anec)}
        />
      ))}
    </div>
  );
};

export default Anecdotes;
