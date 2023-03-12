import React, { useEffect, useState } from "react";
import "../css/SideList.css";
// import {toast} from 'react-hot-toast';
import { nanoid } from "nanoid";

import { useStateContext } from "../context/StateContext";
import ListItem from "./ListItem";

export default function SideList() {
	const {
		filterCurrentDisplayItems,
		currentFolderId,
		setCurrentFolderId,
		items,
		setSideList,
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
	};
	const findChildren = (id) => {
		return items.filter((item) => item.folderId === id);
	};

	const createLevel = (arr) => {
		arr.map((obj, index) => {
			if (findChildren(obj.id).length) {
				obj["level"] = findChildren(obj.id);
				return createLevel(obj["level"]);
			}
			return obj;
		});
		return arr;
	};

	const createSideList = (items) => {
		let filterDirs;
		filterDirs = items.filter((item) => item.folderId === null);

		createLevel(filterDirs);

		// console.log('fillllll',JSON.stringify(filterDirs, undefined, 4))
		setSideList(filterDirs);
	};

	useEffect(() => {
		createSideList(items);
	}, []);

	return (
		<>
			<div id="sideList">
				<button id="linkBtn">
					<p>New</p>
				</button>

				<div id="sideListOpt">
					<ul className="tree">
						{sideList.map((item, index) => (
							<li
								className={item.type === "folder" ? "folder" : "project"}
								onClick={(e) => {
									e.stopPropagation();
									handleClick(item.type, item.id);
								}}
								key={item.itemText+ index}
							>
								<details>
									<summary>{item.itemText}</summary>

									{item?.level && (
										<ul>
											{item.level.map((item) => (
												<li
													className={
														item.type === "folder" ? "folder" : "project"
													}
													onClick={(e) => {
														e.stopPropagation();
														handleClick(item.type, item.id);
													}}
													key={item.itemText+ index}
												>
													<details>
														<summary>{item.itemText}</summary>
														{item?.level && (
															<ul>
																{item.level.map((item) => (
																	<li
																		className={
																			item.type === "folder"
																				? "folder"
																				: "project"
																		}
																		onClick={(e) => {
																			e.stopPropagation();
																			handleClick(item.type, item.id);
																		}}
																		key={item.itemText+ index}
																	>
																		{item.itemText}
																	</li>
																))}
															</ul>
														)}
													</details>
												</li>
											))}
										</ul>
									)}
								</details>
							</li>
						))}					
						{/* VERSION WITHOUT DETAILS */}
						{/* {sideList.map((item, index) => (
							<li>
								{item.itemText}*
								{item?.level && (
									<ul>
										{item.level.map((obj) => (
											<li>
												{obj.itemText}**
												{obj?.level && (
													<ul>
														{obj.level.map((obj2) => (
															<li>{obj2.itemText}***</li>
														))}
													</ul>
												)}
											</li>
										))}
									</ul>
								)}
							</li>
						))} */}
					</ul>
					{/* VERSION CLEAN HTML */}
					{/* <ul className="tree">
						<li>
							<details>
								<summary>Osiedle Zielone</summary>
								<ul>
									<li>Osiedle Zielone Etap 1</li>
									<li>Osiedle Zielone Etap 2</li>
								</ul>
							</details>
						</li>
						<li>
							<details>
								<summary>Administracja nieruchomosciami</summary>
								<ul>
									<li>
										<details>
											<summary>Archiwum</summary>
											<ul>
												<li>Archiwum 2004</li>
												<li>Przegląd budowlany 5 letni</li>
											</ul>
										</details>
									</li>
									<li>Przeglad budowlany roczny 2023</li>
								</ul>
							</details>
						</li>

						<li>Pusty Folder testowo 1</li>
						<li>Zarzadzanie nieruchomoscią v1</li>
						<li>Hala magazynowa C</li>
					</ul> */}
				</div>
			</div>
		</>
	);
}
