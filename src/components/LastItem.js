import React from "react";

import "../css/SideList.css";

import { useStateContext } from "../context/StateContext";

const ListItem = ({ item }) => {
	const { filterCurrentDisplayItems, currentFolderId, setCurrentFolderId } =
		useStateContext();

	const handleClick = (type, id) => {
		console.log("🚀 ~ file: SideList.js:41 ~ handleClick ~ id222:", id);
		console.log("🚀 ~ file: SideList.js:41 ~ handleClick ~ type222:", type);

		if (type === "folder") {
			setCurrentFolderId(id);
			filterCurrentDisplayItems(currentFolderId);
		}
	};

	return (
		<>
			<li
				onClick={(e) => {
					e.stopPropagation();
					handleClick(item.type, item.id);
				}}
				className={item.type === "folder" ? "folder" : "project"}
				style={{ marginLeft: 10 }}
			>
				{item.itemText}
			</li>
		</>
	);
};

export default ListItem;
