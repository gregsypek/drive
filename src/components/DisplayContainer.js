import React from "react";
import "../css/DisplayContainer.css";
import DisplayCard from "./DisplayCard";

export default function DisplayContainer() {
  return (
    <>
      <div id="displayCont">
        <div id="displayInfoNav">
          <p>Heading</p>

        </div>

        <div id="contentDisplayer">
          <DisplayCard />
          <DisplayCard />
          <DisplayCard />
          <DisplayCard />
          <DisplayCard />
          <DisplayCard />
          <DisplayCard />
          <DisplayCard />
          <DisplayCard />
        
        </div>
      </div>
    </>
  );
}
