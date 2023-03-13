import React, { useEffect, useState } from "react";
import "../css/SideList.css";
import { toast } from "react-hot-toast";
import { Modal, Input, Radio } from "antd";
import { nanoid } from "nanoid";

import { useStateContext } from "../context/StateContext";
import ListItem from "./ListItem";
import LastItem from "./LastItem";

export default function SideList() {
	const { allItems, setSideList, sideList, setAllItems, setProjects, setDirs } =
		useStateContext();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [newProjectName, setNewProjectName] = useState("");
	const [value, setValue] = useState(1);

	const onChange = (e) => {
		console.log("radio checked", e.target.value);
		setValue(e.target.value);
	};

	const findChildren = (id) => {
		return allItems.filter((item) => item.folderId === id);
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

	const createSideList = (allItems) => {
		let filterDirs;
		filterDirs = allItems.filter((item) => item.folderId === null);

		createLevel(filterDirs);

		setSideList(filterDirs);
	};
	const onAdd = (project) => {
		console.log("🚀 ~ file: SideList.js:66 ~ onAdd ~ project:", project);
		// for sideList update
		setAllItems([...allItems, { ...project }]);
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
		createSideList(allItems);
	}, [allItems]);

	return (
		<>
			<div id="sideList">
				<button id="linkBtn">
					<p onClick={showModalAdd}>Add New </p>
				</button>

				<div id="sideListOpt">
					<ul className="tree">
						{sideList.map((item, index) => (
							<ListItem
								item={item}
								level={item.level !== undefined}
								key={item.itemText + index}
							>
								{item?.level && (
									<ul>
										{item.level.map((item) => (
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
								)}
							</ListItem>
						))}
						{/* {sideList.map((item, index) => (
							<ListItem
								item={item}
								level={item.level !== undefined}
								key={item.itemText + index}
							>
								{item?.level && (
									<ul>
										{item.level.map((item) => (
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
								)}
							</ListItem>
						))} */}
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
