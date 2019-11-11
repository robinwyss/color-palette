import React from "react";
import { NavLink } from "react-router-dom";
import { loadThemes } from "../lib/LocalStorage";

class Overview extends React.Component {
  render() {
    var themes = loadThemes();
    return (
      <div>
        <h1>Hello</h1>
        {themes.map(theme => (
          <div>
            <NavLink to={"/theme/" + theme.id}>{theme.name}</NavLink>
          </div>
        ))}
        <NavLink to="/editor">Create Theme</NavLink>
      </div>
    );
  }
}

export default Overview;
