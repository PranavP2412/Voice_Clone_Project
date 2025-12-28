import React from "react";

function Box(props){

return (
    <div className="feature-card">
      <div className="feature-icon">
        {props.icon}
      </div>
      <div className="feature-content">
        <h4>{props.title}</h4>
        <p>{props.description}</p>
      </div>
    </div>

    )
}

export default Box;