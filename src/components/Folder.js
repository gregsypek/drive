import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useStateContext } from "../context/StateContext";
import DisplayCard from "./DisplayCard";


const Folder = () => {
  const { projectItems,findFoldersById, folders, setFolders} = useStateContext();
  // const [folders, setFolders] = useState([])
  const {id} = useParams();

  useEffect(() => {
   setFolders(findFoldersById(projectItems, Number(id))?.folders) 
   
  }, [findFoldersById,id,projectItems,setFolders])
  
  return (
    <>  
    <div id="contentDisplayer">
    {folders && folders.length ? (
      folders.map(folder=>(     
        Object.keys(folder).length ? 
        <DisplayCard project={folder} key={folder.id}/>
        : ''
      ))
    ): (<p>This Folder is empty</p>)}
    </div>
  
   
  
    </>
    )
}

export default Folder