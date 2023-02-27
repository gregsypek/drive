import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
	const [projectItems, setProjectItems] = useState([
		{
			id: 1,
			name: "Project 1",
			folders: [
				{
					id: 11,
					name: "folder 1",
					folders: [
						{
							id: 111,
							name: "nowy",
							folders: [
								{
									id: 1111,
									name: "prawie ostatni",
								},
								{
									id: 1112,
									name: "ostatni",
								},
							],
						},
						{
							id: 112,
							name: "pliki",
						},
					],
				},
				{
					id: 12,
					name: "folder 2",
         
				},
			],
      files: ['photo.png']
		},
		{
			id: 2,
			name: "Project 2",
      folders: [
        {
          id:21,
          name: 'folder do projektu 2'
        }
      ],
      files: ['document.pdf']
		},
	]);
  const [folders, setFolders] = useState([])

	const onAdd = (project) => {
		setProjectItems([...projectItems, { ...project }]);
		toast.success("Success! New project added to the list");
	};

	const onRemove = (id) => {
		const newProjects = projectItems.filter((item) => item.id !== id);
		console.log("newProjects after delete", newProjects);
		setProjectItems(newProjects);
	};

	const onRemoveByObject = (dataObj, deleteObj) => {
		//
		for (const i in dataObj) {
			if (!dataObj.hasOwnProperty(i)) continue;
			if (typeof dataObj[i] == "object") {
				onRemoveByObject(dataObj[i], deleteObj);
        			// if they are match delete whole obj
			} else if (dataObj[i] === deleteObj.id) {     		
				for (const j in dataObj) {
					delete dataObj[j];//leaves empty {}
          //TODO delete whole empty object
				}
			}   
		}
		return dataObj;
	};

	// const findFolders = (id) => {
	//   const project = projectItems.find(project=> project.id === id);
	//   console.log('proj',project)
	//   if (project?.folders) return project.folders
	//   else return []
	// }

	const findFoldersById = (array, id) => {
		for (const item of array) {
			if (item.id === id) return item;
			if (item.folders?.length) {
				const innerResult = findFoldersById(item.folders, id);
				if (innerResult) return innerResult;
			}
		}
	};

	return (
		<Context.Provider
			value={{
				projectItems,
				setProjectItems,
				onAdd,
				onRemove,
				findFoldersById,
				onRemoveByObject,
        folders,
        setFolders
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
