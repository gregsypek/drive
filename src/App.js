import Navbar from "./components/Navbar";
import SideList from "./components/SideList";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DisplayContainer from "./components/DisplayContainer";
import { StateContext } from "./context/StateContext";
import "./App.css";

function App() {
	return (
		<>
			<BrowserRouter>
				<StateContext>
					<Toaster />
					<Navbar />
					<div id="wrapper">
						<SideList />
						<Routes>
							<Route path="/" element={<DisplayContainer />} />
						</Routes>
						{/* <DisplayContainer /> */}
					</div>
				</StateContext>
			</BrowserRouter>
		</>
	);
}

export default App;
