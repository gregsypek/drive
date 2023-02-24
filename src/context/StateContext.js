import React, {createContext, useContext, useState} from 'react'



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

return (
  <Context.Provider value={{
    projectItems, 
    setProjectItems
  }}
  >
    {children}
  </Context.Provider>
)

}

export const useStateContext = ()=> useContext(Context)