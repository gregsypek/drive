import Navbar from "./components/Navbar";
import SideList from "./components/SideList";
import { Toaster } from "react-hot-toast";

import DisplayContainer from "./components/DisplayContainer";
import {StateContext} from './context/StateContext'
import "./App.css";

function App() {
  return (
    <>
    <StateContext>
		<Toaster />
      <Navbar />
      <div id="wrapper">
        <SideList />
        <DisplayContainer />
      </div>
    </StateContext>
    </>
  );
}

export default App;
