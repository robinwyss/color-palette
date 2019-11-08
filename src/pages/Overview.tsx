import React from 'react';
import { NavLink } from "react-router-dom"

class Overview extends React.Component {
    render() {
        return (
            <div>
                <div>Hello</div>
                <NavLink to="/editor">Create Theme</NavLink>
            </div>
        )
    }
}

export default Overview;