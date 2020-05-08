export const vote = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};

export const addAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    content,
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes,
  };
};

const anecdoteReducer = (state = [], action) => {
  console.log("action", action);
  switch (action.type) {
    case "NEW_ANECDOTE":
      return [...state, action.content];
    case "INIT_ANECDOTES":
      return action.data;
    case "VOTE":
      const id = action.data.id;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((a) => (a.id !== id ? a : changedAnecdote));
    default:
      return state;
  }
};

export default anecdoteReducer;
