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
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const filteredAnecdotes = filter
    ? anecdotes.filter((a) => a.content.toLowerCase().includes(filter))
    : anecdotes;

  const addVote = (anecdote) => {
    dispatch(vote(anecdote.id));
    dispatch(changeNotification(`You voted ${anecdote.content}`));
    setTimeout(() => {
      dispatch(changeNotification(null));
    }, 5000);
  };

  return (
    <div>
      {filteredAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((a) => (
          <Anecdote key={a.id} anecdote={a} handleClick={() => addVote(a)} />
        ))}
    </div>
  );
};

export default Anecdotes;
