import React from "react";
import "../css/DisplayContainer.css";
import DisplayCard from "./DisplayCard";
import { useStateContext } from "../context/StateContext";

export default function DisplayContainer() {
  const { projectItems} = useStateContext();


  return (
    <>   

        <div id="contentDisplayer">
        {
          projectItems.length ? (
            projectItems.map((project)=>(
              Object.keys(project).length ? 
              <DisplayCard project={project} key={project.id} />
              : ''
            ))
          ) : (
            <h3 >NO FOLDERS FOR THIS PROJECT!</h3>
          )
        }       
       
        
        </div>
    
    </>
  );
}
