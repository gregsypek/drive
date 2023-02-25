import React from "react";
import "../css/DisplayContainer.css";
import folder from "../pics/folder.png";


export default function DisplayCard({name}) {
  return (
    <div className="displayCard">
    <img src={folder} alt="file" className="opacity" />
    <h2 className="opacity">{name}</h2>
    
    </div>
  );
}
