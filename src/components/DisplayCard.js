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
	EditOutlined,
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
		onRemove,
		createSideList,
	} = useStateContext();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalRenameVisible, setIsModalRenameVisible] = useState(false);
	const [uploadedProjectName, setUploadedProjectName] = useState("");
	const [newProjectName, setNewProjectName] = useState("");
	const { confirm } = Modal;

	const handleClick = (type, id) => {
		console.log("🚀 ~ file: DisplayCard.js:36 ~ handleClick ~ id:", id);
		if (type === "folder") {
			setCurrentFolderId(id);
			filterCurrentDisplayItems(currentFolderId);
		}
		setcurrentItemName(data.itemText);
	};

	const showModalAdd = () => {
		setIsModalVisible(true);
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
				onRemove(data.id);
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
			// console.log(
			// 	"🚀 ~ file: DisplayCard.js:156 ~ projectRenameUpload ~ allItems:",
			// 	allItems
			// );

			setIsModalRenameVisible(false);
			setUploadedProjectName("");
			toast.success("Project has been uploaded!");
		} else {
			toast.error("Project Name must have at least one character!");
			setIsModalRenameVisible(false);
			return;
		}
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
	];
	// const {
	// 	token: { colorTextTertiary },
	// } = theme.useToken();

	// useEffect(() => {
	// 	// console.log('allItems', allItems)
	// 	createSideList(allItems);
	// }, [setAllItems]);
	return (
		<>
			{data.type === "folder" ? (
				<Dropdown
					menu={{
						items,
						onClick,
					}}
					trigger={["contextMenu"]}
					onClick={() => handleClick(data.type, data.id)}
				>
					<div id="displayCard">
						<img
							src={data.type === "folder" ? folder : file}
							alt="file"
							className="opacity"
						/>
						<h2 className="opacity">{data.itemText}</h2>
					</div>
				</Dropdown>
			) : (
				<div id="displayCard">
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
			<Modal
				title="Update project name"
				open={isModalRenameVisible}
				onOk={() => projectRenameUpload(data.id)}
				onCancel={handleModalRenameCancel}
			>
				<Input
					placeholder="Enter New Project Name..."
					onChange={(event) => setUploadedProjectName(event.target.value)}
					value={uploadedProjectName}
					// value={foundProject.name}
				/>
			</Modal>
		</>
	);
}
