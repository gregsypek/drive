import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SideBar from "./components/SideBar";
import DisplayProjects from "./components/DisplayProjects";
// import ContentNav from "./components/ContentNav";
import { StateContext } from "./context/StateContext";
import "./App.css";
import DisplayFolders from "./components/DisplayFolders";

function App() {
	return (
		<>
			<BrowserRouter>
				<StateContext>
					<Toaster />
					<Navbar />
					<div id="wrapper">
						<SideBar />
						<div id="content-wrapper">
							{/* <ContentNav /> */}
							
							<Routes>
								<Route path="/" element={<DisplayProjects />} />
								<Route path="/folder/:id" element={<DisplayFolders />} />
							</Routes>
						</div>				
					</div>
				</StateContext>
			</BrowserRouter>
		</>
	);
}

export default App;
