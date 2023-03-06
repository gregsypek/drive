import { DownOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import { useState } from "react";
import "../css/SideBar.css";
import folder from "../pics/folder.png";
import dots from "../pics/three-dots.png";
import { Dropdown } from "antd";
import {
	DeleteOutlined,
	EditOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/StateContext";
import { toast } from "react-hot-toast";
import { nanoid } from "nanoid";
import { Modal, Input } from "antd";


// THIS IS  HOW TREE SHOULD LOOK LIKE
const treeData3 = [
	{
		title: "Projekt 1",
		key: "0-0",
		children: [
			{
				title: "folder 1",
				key: "0-0-0",
				children: [
					{
						title: "nowy",
						key: "0-0-0-0",
						children: [
							{
								title: "prawie ostatni",
								key: "0-0-0-0-0",
							},
							{
								title: "ostatni",
								key: "0-0-0-0-1",
							},
						],
					},
					{
						title: "pliki",
						key: "0-0-0-1",
					},
				],
			},
			{
				title: "folder 2",
				key: "0-0-1",
			},
		],
	},
	{
		title: "Project 2",
		key: "0-1",
		id: "01",
		children: [
			{
				title: "folder do projektu 2",
				key: "0-1-0",
				id: "010",
			},
		],
	},
];

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

const SideBar = () => {
	const openFolder = (id) => {
		navigate(`/folder/${id}`);
	};
	let navigate = useNavigate();
	const { projectItems, setProjectItems, onAdd, onRemove } = useStateContext();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalRenameVisible, setIsModalRenameVisible] = useState(false);
	const [newProjectName, setNewProjectName] = useState("");
	const [uploadedProjectName, setUploadedProjectName] = useState("");
	const [activeProjectId, setActiveProjectId] = useState(null);
	const [foundProject, setFoundProject] = useState({});

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



	// const assignDepth = (arr, depth = 0, index = 0) => {
	// 	if (index < arr.length) {
	// 		arr[index].depth = depth;
	// 		if (arr[index].folders.length) {
	// 			return assignDepth(arr[index].folders, depth + 1, 0);
	// 		}
	// 		return assignDepth(arr, depth, index + 1);
	// 	}
	// 	return;
	// };

	// let deeps = projectItems.map((project) => [project]);
	// deeps = deeps
	// 	.map((arr) => {
	// 		assignDepth(arr);
	// 		return arr;
	// 	})
	// 	.flat();

	// console.log("🚀 ~ file: SideBar.js:133 ~ SideBar ~ deeps:", deeps);

	// console.log("childrens", createChildrens(projectItems[0], 1));

	// const initTreeData5 = deeps.map((project, index) => {
	// 	if (project.folders && project.folders.length > 0) {
	// 		const children = createChildrens(project, project.depth);
	// 		return {
	// 			title: project.name,
	// 			key: `0-${index}`,
	// 			id: project.id,
	// 			children,
	// 		};
	// 	} else {
	// 		return {
	// 			title: project.name,
	// 			key: `0-${index}`,
	// 			id: project.id,
	// 		};
	// 	}
	// });

	// const updateTreeData = (list, key, children) =>
	// 	list.map((node) => {
	// 		if (node.key === key) {
	// 			return {
	// 				...node,
	// 				children,
	// 			};
	// 		}
	// 		if (node.children) {
	// 			return {
	// 				...node,
	// 				children: updateTreeData(node.children, key, children),
	// 			};
	// 		}
	// 		return node;
	// 	});

	// const createChildrens = (obj, key) => {
	// 	if (obj.folders.length > 0) {
	// 		let keyCode = `0-`.repeat(key + 2);

	// 		const childrens = obj.folders.map((child, index) => {
	// 			console.log("🚀 ~ file: SideBar.js:154 ~ children ~ child:", child);

	// 			return {
	// 				title: child.name,
	// 				key: `${keyCode}${index}`,
	// 				id: child.id,
	// 				...(child.folders.length && {
	// 					children: [
	// 						// THIS SHOULD NOT BE STATIC
	// 						{
	// 							title: "name",
	// 							id: "id",
	// 							key: `key`,
	// 						},
	// 					],
	// 				}),
	// 			};
	// 		});
	// 		return childrens;
	// 	}
	// 	return;
	// };

	// const createChildrens = (obj, key) => {
	// 	if (obj.folders && obj.folders.length > 0) {
	// 		let keyCode = `0-`.repeat(key + 2);

	// 		const children = obj.folders.map((child, index) => {
	// 			console.log("🚀 ~ file: SideBar.js:154 ~ children ~ child:", child);
	// 			return {
	// 			title: child.name,
	// 			key: `${keyCode}${index}`,
	// 			id: child.id,

	// 			}
	// 		});
	// 		return children;
	// 	}
	// 	return;
	// };

	// const assignDepth = (arr, depth = 0, index = 0) => {
	// 	if (index < arr.length) {
	// 		arr[index].depth = depth;
	// 		if (arr[index].folders.length) {
	// 			return assignDepth(arr[index].folders, depth + 1, 0);
	// 		}
	// 		return assignDepth(arr, depth, index + 1);
	// 	}
	// 	return;
	// };

	// const createTreeData = (arr, index = 0) => {
	// 	// sprawdz czy istnieje object w tablicy
	// 	if (index < arr.length) {
	// 		const children = createChildrens(arr[index], arr[index].depth);
	// 		console.log(
	// 			"🚀 ~ file: SideBar.js:172 ~ createTreeData ~ children:",
	// 			children
	// 		);

	// 		if (arr[index].folders.length) {
	// 			return {
	// 				title: arr[index].name,
	// 				key: `0-${index}`,
	// 				id: arr[index].id,
	// 				children,
	// 			};
	// 		}
	// 		return createTreeData(arr, index + 1);
	// 	}
	// 	return;
	// };

	// console.log(
	// 	"🚀 ~ file: SideBar.js:169 ~ createTreeData ~ createTreeData:",
	// 	createTreeData(deeps[0].folders)
	// );

	// const initTreeData5 = deeps.map((project, index) => {
	// 	if (project.folders.length > 0) {
	// 		const children = createChildrens(project, project.depth);
	// 		return {
	// 			title: project.name,
	// 			key: `0-${index}`,
	// 			id: project.id,
	// 			children,
	// 		};
	// 	} else {
	// 		return {
	// 			title: project.name,
	// 			key: `0-${index}`,
	// 			id: project.id,
	// 		};
	// 	}
	// });


	// console.log("initTreeData5", initTreeData5);

	// const initTreeData = projectItems.map((project, index) => ({
	// 	title: project.name,
	// 	key: `${index}-0`,
	// 	id: project.id,
	// }));

	// const [treeData, setTreeData] = useState(initTreeData5);
	const [treeData, setTreeData] = useState(treeData3);


	const onSelect = (selectedKeys, info) => {
		console.log("selected", selectedKeys, info);
		navigate(`/folder/${info.node.id}`);
	};

	return (
		<>
			<div id="sideBar">
				<button id="linkBtn">
					<p onClick={showModalAdd}>Add New </p>
				</button>
				{/* {console.log(projectItems)} */}

				<div id="sideBarOpt">
					{projectItems.length ? (
						projectItems.map((project) =>
							Object.keys(project).length ? (
								<div
									className="sideBarOptions"
									key={project.id}
									onClick={() => openFolder(project.id)}
								>
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
							) : (
								""
							)
						)
					) : (
						<p className="empty-list">
							You have no projects. Please add new one
						</p>
					)}

					<Tree
						showLine
						switcherIcon={<DownOutlined />}
						defaultExpandedKeys={["0-0-0"]}
						onSelect={onSelect}
						treeData={treeData}
					/>

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
};
export default SideBar;
