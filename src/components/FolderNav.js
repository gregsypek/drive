import React, { useEffect, useState } from "react";
import "../css/DisplayContainer.css";
import dots from "../pics/three-dots.png";
import { toast } from "react-hot-toast";

import { Modal, Input } from "antd";
import { Dropdown } from "antd";
import {
	FolderAddOutlined,
	SecurityScanTwoTone,
	SendOutlined,
} from "@ant-design/icons";
import { useStateContext } from "../context/StateContext";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";

const FolderNav = () => {
	const { id } = useParams();
	const {
		projectItems,
		setProjectItems,
		folders,
		setFolders,
		findFoldersById,
		onAddFolder,
		onRemove,
		onUpdateByArray,
	} = useStateContext();
	const [newFolderName, setNewFolderName] = useState("");

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [uploadedProjectName, setUploadedProjectName] = useState("");
	const showModalAdd = () => {
		setIsModalVisible(true);
	};
	const handleModalAddCancel = () => {
		setIsModalVisible(false);
	};

	const folderAddUpload = () => {
		if (newFolderName.length > 0) {
			// const activeArray = findFoldersById(projectItems, Number(id)).folders  ;

			// [{id: 11, name: 'folder 1', folders: Array(2)},{}]
			const activeArray = findFoldersById(projectItems, id)?.folders;

			console.log(
				"🚀 ~ file: FolderNav.js:33 ~ folderAddUpload ~ activeArray:",
				activeArray
			);

			const newFolderObject = {
				id: nanoid(),
				name: newFolderName,
				folders: [],
			};

			// setNewFolder(prevState=>(
			// 	{...prevState,  id: newFolderId, name: newFolderName }))
			// console.log('nav', newFolder)

			console.log(
				"🚀 ~ file: FolderNav.js:48 ~ folderAddUpload ~ newFolderObject:",
				newFolderObject
			);

			const dd = onUpdateByArray(projectItems, activeArray, newFolderObject);

			console.log("dd", dd);

			setProjectItems(() => [...dd]);
			console.log("projectItems", projectItems);

			setIsModalVisible(false);
			setNewFolderName("");
		} else {
			toast.error("Project Name must have at least one character!");
			setIsModalVisible(false);
			return;
		}
	};

	const onClick = ({ key }) => {
		if (key === "1") {
			toast.success("New Folder has been created successfully");
		}
	};

	const items = [
		{
			label: "Nowy Folder",
			key: "1",
			icon: <FolderAddOutlined />,
		},
	];

	useEffect(() => {
		findFoldersById(projectItems, Number(id));
	}, [folders, projectItems]);
	return (
		<>
			<div id="displayNav">
				<p>
					Heading {id}
					{newFolderName}
				</p>
				{/* <p>{console.log('find',findFoldersById(projectItems, Number(id)).folders)}</p> */}
				<Dropdown
					menu={{
						items,
						onClick,
					}}
				>
					<img
						src={dots}
						alt="dots"
						className="opacity"
						onClick={showModalAdd}
					/>
				</Dropdown>
			</div>
			<Modal
				title="Add new Folder"
				open={isModalVisible}
				onOk={folderAddUpload}
				onCancel={handleModalAddCancel}
			>
				<Input
					placeholder="Enter the Folder Name..."
					onChange={(event) => setNewFolderName(event.target.value)}
					value={newFolderName}
				/>
			</Modal>
		</>
	);
};

export default FolderNav;
