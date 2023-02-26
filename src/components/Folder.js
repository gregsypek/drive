import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStateContext } from "../context/StateContext";
import DisplayCard from "./DisplayCard";


const Folder = () => {
  const { projectItems,findFoldersById} = useStateContext();
  const [folders, setFolders] = useState([])
  const {id} = useParams();



  useEffect(() => {
   setFolders(findFoldersById(projectItems, Number(id))?.folders) 
   
  }, [findFoldersById,id,projectItems])
  
  return (
    <>  
    <div id="contentDisplayer">
    {folders && folders.length ? (
      folders.map(folder=>(
        <DisplayCard project={folder} key={folder.id}/>
      ))
    ): (<p>This Folder is empty</p>)}
    </div>
    {/* <div id="contentDisplayer">
    {findFolders(Number(id)).length ? (
      findFolders(Number(id)).map(folder=>(
        <DisplayCard project={folder} key={folder.id}/>
      ))
    ): (<p>This Folder is empty</p>)}
    </div> */}
   
  
    </>
    )
}

export default Folder