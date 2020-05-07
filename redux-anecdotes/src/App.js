import React from "react";

import Anecdotes from "./components/Anecdotes";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <AnecdoteForm />
      <Anecdotes />
    </div>
  );
};

export default App;
