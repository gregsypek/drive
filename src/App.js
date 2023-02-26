import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SideBar from "./components/SideBar";
import DisplayContainer from "./components/DisplayContainer";
import ContentNav from "./components/ContentNav";
import { StateContext } from "./context/StateContext";
import "./App.css";
import Folder from "./components/Folder";

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
							<ContentNav />
							<Routes>
								<Route path="/" element={<DisplayContainer />} />
								<Route path="/folder/:id" element={<Folder />} />
							</Routes>
						</div>				
					</div>
				</StateContext>
			</BrowserRouter>
		</>
	);
}

export default App;
