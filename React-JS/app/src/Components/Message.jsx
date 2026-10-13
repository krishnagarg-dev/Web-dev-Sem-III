import React from 'react'

const Message = (props) => {
    const {info,children}=props;

  return (
    <div>
        <h3>{info}</h3>
        {children}
    </div>
  )
}

export default Message