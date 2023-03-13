import React from "react";

import "../css/SideList.css";
import LastItem from "./LastItem";

import { useStateContext } from "../context/StateContext";

const ListItem = ({ item, children, level }) => {
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
					onClick={(e) => {
						e.stopPropagation();
						handleClick(item.type, item.id);
					}}
					className={item.type === "folder" ? "folder" : "project"}
					style={{ marginLeft: 10 }}
				>
					<details>
						<summary>{item.itemText}</summary>
						<ul>
							{item.level.map((item, index) => (
								<ListItem
									item={item}
									level={item.level !== undefined}
									key={item.itemText + index}
								>
									{item?.level && (
										<ul>
											{item.level.map((item) => (
												<LastItem item={item} />
											))}
										</ul>
									)}
								</ListItem>
							))}
						</ul>
					</details>
				</li>
			) : (
				<li
					onClick={(e) => {
						e.stopPropagation();
						handleClick(item.type, item.id);
					}}
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
