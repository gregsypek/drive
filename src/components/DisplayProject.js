import React from "react";
import "../css/DisplayContainer.css";
import "../css/SideList.css";

import { Dropdown } from "antd";

import { useState } from "react";
import folder from "../pics/folder.png";
import file from "../pics/blue-file.png";

import {
	DeleteOutlined,
	ExclamationCircleFilled,
	EditOutlined,
	InteractionOutlined,
} from "@ant-design/icons";
import { toast } from "react-hot-toast";
import { Modal, Input } from "antd";
import { useStateContext } from "../context/StateContext";
import ListItem from "./ListItem";
import TransferItem from "./TransferItem";

const DisplayProject = ({ data }) => {
	// console.log("🚀 ~ file: DisplayProject.js:39 ~ DisplayProject ~ data:", data);
	const { type, id, itemText } = data;
	const {
		setAllItems,
		setProjects,
		onRemove,
		setDirs,
		allItems,
		sideList,
		transferValue,
		createSideList,
	} = useStateContext();

	const [isModalRenameVisible, setIsModalRenameVisible] = useState(false);
	const [isModalMoveVisible, setIsModalMoveVisible] = useState(false);
	const [uploadedProjectName, setUploadedProjectName] = useState("");
	const { confirm } = Modal;

	const showModalRename = () => {
		setIsModalRenameVisible(true);
	};
	const showModalMove = () => {
		setIsModalMoveVisible(true);
	};

	const handleModalRenameCancel = () => {
		setIsModalRenameVisible(false);
	};
	const handleModalMoveCancel = () => {
		setIsModalMoveVisible(false);
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
				toast.success("success");
			},
			onCancel() {},
		});
	};

	const items = [
		{
			label: "Delete",
			key: "1",
			icon: <DeleteOutlined />,
		},
		{
			label: "Rename",
			key: "2",
			icon: <EditOutlined />,
		},
		{
			label: "Move",
			key: "3",
			icon: <InteractionOutlined />,
		},
	];

	const onClick = ({ key }) => {
		if (key === "1") {
			showDeleteConfirm();
		}
		if (key === "2") {
			showModalRename();
		}
		if (key === "3") {
			showModalMove();
		}
	};

	const projectRenameUpload = (id) => {
		console.log("uploadedProjectName", uploadedProjectName);

		if (uploadedProjectName.length > 0) {
			// console.log("🚀 ~ file: DisplayCard.js:122 ~ idd ~ idd:", id);

			setAllItems((prevState) => {
				return prevState.map((item) => {
					if (item.id === id) {
						return { ...item, itemText: uploadedProjectName };
					}
					return item;
				});
			});

			setProjects((prevState) => {
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
		const updatedFindOne = { ...findOne[0], folderId: transferValue.moveInto };

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
		// createSideList(allItems);

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
				title="Update project name"
				open={isModalRenameVisible}
				onOk={() => projectRenameUpload(data.id, type)}
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

export default DisplayProject;
