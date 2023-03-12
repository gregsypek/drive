import React, { createContext, useContext, useState } from "react";
import dataDirs from "../data/dirs.json";
import dataProjects from "../data/projects.json";
import { toast } from "react-hot-toast";


const Context = createContext();

export const StateContext = ({ children }) => {

	const [sideList, setSideList] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [currentFolderId, setCurrentFolderId] = useState(null);
	const [dirs, setDirs] = useState(dataDirs.dirs.map((item) => ({
		id: item.id,
		type: "folder",
		itemText: item.name,
		folderId: item.parentDirId,
	})))
	const [projects, setProjects] = useState(dataProjects.projects.map((project) => ({
		id: project.id,
		type: "project",
		itemText: project.name,
		folderId: project.folderId,
	})))

	const [items, setItems] = useState([...dirs, ...projects]);

	// "6affab85-552e-49ec-90cd-78bc65d2ffa1"

	let filterDirs;
	let filterProjects;

	const displayDirs = (id) => {
		filterDirs = dirs.filter((item) => item.folderId === id);
		return filterDirs;
	};

	const displayProjects = (id) => {
		filterProjects = projects.filter((item) => item.folderId === id);
		return filterProjects;
	};

	const filterCurrentDisplayItems = (id) => {
		displayDirs(id);
		displayProjects(id);

		console.log("filteredItems", [...filterDirs, ...filterProjects]);
		setFilteredItems([...filterDirs, ...filterProjects]);
	};
	const onAdd = (project) => {
		dataDirs.dirs.push(JSON.stringify(project, null, 4))
		// fs.writeFileSync('dirs.json', JSON.stringify(project, null, 4))
		setItems([...items, { ...project }]);

		// console.log("🚀 ~ file: StateContext.js:50 ~ onAdd ~ items:", items)
		
		toast.success("Success! New project added to the list");
	};



	const sortAndFilter = (arr) => {
		const sorted = arr.sort((a, b) => {
			if (a.itemText < b.itemText) return -1;
			if (a.itemText > b.itemText) return 1;
			return 0;
		});
		const folders = sorted.filter((item) => item.type === "folder");
		const projects = sorted.filter((item) => item.type === "project");
		return [...folders, ...projects];
	};

	return (
		<Context.Provider
			value={{
				items,
				setItems,
				filterCurrentDisplayItems,
				filteredItems,
				setFilteredItems,
				currentFolderId,
				setCurrentFolderId,
				sortAndFilter,				
				sideList,
				setSideList,
				onAdd,
				setDirs,
				setProjects
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
