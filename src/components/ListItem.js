import React from "react";
import { nanoid } from "nanoid";
import "../css/SideList.css";

import { useStateContext } from "../context/StateContext";

const ListItem = ({ item, level }) => {
	const { filterCurrentDisplayItems, currentFolderId, setCurrentFolderId } =
		useStateContext();

	const handleClick = (type, id) => {
		if (type === "folder") {
			setCurrentFolderId(id);
			filterCurrentDisplayItems(currentFolderId);
		}
	};

	return (
		<>
			<li
				onClick={() => handleClick(item.type, item.id)}
				className={item.type === "folder" ? "folder" : "project"}
				style={{ marginLeft: 10 }}
			>
				{item.itemText}
			</li>
		</>
	);
};

export default ListItem;
