import React, { useState } from "react";
import folder from "../pics/folder.png";
import dots from "../pics/three-dots.png";
import { Modal, Input } from "antd";
import "../css/SideBar.css";
import { toast } from "react-hot-toast";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import {useNavigate} from 'react-router-dom'
import { nanoid } from "nanoid";


// import {toast} from 'react-hot-toast';

import { useStateContext } from "../context/StateContext";

export default function SideBar() {
	let navigate = useNavigate();
  const openFolder = (id)=>{
    navigate(`/folder/${id}`)
  }
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
			onAdd({ id: nanoid(), name: newProjectName });
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

	return (
		<>
			<div id="sideBar">
				<button id="linkBtn">
					<p onClick={showModalAdd}>Add New </p>
				</button>
				{/* {console.log(projectItems)} */}

				<div id="sideBarOpt">
					{projectItems.length ? (
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
