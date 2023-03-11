import React, { createContext, useContext, useState } from "react";
import dataDirs from "../data/dirs.json";
import dataProjects from "../data/projects.json";

const Context = createContext();

export const StateContext = ({ children }) => {
	const dirs = dataDirs.dirs.map((item) => ({
		id: item.id,
		type: "folder",
		itemText: item.name,
		folderId: item.parentDirId,
	}));
	const projects = dataProjects.projects.map((project) => ({
		id: project.id,
		type: "project",
		itemText: project.name,
		folderId: project.folderId,
	}));

	const [items, setItems] = useState([...dirs, ...projects]);
	const [sideList, setSideList] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [currentFolderId, setCurrentFolderId] = useState(null);
	// "6affab85-552e-49ec-90cd-78bc65d2ffa1"

	let filterDirs;
	let filterProjects;

	const displayDirs = (id) => {
		filterDirs = dirs.filter((item) => item.folderId === id);
		// console.log(
		// 	"🚀 ~ file: StateContext.js:31 ~ filterCurrentDisplayItems ~ filterDirs:",
		// 	filterDirs
		// );
		return filterDirs;
	};

	const displayProjects = (id) => {
		filterProjects = projects.filter((item) => item.folderId === id);
		// console.log(
		// 	"🚀 ~ file: StateContext.js:36 ~ filterCurrentDisplayItems ~ filterProjects:",
		// 	filterProjects
		// );
		return filterProjects;
	};

	const filterCurrentDisplayItems = (id) => {
		displayDirs(id);
		displayProjects(id);

		console.log("filteredItems", [...filterDirs, ...filterProjects]);
		setFilteredItems([...filterDirs, ...filterProjects]);
	};

	const createSideList = (id) => {
		displayDirs(id);
		displayProjects(id);

		console.log("filteredItems", [...filterDirs, ...filterProjects]);
		setSideList([...filterDirs, ...filterProjects]);
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
				createSideList,
				sideList,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
