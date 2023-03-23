import React from "react";
import "../css/DisplayContainer.css";

import DisplayFolder from "./DisplayFolder";
import DisplayProject from "./DisplayProject";

export default function DisplayCard({ data }) {
	return (
		<>
			{data.type === "folder" ? (
				<DisplayFolder data={data} />
			) : (
				<DisplayProject data={data} />
			)}
		</>
	);
}
