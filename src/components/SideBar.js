import React from "react";
import folder from "../pics/folder.png";
import dots from "../pics/three-dots.png";
import "../css/SideBar.css";

export default function SideBar() {
  return (
    <>
      <div id="sideBar">
        <button id="linkBtn">
          <p>New</p>
        </button>

        <div id="sideBarOpt">
          <div className="sideBarOptions">
            <img src={folder} alt="folder" className="opacity" />
            <h3>My folder</h3>
            <img src={dots} alt="dots" className="opacity" />        
          </div>
        </div>

      </div>
    </>
  );
}
