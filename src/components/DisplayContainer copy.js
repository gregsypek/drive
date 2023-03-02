import React from "react";
import "../css/DisplayContainer.css";
import DisplayCard from "./DisplayCard";
import { useStateContext } from "../context/StateContext";
import { Dropdown, theme } from "antd";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

import { FolderAddOutlined,SendOutlined } from "@ant-design/icons";

export default function DisplayContainer() {
	const { projectItems,   } =
		useStateContext();
	const { id } = useParams();
	const onClick = ({ key }) => {
		// const activeProject = findFoldersById(projectItems, id);
		// console.log('activeProject', activeProject)

		if (key === "1") {
		

			toast.success(`Not implemented yet`);
		}
		if (key === "2") {
			// showModalRename();
			toast.success("Folder Rename not implemented yet");
		}
	};
	const items = [
		{
			label: "Nowy Projekt",
			key: "1",
			icon: <FolderAddOutlined />,
		},
		{
			label: "Przenieś",
			key: "2",
			icon: <SendOutlined /> ,
		},
	];

	const {
		token: {  colorTextTertiary },
	} = theme.useToken();

	return (
		<>
			<Dropdown
				menu={{
					items,
          onClick,
				}}
				trigger={["contextMenu"]}
        // onClick={(e) => e.preventDefault()}
				disabled
			>
				<div
					id="contentDisplayer"
					style={{
						color: colorTextTertiary,				

					}}
				>
					{projectItems.length ? (
						projectItems.map((project) =>
							Object.keys(project).length ? (
								<DisplayCard project={project} key={project.id} />
							) : (
								""
							)
						)
					) : (
						<h3>NO FOLDERS FOR THIS PROJECT!</h3>
					)}
				</div>
			</Dropdown>
		</>
	);
}
