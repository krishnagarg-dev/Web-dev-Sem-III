import React from 'react'

const Student = (props) => {
 const {id,name,marks,section}=props;
  return (
    <tr>       
        <td>{id}</td><td>{name}</td><td>{marks}</td><td>{section}</td>
    </tr>
  )
}

export default Student