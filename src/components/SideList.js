/* eslint-disable no-unused-expressions */
import React, { useEffect } from "react";
import "../css/SideList.css";
// import {toast} from 'react-hot-toast';

import { useStateContext } from "../context/StateContext";

export default function SideList() {
	const {
		items,
		filterCurrentDisplayItems,
		filteredItems,
		currentFolderId,
		setCurrentFolderId,
	} = useStateContext();
	console.log("🚀 ~ file: SideList.js:11 ~ SideList ~ items:", items);



	const sortAndFilter = (arr) => {
		const sorted = arr.sort((a, b) => {
			if (a.itemText < b.itemText) return -1;
			if (a.itemText > b.itemText) return 1;
			return 0;
		});
		const folders = sorted.filter((item) => item.type === "folder");
		const projects = sorted.filter((item) => item.type === "project");
		return [...folders, ...projects];
	};
	const handleClick = (type, id) => {
		console.log("🚀 ~ file: SideList.js:41 ~ handleClick ~ id222:", id)
		console.log("🚀 ~ file: SideList.js:41 ~ handleClick ~ type222:", type)
		if (type === "folder") {
			setCurrentFolderId(id);
			filterCurrentDisplayItems(currentFolderId);
		}
	};

	useEffect(() => {
		filterCurrentDisplayItems(currentFolderId);
	}, [currentFolderId]);

	return (
		<>
			<div id="sideList">
				<button id="linkBtn">
					<p>New</p>
				</button>
				<div id="sideListOpt">
			
					<ul>
						{sortAndFilter(filteredItems).map((item) => (
							<li
								onClick={() => handleClick(item.type, item.id)}
								className={item.type === "folder" ? "folder" : "project"}
								key={item.id}
							>
								{item.itemText}
							</li>
						))}
					
					</ul>
				</div>
			</div>
		</>
	);
}
