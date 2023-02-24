import React, { useState } from "react";
import folder from "../pics/folder.png";
import dots from "../pics/three-dots.png";
import { Modal, Input } from "antd";
import "../css/SideBar.css";
// import {toast} from 'react-hot-toast';

import { useStateContext } from "../context/StateContext";

export default function SideBar() {
	const { projectItems, onAdd } = useStateContext();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [newProjectName, setNewProjectName] = useState("");

	const showModal = () => {
		setIsModalVisible(true);
	};
	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const folderUpload = () => {
		onAdd({ id: projectItems.length + 1, name: newProjectName });
		setIsModalVisible(false);
	};

	return (
		<>
			<div id="sideBar">
				<button id="linkBtn">
					<p onClick={showModal}>New</p>
				</button>
				{console.log(projectItems)}

				<div id="sideBarOpt">
					{projectItems.length ? (
						projectItems.map(({ name }) => (
							<div className="sideBarOptions">
								<img src={folder} alt="folder" className="opacity" />
								<h3>{name}</h3>
								<img src={dots} alt="dots" className="opacity" />
							</div>
						))
					) : (
						<p className="empty-list">
							You have no projects. Please add new one
						</p>
					)}

					<Modal
						title="Add new Project"
						open={isModalVisible}
						onOk={folderUpload}
						onCancel={handleCancel}
					>
						<Input
							placeholder="Enter the Project Name..."
							onChange={(event) => setNewProjectName(event.target.value)}
							value={newProjectName}
						/>
					</Modal>
				</div>
			</div>
		</>
	);
}
