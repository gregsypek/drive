import React, { useState } from "react";
import "../css/DisplayContainer.css";
import folder from "../pics/folder.png";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { Dropdown, theme } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useStateContext } from "../context/StateContext";

export default function DisplayCard({ project }) {
	const { projectItems, findFoldersById,  onRemoveByObject,  setProjectItems  } = useStateContext();	

	const { name, id } = project;

	const onClick = ({ key }) => {

    const activeProject = findFoldersById(projectItems, id);
    // console.log('activeProject', activeProject)

		if (key === "1") {	
			const deleted = projectItems.map(obj=> onRemoveByObject(obj, activeProject))	


			setProjectItems(deleted)
	

	
     
			toast.success(`${id}Folder has been deleted successfully`);
		}
		if (key === "2") {
			// showModalRename();
			toast.success("Folder Rename not implemented yet");
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

	const {
		token: { colorTextTertiary },
	} = theme.useToken();

	let navigate = useNavigate();

	const openFolder = (id) => {
		// console.log("id", id);
		navigate(`/folder/${id}`);
	};

	return (
		// <div className="displayCard" onClick={()=>openFolder(id)} >
		// <img src={folder} alt="file" className="opacity" />
		// <h2 className="opacity">{name}</h2>
		<Dropdown
			menu={{
				items,
				onClick,
			}}
			trigger={["contextMenu"]}
			onClick={(e) => e.preventDefault()}
		>
			<div
				id="displayCard"
				onClick={() => openFolder(id)}
				style={{
					color: colorTextTertiary,
					textAlign: "center",
				}}
			>
				<img src={folder} alt="file" className="opacity" />
				<h2 className="opacity">{name}</h2>
			</div>
		</Dropdown>
	);
}
