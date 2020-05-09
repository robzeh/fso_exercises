import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AnecdoteList from "./AnecdoteList";
import CreateNew from "./CreateNew";
import About from "./About";

const Menu = ({ anecdotes, addNew }) => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          Anecdotes
        </Link>
        <Link style={padding} to="/create">
          Create New
        </Link>
        <Link style={padding} to="/about">
          About
        </Link>
      </div>
      <Switch>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
    </Router>
  );
};

export default Menu;
