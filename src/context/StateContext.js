import React, {createContext, useContext, useState} from 'react'
import dataDirs from "../data/dirs.json"
import dataProjects from "../data/projects.json"

const Context = createContext();

export const StateContext =({children}) => {  
  
  const dirs = dataDirs.dirs.map(item=> ({
    id: item.id,
    type: "folder",
    itemText: item.name,
    currentFolderId:item.parentDirId
  }))
  const projects = dataProjects.projects.map(project =>({
    id:project.id,
    type: "project",
    itemText: project.name,
   
  }))
  
const [items, setItems] = useState([...dirs,...projects])
return (
  <Context.Provider value={{
    items, 
    setItems,  
  }}
  >
    {children}
  </Context.Provider>
)

}

export const useStateContext = ()=> useContext(Context)