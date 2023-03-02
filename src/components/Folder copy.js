import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../context/StateContext";
import DisplayCard from "./DisplayCard";
import { Dropdown, theme } from "antd";
import { toast } from "react-hot-toast";
import { FolderAddOutlined, SendOutlined } from "@ant-design/icons";

const Folder = () => {
	const { projectItems, findFoldersById, folders, setFolders } =
		useStateContext();
	// const [folders, setFolders] = useState([])
	const { id } = useParams();

	useEffect(() => {
		setFolders(findFoldersById(projectItems, Number(id))?.folders);
	}, [findFoldersById, id, projectItems, setFolders]);
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
			label: "Nowy Folder",
			key: "1",
			icon: <FolderAddOutlined />,
		},
		{
			label: "Przenieś",
			key: "2",
			icon: <SendOutlined />,
		},
	];

	const {
		token: { colorTextTertiary },
	} = theme.useToken();
	return (
		<>
			<Dropdown
				menu={{
					items,
					onClick,
					
				}}
				trigger={["contextMenu"]}
				onClick={(e) => e.preventDefault()}
				
			>
				<div
					id="contentDisplayer"
					style={{
						color: colorTextTertiary,
					}}
				>
			
					{folders && folders.length ? (
						folders.map((folder) =>
							Object.keys(folder).length ? (
								<DisplayCard project={folder} key={folder.id} />
							) : (
								""
							)
						)
					) : (
						<p>This Folder is empty</p>
					)}
				</div>
			</Dropdown>
		</>
	);
};

export default Folder;
