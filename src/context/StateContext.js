import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { nanoid } from 'nanoid'

const Context = createContext();

export const StateContext = ({ children }) => {
	const [projectItems, setProjectItems] = useState([
		{
			id: nanoid(),
			name: "Project 1",
			folders: [
				{
					id: nanoid(),
					name: "folder 1",
					folders: [
						{
							id: nanoid(),
							name: "nowy",
							folders: [
								{
									id: nanoid(),
									name: "prawie ostatni",
									folders:[]
								},
								{
									id: nanoid(),
									name: "ostatni",
									folders:[]
								},
							],
						},
						{
							id: nanoid(),
							name: "pliki",
							folders:[]
						},
					],
				},
				{
					id: nanoid(),
					name: "folder 2",
					folders:[]         
				},
			],
      files: ['photo.png']
		},
		{
			id: nanoid(),
			name: "Project 2",
      folders: [
        {
          id: nanoid(),
          name: 'folder do projektu 2',
					folders:[]
        }
      ],
      files: ['document.pdf']
		},
	]);
  const [folders, setFolders] = useState([])
	const [newFolder, setNewFolder] = useState({})

	const onAdd = (project) => {
		setProjectItems([...projectItems, { ...project }]);
		toast.success("Success! New project added to the list");
	};
	const onAddFolder = (newObj) => {
		// setProjectItems([...projectItems, { ...newObj }]);
		console.log('newobj',newObj, folders)
	
		// if(newObj){
		// 	setFolders((prevState)=> ([
		// 		...prevState, newObj
		// 	]))
		

		// }


		// toast.success("Success! New folder added to the list");
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


	const onUpdateByArray = (dataObj, currentArray, newObj ) => {
	console.log('data+',dataObj)
		for (const i in dataObj) {
			if (!dataObj.hasOwnProperty(i)) continue;		
			if (dataObj[i].hasOwnProperty('folders') && dataObj[i].folders.length > 0) {
				// console.log("hehheh", dataObj[i].folders);			
					onUpdateByArray(dataObj[i].folders, currentArray)	
				// console.log('Object.keys(dataObj[i].folders',Object.keys(dataObj[i].folders))
					if(Object.keys(dataObj[i].folders).every(
						key => currentArray.hasOwnProperty(key) && 
						currentArray[key] === dataObj[i].folders[key]
					)){
				
						console.log('znalazlem',dataObj[i].folders)
					
				// console.log('   hh   ',[...dataObj[i].folders, newObj])
				// dataObj[i].folders = [...dataObj[i].folders, newObj]

				const data =  dataObj[i]?.folders ? dataObj[i].folders :dataObj[i] 
				dataObj[i].folders = [...data, newObj]
						// dataObj[i]['folders'] = newFolder;
						// dataObj[i].folders:  [...dataObj[i].folders, newObj]
					}
					// console.log('dataObj', dataObj)

				}
				if (dataObj[i].hasOwnProperty('folders') && dataObj[i].folders.length === 0 && dataObj[i].folders.id === currentArray.id) {
					console.log('pusty folders',dataObj[i] )
					console.log('new obj',newObj )
					// dataObj[i].folders = dataObj[i].folders.push(newObj)
				}
			}
			return dataObj;
		}

	// const findFolders = (id) => {
	//   const project = projectItems.find(project=> project.id === id);
	//   console.log('proj',project)
	//   if (project?.folders) return project.folders
	//   else return []
	// }

	const findFoldersById = (array, id) => {
		// console.log('findFoldersById',array)

		for (const item of array) {
			if (item?.id === id) return item;
			if (item?.folders?.length) {
				const innerResult = findFoldersById(item.folders, id);
				// console.log('inn',innerResult)
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
				onAddFolder,
				onRemove,
				findFoldersById,
				onRemoveByObject,
				onUpdateByArray,
        folders,
        setFolders,
				newFolder,
				setNewFolder
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
