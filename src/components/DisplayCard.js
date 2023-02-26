import React from "react";
import "../css/DisplayContainer.css";
import folder from "../pics/folder.png";
import {useNavigate} from 'react-router-dom'



export default function DisplayCard({project}) {
  const {name, id } = project
  let navigate = useNavigate();

  const openFolder = (id)=>{
    console.log('id',id)
    navigate(`/folder/${id}`)
  }


  return (
    <div className="displayCard" onClick={()=>openFolder(id)} >
    <img src={folder} alt="file" className="opacity" />
    <h2 className="opacity">{name}</h2>
    
    </div>
  );
}
