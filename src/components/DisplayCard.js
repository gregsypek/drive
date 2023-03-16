import React, { useEffect, useState } from "react";
import "../css/DisplayContainer.css";
import folder from "../pics/folder.png";
import file from "../pics/blue-file.png";
import { useStateContext } from "../context/StateContext";
import { Dropdown, theme } from "antd";
import {
	DeleteOutlined,
	FolderAddOutlined,
	ExclamationCircleFilled,
	
} from "@ant-design/icons";
import { toast } from "react-hot-toast";
import { Modal, Input } from "antd";
import { nanoid } from "nanoid";

export default function DisplayCard({ data }) {
	const {
		filterCurrentDisplayItems,
		currentFolderId,
		setCurrentFolderId,
		setAllItems,
		allItems,
		setcurrentItemName,
		setDirs,
		onRemove,createSideList
	} = useStateContext();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [newProjectName, setNewProjectName] = useState("");
	const { confirm } = Modal;

	const handleClick = (type, id) => {
		if (type === "folder") {
			setCurrentFolderId(id);
			filterCurrentDisplayItems(currentFolderId);
		}
		setcurrentItemName(data.itemText);
	};

	const showModalAdd = () => {
		setIsModalVisible(true);
	};

	const handleModalAddCancel = () => {
		setIsModalVisible(false);
	};

	const showDeleteConfirm = () => {
		confirm({
			title: "Delete this item?",
			icon: <ExclamationCircleFilled />,
			content: "This item will be deleted permanently with all content inside!",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			onOk() {
			onRemove(data.id);
				toast.success("success");
			},
			onCancel() {},
		});
	};

	const onClick = ({ key }) => {
		if (key === "1") {
			// const deleted = projectItems.map(obj=> onRemoveByObject(obj, activeProject))
			showModalAdd();
			// setProjectItems(deleted)
		}
		if (key === "2") {
			showDeleteConfirm();
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
				type: "folder",
				itemText: newProjectName,
				folderId: data.id,
			};
			// console.log("🚀 ~ file: DisplayCard.js:56 ~ projectAddUpload ~ newItem:", newItem)
			// console.log("🚀 ~ file: DisplayCard.js:56 ~ allItems ~ allItems:", allItems)

			setAllItems([...allItems, { ...newItem }]);
			setDirs((prevState) => [...prevState, { ...newItem }]);

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
			label: "New Folder",
			key: "1",
			icon: <FolderAddOutlined />,
		},
		{
			label: "Delete",
			key: "2",
			icon: <DeleteOutlined />,
		},
	];
	const {
		token: { colorTextTertiary },
	} = theme.useToken();

	useEffect(() => {
		// console.log('allItems', allItems)
		createSideList(allItems);
	}, [setAllItems]);
	return (
		<>
			{data.type === "folder" ? (
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
			) : (
				<div id="displayCard" onClick={() => handleClick(data.type, data.id)}>
					<img
						src={data.type === "folder" ? folder : file}
						alt="file"
						className="opacity"
					/>
					<h2 className="opacity">{data.itemText}</h2>
				</div>
			)}

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
