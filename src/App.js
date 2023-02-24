import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

import SideBar from "./components/SideBar";
import DisplayContainer from "./components/DisplayContainer";
import { StateContext } from "./context/StateContext";
import "./App.css";

function App() {
	return (
		<>
			<StateContext>
				<Toaster />
				<Navbar />
				<div id="wrapper">
					<SideBar />
					<DisplayContainer />
				</div>
			</StateContext>
		</>
	);
}

export default App;
