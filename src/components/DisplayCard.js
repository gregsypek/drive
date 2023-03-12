import React, { useEffect, useState } from "react";
import "../css/DisplayContainer.css";
import folder from "../pics/folder.png";
import file from "../pics/blue-file.png";
import { useStateContext } from "../context/StateContext";
import { Dropdown, theme } from "antd";
import { DeleteOutlined, FolderAddOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";
import { Modal, Input, Radio } from "antd";
import { nanoid } from "nanoid";

export default function DisplayCard({ data }) {
	const { filterCurrentDisplayItems, currentFolderId, setCurrentFolderId,setAllItems, allItems } =
		useStateContext();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [newProjectName, setNewProjectName] = useState("");

	const handleClick = (type, id) => {
		if (type === "folder") {
			setCurrentFolderId(id);
			filterCurrentDisplayItems(currentFolderId);
		}
	};
	const showModalAdd = () => {
		setIsModalVisible(true);
	};
	const handleModalAddCancel = () => {
		setIsModalVisible(false);
	};
	const onClick = ({ key }) => {
		if (key === "1") {
			// const deleted = projectItems.map(obj=> onRemoveByObject(obj, activeProject))
			showModalAdd();
			// setProjectItems(deleted)
		}
		if (key === "2") {
			// showModalRename();
			toast.success("Folder Rename not implemented yet");
		}
	};

	const projectAddUpload = () => {
		if (newProjectName.length > 0) {
			console.log(
				"🚀 ~ file: DisplayCard.js:45 ~ projectAddUpload ~ newProjectName:",
				newProjectName
			);

			console.log("🚀 ~ file: DisplayCard.js:15 ~ handleClick ~ id:", data.id);
			const newItem = {
				id: nanoid(),
				type: 'folder',
				itemText: newProjectName,
				folderId: data.id
			};
			// console.log("🚀 ~ file: DisplayCard.js:56 ~ projectAddUpload ~ newItem:", newItem)
			// console.log("🚀 ~ file: DisplayCard.js:56 ~ allItems ~ allItems:", allItems)

			setAllItems([...allItems, {...newItem}])
		

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

	const items = [
		{
			label: "Nowy Folder",
			key: "1",
			icon: <FolderAddOutlined />,
		},
		// {
		// 	label: "Delete",
		// 	key: "2",
		// 	icon: <DeleteOutlined />,
		// },
	];
	const {
		token: { colorTextTertiary },
	} = theme.useToken();



useEffect(() => {
console.log('allItems', allItems)
}, [allItems])

	return (
		<>
			<Dropdown
				menu={{
					items,
					onClick,
				}}
				trigger={["contextMenu"]}
				onClick={(e) => e.preventDefault()}
			>
				<div id="displayCard" onClick={() => handleClick(data.type, data.id)}>
					<img
						src={data.type === "folder" ? folder : file}
						alt="file"
						className="opacity"
					/>
					<h2 className="opacity">{data.itemText}</h2>
				</div>
			</Dropdown>
			{/* <AddFolder data={data}/> */}
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
			</Modal>
		</>
	);
}
