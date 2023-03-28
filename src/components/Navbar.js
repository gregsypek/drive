import React from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/StateContext";

export default function Navbar() {
	const { setCurrentFolderId } = useStateContext();
	const handleClick = () => {
		setCurrentFolderId(null);
	};
	return (
		<>
			<nav>
				<ul>
					<li>
						<Link onClick={handleClick} to="/">
							<div id="icon">
								<p>Drive</p>
							</div>
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}
