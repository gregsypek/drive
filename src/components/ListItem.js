import React from "react";

import "../css/SideList.css";

import { useStateContext } from "../context/StateContext";

const ListItem = ({ item, children, level }) => {
	console.log("🚀 ~ file: ListItem.js:8 ~ ListItem ~ level:", level);
	const {
		filterCurrentDisplayItems,
		currentFolderId,
		setCurrentFolderId,
		setcurrentItemName,
	} = useStateContext();

	const handleClick = (type, id) => {
		// console.log("🚀 ~ file: SideList.js:41 ~ handleClick ~ id222:", id);
		// console.log("🚀 ~ file: SideList.js:41 ~ handleClick ~ type222:", type)

		if (type === "folder") {
			setCurrentFolderId(id);
			filterCurrentDisplayItems(currentFolderId);
		}
		setcurrentItemName(item.itemText);
	};

	return (
		<>
			{level ? (
				<li
					onClick={() => handleClick(item.type, item.id)}
					className={item.type === "folder" ? "folder" : "project"}
					style={{ marginLeft: 10 }}
				>
					<details>
						<summary>{item.itemText}</summary>
						{children}
					</details>
				</li>
			) : (
				<li
					onClick={() => handleClick(item.type, item.id)}
					className={item.type === "folder" ? "folder" : "project"}
					style={{ marginLeft: 10 }}
				>
					{item.itemText}

					{children}
				</li>
			)}
		</>
	);
};

export default ListItem;
