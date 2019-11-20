import React from "react";
import { NavLink } from "react-router-dom";
import { loadSchemes } from "../../lib/LocalStorage";

class Overview extends React.Component {
  render() {
    var schemes = loadSchemes();
    return (
      <div>
        <h1>Hello</h1>
        {schemes.map(scheme => (
          <div key={scheme.id}>
            <NavLink to={"/scheme/" + scheme.id}>{scheme.name}</NavLink>
          </div>
        ))}
        <NavLink to="/editor">Create Scheme</NavLink>
      </div>
    );
  }
}

export default Overview;
