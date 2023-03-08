import React from "react";
import folder from "../pics/folder.png";
import dots from "../pics/three-dots.png";
import "../css/SideList.css";
// import {toast} from 'react-hot-toast';

import { useStateContext } from "../context/StateContext";

export default function SideList() {
	const { items, setItems } = useStateContext();
	console.log("🚀 ~ file: SideList.js:11 ~ SideList ~ items:", items)

	return (
		<>
			<div id="sideList">
				<button id="linkBtn">
					<p>New</p>
				</button>
				<div id="sideListOpt">	
						<ul>						
							{items.map((item) => (<li className={item.type === 'project' ? 'folder' : 'file'} key={item.id}>{item.itemText}</li>))}		
						</ul>	
					
				</div>
			</div>
		</>
	);
}
