import React, { useEffect, useState } from "react";
import "../css/SideList.css";
import { toast } from "react-hot-toast";
import { Modal, Input, Radio } from "antd";
import { nanoid } from "nanoid";

import { useStateContext } from "../context/StateContext";

export default function SideList() {
	const {
		filterCurrentDisplayItems,
		currentFolderId,
		setCurrentFolderId,
		items,
		setSideList,
		sideList,
		setItems,
		setProjects,
		setDirs,
	} = useStateContext();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [newProjectName, setNewProjectName] = useState("");
	const [value, setValue] = useState(1);

	const onChange = (e) => {
		console.log("radio checked", e.target.value);
		setValue(e.target.value);
	};

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
	const onAdd = (project) => {
		// console.log("🚀 ~ file: SideList.js:66 ~ onAdd ~ project:", project);
		// for sideList update
		setItems([...items, { ...project }]);
		// for displayContainer update
		if (project.type === "project")
			setProjects((prevState) => [...prevState, project]);
		if (project.type === "folder")
			setDirs((prevState) => [...prevState, project]);

		// console.log("🚀 ~ file: StateContext.js:50 ~ onAdd ~ items:", items);

		toast.success("Success! New project added to the list");
	};

	const showModalAdd = () => {
		setIsModalVisible(true);
	};

	const handleModalAddCancel = () => {
		setIsModalVisible(false);
	};
	const projectAddUpload = () => {
		if (newProjectName.length > 0) {
			console.log(
				"🚀 ~ file: SideList.js:70 ~ projectAddUpload ~ newProjectName:",
				newProjectName
			);

			onAdd({
				id: nanoid(),
				type: value === 1 ? "project" : "folder",
				itemText: newProjectName,
				folderId: null,
			});

			setIsModalVisible(false);
			// clean input
			setNewProjectName("");
		} else {
			toast.error("Project Name must have at least one character!");
			setIsModalVisible(false);
			return;
		}
		// toast.success('Project has ben uploaded:)')
	};

	useEffect(() => {
		createSideList(items);
	}, [items]);

	return (
		<>
			<div id="sideList">
				<button id="linkBtn">
					<p onClick={showModalAdd}>Add New </p>
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
								key={item.itemText + index}
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
													key={item.itemText + index}
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
																		key={item.itemText + index}
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
					</ul>

					<Modal
						title="Add new Project"
						open={isModalVisible}
						onOk={projectAddUpload}
						onCancel={handleModalAddCancel}
					>
						<Input
							placeholder="Enter the Project Name..."
							onChange={(event) => setNewProjectName(event.target.value)}
							value={newProjectName}
						/>
						<Radio.Group onChange={onChange} value={value}>
							<Radio value={1}>Project</Radio>
							<Radio value={2}>Folder</Radio>
						</Radio.Group>
					</Modal>
				</div>
			</div>
		</>
	);
}
