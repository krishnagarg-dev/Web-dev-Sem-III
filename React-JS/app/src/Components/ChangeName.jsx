import React, { useState } from 'react'

const ChangeName = () => {
  const initName={
    id:1,name:"KIET"
  }
  let [nameObj,setName]=useState(initName);
  const changeName=(newName)=>{
    console.log(nameObj)
    setName({...nameObj,name:newName});
    
  }
  return (
    <div>
     <h2>Name:{nameObj.name}</h2>
     <button onClick={()=>changeName("KIeT MCA")}>Change Name</button>
     {console.log(nameObj)}
    </div>
  )
}

export default ChangeName