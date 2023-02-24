import React from "react";
import "../css/DisplayContainer.css";
import file from "../pics/blue-file.png";


export default function DisplayCard() {
  return (
    <div className="displayCard">
    <img src={file} alt="file" className="opacity" />
    
    </div>
  );
}
