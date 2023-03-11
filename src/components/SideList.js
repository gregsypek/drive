/* eslint-disable no-unused-expressions */
import React, { useEffect } from "react";
import "../css/SideList.css";
// import {toast} from 'react-hot-toast';

import { useStateContext } from "../context/StateContext";

export default function SideList() {
	const {
		filterCurrentDisplayItems,	
		currentFolderId,
		setCurrentFolderId,
		sortAndFilter,
		createSideList,
		sideList
	} = useStateContext();



	// console.log("🚀 ~ file: SideList.js:11 ~ SideList ~ items:", items);

	const handleClick = (type, id) => {
		// console.log("🚀 ~ file: SideList.js:41 ~ handleClick ~ id222:", id)
		// console.log("🚀 ~ file: SideList.js:41 ~ handleClick ~ type222:", type)
		if (type === "folder") {
			setCurrentFolderId(id);
			filterCurrentDisplayItems(currentFolderId);
		}
	};

	useEffect(() => {
		createSideList(currentFolderId);	
	}, []);

	return (
		<>
			<div id="sideList">
				<button id="linkBtn">
					<p>New</p>
				</button>
				<div id="sideListOpt">
					<ul>
					{sortAndFilter(sideList).map((item, index) => (
							<li
								onClick={() => handleClick(item.type, item.id)}
								className={item.type === "folder" ? "folder" : "project"}
								key={index}
							>
								{item.itemText}
							</li>
						)) }					
					</ul>
				</div>
			</div>
		</>
	);
}
