import React, { createContext, useContext, useState } from "react";
import dataDirs from "../data/dirs.json";
import dataProjects from "../data/projects.json";

const Context = createContext();

export const StateContext = ({ children }) => {
	const dirs = dataDirs.dirs.map((item) => ({
		id: item.id,
		type: "folder",
		itemText: item.name,
    folderId:item.parentDirId
	}));
	const projects = dataProjects.projects.map((project) => ({
		id: project.id,
		type: "project",
		itemText: project.name,
    folderId:project.folderId
	}));

	const [items, setItems] = useState([...dirs, ...projects]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [currentFolderId, setCurrentFolderId] = useState(
null
	);
  // "6affab85-552e-49ec-90cd-78bc65d2ffa1"

	const filterCurrentDisplayItems = (id) => {

		const filterDirs = dirs.filter((item) => item.folderId === id);
		console.log("🚀 ~ file: StateContext.js:31 ~ filterCurrentDisplayItems ~ filterDirs:", filterDirs)

		const filterProjects = projects.filter(
			(item) => item.folderId === id
		);
		console.log("🚀 ~ file: StateContext.js:36 ~ filterCurrentDisplayItems ~ filterProjects:", filterProjects)

		console.log('filteredItems',[...filterDirs, ...filterProjects])
		setFilteredItems([...filterDirs, ...filterProjects]);
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
        setCurrentFolderId
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
