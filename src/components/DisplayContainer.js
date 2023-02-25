import React from "react";
import "../css/DisplayContainer.css";
import DisplayCard from "./DisplayCard";
import { useStateContext } from "../context/StateContext";

export default function DisplayContainer() {
  const { projectItems} = useStateContext();
  return (
    <>
      <div id="displayCont">
        <div id="displayInfoNav">
          <p>Heading</p>

        </div>

        <div id="contentDisplayer">
        {
          projectItems.length ? (
            projectItems.map(({name})=>(
              <DisplayCard name={name}/>
            ))
          ) : (
            <h3>NO FOLDER FOR THIS PROJECT!</h3>
          )
        }
          
       
        
        </div>
      </div>
    </>
  );
}
