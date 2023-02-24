import React from "react";
import folder from "../pics/folder.png";
import dots from "../pics/three-dots.png";
import "../css/SideBar.css";
// import {toast} from 'react-hot-toast';

import { useStateContext } from "../context/StateContext";

export default function SideBar() {
	const { projectItems } = useStateContext();

	return (
		<>
			<div id="sideBar">
				<button id="linkBtn">
					<p>New</p>
				</button>
				{console.log(projectItems)}

				<div id="sideBarOpt">
					{projectItems.length
						? projectItems.map(({name}) => (
								<div className="sideBarOptions">
									<img src={folder} alt="folder" className="opacity" />
									<h3>{name}</h3>
									<img src={dots} alt="dots" className="opacity" />
								</div>
						  ))
						: (
              <p className="empty-list">You have no projects. Please add new one</p>
            )}

				
				</div>
			</div>
		</>
	);
}
