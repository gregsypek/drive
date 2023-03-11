import React from "react";
import "../css/DisplayContainer.css";
import folder from "../pics/folder.png";
import file from "../pics/blue-file.png";
import { useStateContext } from "../context/StateContext";

export default function DisplayCard({data}) {

	const {
		filterCurrentDisplayItems,
		currentFolderId,
		setCurrentFolderId,
	} = useStateContext();

  const handleClick = (type, id) => {
		if (type === "folder") {
			setCurrentFolderId(id);
			filterCurrentDisplayItems(currentFolderId);
		}
	};


  return (

   <div id="displayCard" onClick={()=>handleClick(data.type, data.id)} >
	 <img src={data.type==='folder'? folder : file} alt="file" className="opacity" />
		 <h2 className="opacity">{data.itemText}</h2>
     </div>
  );
}
