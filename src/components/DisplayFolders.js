import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../context/StateContext";
import DisplayCard from "./DisplayCard";
import { Dropdown, theme } from "antd";
import { toast } from "react-hot-toast";
import { FolderAddOutlined, SendOutlined } from "@ant-design/icons";
import FolderNav from "./FolderNav";

const Folder = () => {
	const { projectItems, findFoldersById, folders,setProjectItems, setFolders } =
		useStateContext();
	// const [folders, setFolders] = useState([])

	const { id } = useParams();

	useEffect(() => {
		setFolders(findFoldersById(projectItems, id));
		console.log('folders in DisplayFolders', folders)
		console.log('findFoldersById(projectItems, id)',findFoldersById(projectItems, id))
	}, [findFoldersById, id, setProjectItems, projectItems,folders ,setFolders]);

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

	return (
		<>
			<FolderNav />
			<div id="contentDisplayer">
				<p>{console.log('aha',folders?.folders)}</p>
		
				{folders?.folders && folders.folders.length ? (
					folders.folders.map((folder) =>
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
		</>
	);
};

export default Folder;
