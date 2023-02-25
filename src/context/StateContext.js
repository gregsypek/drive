import React, {createContext, useContext, useState} from 'react'
import { toast } from "react-hot-toast";



const Context = createContext();

export const StateContext =({children}) => {
  const [projectItems, setProjectItems] = useState([
    {
      id: 1, 
      name: 'Project 1',      
    },
    {
      id: 2, 
      name: 'Project 2',      
    }
  ]);
  


  const onAdd= (project)=> {
    setProjectItems([...projectItems, {...project}])
    toast.success('Success! New project added to the list');
  }

  const onRemove = (id) => {
		const newProjects = projectItems.filter((item) => item.id !== id);	
		setProjectItems(newProjects);
	};


return (
  <Context.Provider value={{
    projectItems, 
    setProjectItems,
    onAdd,
    onRemove

  }}
  >
    {children}
  </Context.Provider>
)

}

export const useStateContext = ()=> useContext(Context)