/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import "../css/SideList.css";
// import {toast} from 'react-hot-toast';
import { nanoid } from "nanoid";

import { useStateContext } from "../context/StateContext";
import ListItem from "./ListItem";

export default function SideList() {
	const {
		filterCurrentDisplayItems,
		filteredItems,
		currentFolderId,
		setCurrentFolderId,
		sortAndFilter,
		createSideList,
		sideList,
	} = useStateContext();
	// const [showSubList, setShowSubList] = useState(false);

	// console.log("🚀 ~ file: SideList.js:11 ~ SideList ~ items:", items);

	const handleClick = (type, id) => {
		console.log("🚀 ~ file: SideList.js:41 ~ handleClick ~ id222:", id);
		// console.log("🚀 ~ file: SideList.js:41 ~ handleClick ~ type222:", type)

		if (type === "folder") {
			setCurrentFolderId(id);
			filterCurrentDisplayItems(currentFolderId);
		}
		// if (filteredItems.length) {
		// 	const subList = `

		// 		<ul>
		// 			{	filteredItems.map((item, index) => (
		// 					<li
		// 						onClick={() => handleClick(item.type, item.id)}
		// 						className={item.type === "folder" ? "folder" : "project"}
		// 						key={index}
		// 					>
		// 						{item.itemText}
		// 					</li>
		// 				)) }
		// 			</ul>
		// 			`;

		// 	console.log(
		// 		"🚀 ~ file: SideList.js:45 ~ handleClick ~ subList:",
		// 		subList
		// 	);
		// }
		// setShowSubList(true);
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
						{sortAndFilter(sideList).map((item, index) => {
							if (item.id === currentFolderId)
								return (
									<>
										<ListItem item={item} />

										<ul>
											{filteredItems.map((item, index) => (
												<ListItem item={item} />
											))}
										</ul>
									</>
								);
							return <ListItem item={item} />;
						})}
					</ul>
				</div>
			</div>
		</>
	);
}
