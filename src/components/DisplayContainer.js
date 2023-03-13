import React, { useEffect } from "react";
import "../css/DisplayContainer.css";
import DisplayCard from "./DisplayCard";
import { useStateContext } from "../context/StateContext";

export default function DisplayContainer() {
  const {

		filterCurrentDisplayItems,
		filteredItems,
		currentFolderId,
    sortAndFilter,
    allItems,currentItemName, 
	} = useStateContext();

  useEffect(() => {
		filterCurrentDisplayItems(currentFolderId);
	}, [currentFolderId, allItems ]);
  return (
    <>

      <div id="displayCont">
        <div id="displayInfoNav">
          <p>{currentItemName}</p>
        </div>
      
        {/* {console.log("🚀 ~ file: DisplayContainer.js:42 ~ DisplayContainer ~ filteredItems2:", sortAndFilter(filteredItems))} */}
        <div id="contentDisplayer">
 
						{sortAndFilter(filteredItems).map((item,index) => (
							<DisplayCard data={item}

								key={index}
							>
								{item.itemText}
							</DisplayCard>
						))}					
					</div>
      </div>
    </>
  );
}
