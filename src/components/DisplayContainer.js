import React, { useEffect, useState } from "react";
import "../css/DisplayContainer.css";
import { toast } from "react-hot-toast";
import { nanoid } from "nanoid";

import DisplayCard from "./DisplayCard";
import { useStateContext } from "../context/StateContext";
import { Modal, Input, Radio } from "antd";

export default function DisplayContainer() {
	const {
		filterCurrentDisplayItems,
		filteredItems,
		currentFolderId,
		sortAndFilter,
		allItems,
		currentItemName,
		setAllItems,
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
	const showModalAdd = () => {
		setIsModalVisible(true);
	};
	const handleModalAddCancel = () => {
		setIsModalVisible(false);
	};
	const onAdd = (project) => {
		// for sideList update
		setAllItems([...allItems, { ...project }]);
		// for displayContainer update
		if (project.type === "project")
			setProjects((prevState) => [...prevState, project]);
		if (project.type === "folder")
			setDirs((prevState) => [...prevState, project]);
		toast.success("Success! New project added to the list");
	};

	const projectAddUpload = () => {
		if (newProjectName.length > 0) {
			onAdd({
				id: nanoid(),
				type: value === 1 ? "project" : "folder",
				itemText: newProjectName,
				folderId: currentFolderId,
			});

			setIsModalVisible(false);
			// clean input
			setNewProjectName("");
		} else {
			toast.error("Project Name must have at least one character!");
			setIsModalVisible(false);
			return;
		}
	};

	useEffect(() => {
		filterCurrentDisplayItems(currentFolderId);
	}, [currentFolderId, allItems]);

	return (
		<>
			<div id="displayCont">
				<div id="displayNav">
					<p>{currentItemName}</p>
					{currentFolderId && (
						<button id="linkBtn">
							<p onClick={showModalAdd}>Add New </p>
						</button>
					)}
				</div>
				<div id="contentDisplayer">
					{sortAndFilter(filteredItems).map((item, index) => (
						<DisplayCard data={item} key={index}>
							{item.itemText}
						</DisplayCard>
					))}

					<Modal
						title="Add new Item"
						open={isModalVisible}
						onOk={projectAddUpload}
						onCancel={handleModalAddCancel}
					>
						<Input
							placeholder="Enter the Item Name..."
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
