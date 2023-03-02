import React from "react";
import "../css/DisplayContainer.css";
import DisplayCard from "./DisplayCard";
import { useStateContext } from "../context/StateContext";
import ProjectNav from "./ProjectNav";

export default function DisplayProjects() {
	const { projectItems } = useStateContext();

	return (
		<>
			<ProjectNav />
			<div id="contentDisplayer">
				{projectItems.length ? (
					projectItems.map((project) =>
						Object.keys(project).length ? (
							<DisplayCard project={project} key={project.id} />
						) : (
							""
						)
					)
				) : (
					<h3>NO PROJECTS!</h3>
				)}
			</div>
		</>
	);
}
