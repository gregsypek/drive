import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { nanoid } from "nanoid";
import _, { isEqual } from "underscore";
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
									folders: [],
								},
								{
									id: nanoid(),
									name: "ostatni",
									folders: [],
								},
							],
						},
						{
							id: nanoid(),
							name: "pliki",
							folders: [],
						},
					],
				},
				{
					id: nanoid(),
					name: "folder 2",
					folders: [],
				},
			],
			files: ["photo.png"],
		},
		{
			id: nanoid(),
			name: "Project 2",
			folders: [
				{
					id: nanoid(),
					name: "folder do projektu 2",
					folders: [
						{
                  
							id:nanoid(),
							name:'22',
							folders: []
					
					}
					],
				},
			],
			files: ["document.pdf"],
		},
	]);
	const [folders, setFolders] = useState([]);
	const [newFolder, setNewFolder] = useState({});
	const [paramId, setParamId] = useState("");
	const onAdd = (project) => {
		setProjectItems([...projectItems, { ...project }]);
		toast.success("Success! New project added to the list");
	};
	const onAddFolder = (newObj) => {
		// setProjectItems([...projectItems, { ...newObj }]);
		//console.log('newobj',newObj, folders)
	};

	const onRemove = (id) => {
		const newProjects = projectItems.filter((item) => item.id !== id);
		//console.log("newProjects after delete", newProjects);
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
					delete dataObj[j]; //leaves empty {}
					//TODO delete whole empty object
				}
			}
		}
		return dataObj;
	};

	const onUpdateByArray = (dataArray, currentArray, newObj) => {
		console.log(
			"🚀 ~ file: StateContext.js:99 ~ onUpdateByArray ~ newObj:",
			newObj
		);
		console.log(
			"🚀 ~ file: StateContext.js:99 ~ onUpdateByArray ~ currentArray:",
			currentArray
		);
		// //console.log("🚀 ~ file: StateContext.js:99 ~ onUpdateByArray ~ dataArray:", dataArray)

		// const newData = dataArray.map(obj => {
		// 	if(obj.folders  && obj.folders.length > 0){
		// 		onUpdateByArray(obj.folders, currentArray)
		// 		if(obj.folders.every(item => _.isEqual(item,currentArray ))){
		// 			console.log('to samo',obj.folders, currentArray)
		// 			obj.folders = [...currentArray]
		// 		}
		// 	}
		// })
		for (const i in dataArray) {
			if (!dataArray.hasOwnProperty(i)) continue;
			if (dataArray[i]?.folders && dataArray[i].folders.length > 0) {
				onUpdateByArray(dataArray[i].folders, currentArray);
				console.log("tutaj");
				if (
					Object.keys(dataArray[i].folders).every(
						(key) =>
							currentArray.hasOwnProperty(key) &&
							currentArray[key] === dataArray[i].folders[key]
					)
				)
					console.log("tutaj2");
				if (_.isEqual(dataArray[i], currentArray))
					console.log("to samo", dataArray[i], currentArray);
				console.log("tutaj3");
				// if(Object.keys(dataArray[i].folders).every(
				// 	key => currentArray.hasOwnProperty(key) &&
				// 	currentArray[key] === dataArray[i].folders[key]
				// ))

				{
					const data = dataArray[i]?.folders;
					dataArray[i].folders = [...data, newObj];
				}
			}
			if (dataArray[i]?.folders && dataArray[i].folders.length === 0) {
				console.log("tutaj3");
				if (dataArray[i].id === paramId)
					dataArray[i].folders = dataArray[i].folders.push({
						id: nanoid(),
						name: "b",
					});
			}
		}
		return dataArray;
		// setProjectItems(newData)
	};
	// const onUpdateByArray = (dataObj, currentArray, newObj ) => {
	// console.log("🚀 ~ file: StateContext.js:99 ~ onUpdateByArray ~ newObj:", newObj)
	// console.log("🚀 ~ file: StateContext.js:99 ~ onUpdateByArray ~ currentArray:", currentArray)
	// // //console.log("🚀 ~ file: StateContext.js:99 ~ onUpdateByArray ~ dataObj:", dataObj)

	// 	for (const i in dataObj) {
	// 		if (!dataObj.hasOwnProperty(i)) continue;
	// 		if (dataObj[i].hasOwnProperty('folders') && dataObj[i].folders.length > 0) {
	// 				onUpdateByArray(dataObj[i].folders, currentArray)
	// 				if(Object.keys(dataObj[i].folders).every(
	// 					key => currentArray.hasOwnProperty(key) &&
	// 					currentArray[key] === dataObj[i].folders[key]
	// 				)){

	// 					//console.log('znalazlem',dataObj[i].folders)

	// 			const data =  dataObj[i]?.folders ? dataObj[i].folders :dataObj[i]
	// 			dataObj[i].folders = [...data, newObj]
	// 		}
	// 		// return dataObj

	// 			}
	// 			if (dataObj[i].hasOwnProperty('folders') && dataObj[i].folders.length === 0 ) {
	// 				if(dataObj[i].id ===paramId)
	// 				//console.log('pusty folders',dataObj[i] )
	// 				//console.log('paramId',paramId )
	// 				//console.log('newObj', newObj)
	// 				// //console.log('new obj',newObj )
	// 				// dataObj[i].folders = dataObj[i].folders.push(newObj)
	// 				dataObj[i].folders = dataObj[i].folders.push({ id: nanoid(),name:'b'})
	// 			}
	// 		}
	// 		return dataObj;
	// 	}

	const findFoldersById = (array, id) => {
		for (const item of array) {
			if (item?.id === id) return item;
			if (item?.folders?.length) {
				const innerResult = findFoldersById(item.folders, id);
				// //console.log('inn',innerResult)
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
				setNewFolder,
				paramId,
				setParamId,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
