import Navbar from "./components/Navbar";
import SideList from "./components/SideList";
import DisplayContainer from "./components/DisplayContainer";
import {StateContext} from './context/StateContext'
import "./App.css";

function App() {
  return (
    <>
    <StateContext>

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
