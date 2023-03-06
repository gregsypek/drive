import React, { useEffect, useState } from "react";
import folder from "../pics/folder.png";
import dots from "../pics/three-dots.png";
import { Modal, Input } from "antd";
import "../css/SideBar.css";
import { toast } from "react-hot-toast";
import {
	DeleteOutlined,
	EditOutlined,
	FolderFilled,
	MoreOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useStateContext } from "../context/StateContext";

import { MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";

function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
}
const items2 = [
	getItem("Navigation Two", "sub2", <MailOutlined />, [
		getItem("Option 5", "5"),
		getItem("Option 6", "6"),
		getItem("Submenu", "sub3", null, [
			getItem("Option 7", "7"),
			getItem("Option 8", "8"),
		]),
	]),
];

const items3 = [
	getItem('Project1', 'sub1',  <MailOutlined />, [
    getItem('folder 1', 'sub2', null, [getItem('nowy', '3'), getItem('pliki', '4')]),
    getItem('folder 2', '2'),
  ]),
]


export default function SideBar() {
	let navigate = useNavigate();
	const openFolder = (id) => {
		navigate(`/folder/${id}`);
	};

	const { projectItems, setProjectItems, onAdd, onRemove } = useStateContext();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalRenameVisible, setIsModalRenameVisible] = useState(false);
	const [newProjectName, setNewProjectName] = useState("");
	const [uploadedProjectName, setUploadedProjectName] = useState("");
	const [activeProjectId, setActiveProjectId] = useState(null);
	const [foundProject, setFoundProject] = useState({});
	const [sideBarItems, setSideBarItems] = useState([]);

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
	// let foundProject;

	const projectAddUpload = () => {
		if (newProjectName.length > 0) {
			onAdd({ id: nanoid(), name: newProjectName, folders: [] });

			setIsModalVisible(false);
			// clean input
			setNewProjectName("");
		} else {
			toast.error("Project Name must have at least one character!");
			setIsModalVisible(false);
			return;
		}
	};
	const projectRenameUpload = () => {
		// console.log("uploadedProjectName", uploadedProjectName);
		// console.log("foundProject here", foundProject);

		if (uploadedProjectName.length > 0) {
			setProjectItems((prevProjectItems) => {
				return prevProjectItems.map((item) => {
					if (item.id === foundProject.id) {
						return { ...item, name: uploadedProjectName };
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

	const onClick = ({ key }) => {
		setFoundProject(projectItems.find((item) => item.id === activeProjectId));

		if (key === "1") {
			onRemove(activeProjectId);
			toast.success("Project has been deleted successfully");
		}
		if (key === "2") {
			showModalRename();
			// onUpdate(foundProject);
			// toast.success(`${foundProject.name} has been updated`);
		}
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
	];
	// menu rozwijane
	const onClick2 = (e) => {
		console.log("click ", e.keyPath);
		navigate(`/folder/${e.keyPath[0]}`);
	};

	useEffect(() => {
		// function getItem(label, key, icon, children, type) {
		// 	return {
		// 		key,
		// 		icon,
		// 		children,
		// 		label,
		// 		type,
		// 	};
		// }

		// const items2 = [

		// 	getItem('Navigation Two', 'sub2', <MailOutlined />, [
		// 		getItem('Option 5', '5'),
		// 		getItem('Option 6', '6'),
		// 		getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
		// 	]),

		// ];


		function createGetItem(obj, children) {
			return obj.folders.map((folder) => ({
				key: folder.id,
				label: folder.name,
				icon: <MoreOutlined />,
				children,
			}));
		}

		// function createSlideList(arr, children = null) {
		// 	// console.log("🚀 ~ file: SideBar.js:157 ~ createSlideList ~ arr:", arr);

		// 	const menu = arr.map((obj) => {
		// 		let subFolders = [];
		// 		const { folders } = obj;
		// 		console.log("🚀 ~ file: SideBar.js:167 ~ arr.map ~ folders:", folders);
		// 		if (folders && folders.length > 0) {

		// 			subFolders.push({ label: folder.name, key: folder.id })

		// 			createSlideList(folders, subFolders);

		// 			if (folders?.folders && folders.folders.length > 0) {
		// 				subFolders = [];
		// 				folders.folders.map((folder) =>
		// 					subFolders.push({ label: folder.name, key: folder.id })
		// 				)
		// 				createSlideList(folders, subFolders);
		// 			}
		// 		}
		// 		// return obj.folders.map((folder) => ({
		// 		// 	key: folder.id,
		// 		// 	label: folder.name,
		// 		// 	icon: <MoreOutlined />,
		// 		// 	children: subFolders,
		// 		// }));
		// 		return createGetItem(obj, subFolders)

		// 	}

		// 	)
		// 	return menu;

		// }
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

		function createSlideList(arr, children = null) {
			console.log("🚀 ~ file: SideBar.js:157 ~ createSlideList ~ arr:", arr);

			const menu = arr.map((obj) => {
				let children = []
				const { folders } = obj;
				console.log("🚀 ~ file: SideBar.js:167 ~ arr.map ~ folders:", folders);
				if (folders.length > 0) {
					// children = [{label:'option7', key: '7'}]
					// children = [{label:`${folders.name}`, key: `${folders.key}`}]
					// folders.map(folder=> children.push({label:folder.name, key:folder.key}))
					// folders.map(folder=> console.log('folderforchildren', folder))
					folders.map((folder) =>
						folder?.folders.map((subfolder) =>
							children.push({ label: subfolder.name, key: subfolder.id })
						)
					);
					// let arr = []
					// folders.map(folder=> {
					// 			children.push({label:folder.name, key:folder.key})
					// 			return arr

					// 		})
					// 		console.log('arr2', arr)
					console.log("childddd", children);
					createSlideList(folders, children);
					// return { key: folder.id, label: folder.name, icon: <MoreOutlined /> };
				}
				console.log("🚀 ~ file: SideBar.js:160 ~ menu ~ children:", children);
				return obj.folders.map((folder) => ({
					key: folder.id,
					label: folder.name,
					icon: <MoreOutlined />,
					children,
				}));
			});
			return menu;
		}

		const options = createSlideList(projectItems);

		// 	const options = projectItems.map((project) =>
		// 	project.folders.map((folder) => ({
		// 		key: folder.id,
		// 		label: folder.name,
		// 		icon: <MoreOutlined />,
		// 	}))
		// );

		console.log("options", options);

		const projectNames = projectItems.map((project, index) =>
			getItem(project.name, `sub${index + 1}`, <FolderFilled />, options[index])
		);
		console.log(
			"🚀 ~ file: SideBar.js:200 ~ useEffect ~ projectNames:",
			projectNames
		);
		setSideBarItems(projectNames);

		// const items2 = projectNames;
	}, [projectItems]);

	return (
		<>
			<div id="sideBar">
				<button id="linkBtn">
					<p onClick={showModalAdd}>Add New </p>
				</button>
				{console.log("projectItems", projectItems)}

				<div id="sideBarOpt">
					<Menu
						onClick={onClick2}
						style={{
							width: 256,
						}}
						defaultSelectedKeys={["1"]}
						defaultOpenKeys={["sub1"]}
						mode="inline"
						items={sideBarItems}
					/>
					{/* {projectItems.length ? (
				projectItems.map((project) => (
					Object.keys(project).length ? 					
					<div className="sideBarOptions" key={project.id} onClick={()=>openFolder(project.id)}>
						<img src={folder} alt="folder" className="opacity" />
						<h3>{project.name}</h3>
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
								onClick={() => setActiveProjectId(project.id)}
							/>
						</Dropdown>
					</div>
					:''
				))
			) : (
				<p className="empty-list">
					You have no projects. Please add new one
				</p>
			)} */}

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
						onOk={projectRenameUpload}
						onCancel={handleModalRenameCancel}
					>
						<Input
							placeholder="Enter New Project Name..."
							onChange={(event) => setUploadedProjectName(event.target.value)}
							value={uploadedProjectName}
							// value={foundProject.name}
						/>
					</Modal>
				</div>
			</div>
		</>
	);
}
