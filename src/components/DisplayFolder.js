import React from "react";
import "../css/DisplayContainer.css";

import { Dropdown } from "antd";
import { useState } from "react";
import folder from "../pics/folder.png";
import file from "../pics/blue-file.png";

import {
	DeleteOutlined,
	FolderAddOutlined,
	ExclamationCircleFilled,
	EditOutlined,
	InteractionOutlined,
} from "@ant-design/icons";
import { toast } from "react-hot-toast";
import { Modal, Input } from "antd";
import { nanoid } from "nanoid";
import { useStateContext } from "../context/StateContext";
import SideList from "./SideList";
import TransferItem from "./TransferItem";

const DisplayFolder = ({ data }) => {
	const { type, id, itemText } = data;
	const {
		filterCurrentDisplayItems,
		currentFolderId,
		setCurrentFolderId,
		setAllItems,
		setProjects,
		allItems,
		sideList,
		setcurrentItemName,
		setDirs,
		onRemove,
		transferValue,
		createSideList,
	} = useStateContext();

	const [isModalMoveVisible, setIsModalMoveVisible] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalRenameVisible, setIsModalRenameVisible] = useState(false);
	const [uploadedProjectName, setUploadedProjectName] = useState("");
	const [newProjectName, setNewProjectName] = useState("");
	const { confirm } = Modal;

	const showModalMove = () => {
		setIsModalMoveVisible(true);
	};

	const handleClick = (type, id) => {
		if (type === "folder") {
			setCurrentFolderId(id);
			filterCurrentDisplayItems(currentFolderId);
		}
		setcurrentItemName(itemText);
	};
	const showModalAdd = () => {
		setIsModalVisible(true);
	};
	const handleModalMoveCancel = () => {
		setIsModalMoveVisible(false);
	};
	const showModalRename = () => {
		setIsModalRenameVisible(true);
	};

	const handleModalAddCancel = () => {
		setIsModalVisible(false);
	};
	const handleModalRenameCancel = () => {
		setIsModalRenameVisible(false);
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
				onRemove(id, type);
				// console.log(
				// 	"🚀 ~ file: DisplayCard.js:60 ~ onOk ~ allItems:",
				// 	allItems
				// );

				// createSideList(allItems);
				toast.success("success");
			},
			onCancel() {},
		});
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
		{
			label: "Rename",
			key: "3",
			icon: <EditOutlined />,
		},
		{
			label: "Move",
			key: "4",
			icon: <InteractionOutlined />,
		},
	];

	const onClick = ({ key }) => {
		if (key === "1") {
			showModalAdd();
		}
		if (key === "2") {
			showDeleteConfirm();
		}
		if (key === "3") {
			showModalRename();
		}
		if (key === "4") {
			showModalMove();
		}
	};
	const projectAddUpload = () => {
		if (newProjectName.length > 0) {
			const newItem = {
				id: nanoid(),
				type: "folder",
				itemText: newProjectName,
				folderId: data.id,
			};

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
	const projectRenameUpload = (id) => {
		console.log("uploadedProjectName", uploadedProjectName);
		// console.log("foundProject here", foundProject);

		if (uploadedProjectName.length > 0) {
			console.log("🚀 ~ file: DisplayCard.js:122 ~ idd ~ idd:", id);

			setAllItems((prevState) => {
				return prevState.map((item) => {
					if (item.id === id) {
						return { ...item, itemText: uploadedProjectName };
					}
					return item;
				});
			});

			setDirs((prevState) => {
				return prevState.map((item) => {
					if (item.id === id) {
						return { ...item, itemText: uploadedProjectName };
					}
					return item;
				});
			});

			setIsModalRenameVisible(false);
			setUploadedProjectName("");
			toast.success("Project has been uploaded!");
		} else {
			toast.error("Project Name must have at least one character!");
			setIsModalRenameVisible(false);
			return;
		}
	};

	const projectMoveUpload = (id, type) => {
		const findOne = allItems.filter((project) => project.id === id);
		const updatedFindOne = {
			...findOne[0],
			folderId: transferValue.moveInto,
		};

		setProjects((prevState) => {
			return prevState.map((item) => {
				if (item.id === id) {
					return { ...item, folderId: transferValue.moveInto };
				}
				return item;
			});
		});
		setDirs((prevState) => {
			return prevState.map((item) => {
				if (item.id === id) {
					return { ...item, folderId: transferValue.moveInto };
				}
				return item;
			});
		});

		setAllItems((prevState) => {
			return prevState.map((item) => {
				if (item.id === id) {
					return { ...item, folderId: transferValue.moveInto };
				}
				return item;
			});
		});
		createSideList(allItems);

		toast.success(
			`Success! You have just moved ${updatedFindOne.itemText} element`
		);
		setIsModalMoveVisible(false);
	};
	return (
		<>
			<Dropdown
				menu={{
					items,
					onClick,
				}}
				trigger={["contextMenu"]}
				onClick={() => handleClick(type, id)}
			>
				<div id="displayCard">
					<img
						src={type === "folder" ? folder : file}
						alt="file"
						className="opacity"
					/>
					<h2 className="opacity">{itemText}</h2>
				</div>
			</Dropdown>
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
			<Modal
				title="Update project name"
				open={isModalRenameVisible}
				onOk={() => projectRenameUpload(id)}
				onCancel={handleModalRenameCancel}
			>
				<Input
					placeholder="Enter New Project Name..."
					onChange={(event) => setUploadedProjectName(event.target.value)}
					defaultValue={itemText}
				/>
			</Modal>
			<Modal
				title={`'${itemText}' move into ...`}
				open={isModalMoveVisible}
				onOk={() => projectMoveUpload(data.id, type)}
				onCancel={handleModalMoveCancel}
			>
				<div id="sideListOpt">
					<ul className="tree">
						{sideList.map((item, index) => (
							<TransferItem
								item={item}
								level={item.level !== undefined}
								key={item.itemText + index}
							></TransferItem>
						))}
					</ul>
				</div>
			</Modal>
		</>
	);
};

export default DisplayFolder;
