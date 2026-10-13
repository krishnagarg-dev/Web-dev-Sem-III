import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
const Product = () => {
    //  const {pid}=useParams();
    const [pvalue,setPValue]=useState();
    const [filter,setFilter]=useSearchParams();
    const pid=filter.get("pid");
    const updatePValue=(e)=>{
           setPValue(e.target.value);
    }
    const onSearch=(e)=>{
        e.preventDefault()
        setFilter({pid:pvalue})
    }
     const getSwitch=()=>{
     switch(pid){
        case "p100":{
            return (
                <div>
                    <h1>Welcome to Dynamic Routing</h1>
                    <h2>Product ID:{pid}</h2>
                </div>
            )
        }
        case "p200":{     
            return (
                <div>
                    <h1>Welcome to Dynamic Routing</h1>
                    <h2>Product ID:{pid}</h2>
                </div>
            )
        }
        default:{
            return (
                <div>
                    <h1>Welcome to Dynamic Routing</h1>
                    <h2>Product of this PID:{pid} not found</h2>
                </div>
            )
        }
     }
    }
  return (
     <div className='vh-100'>
        <form className='d-flex' onSubmit={onSearch}>
         <input 
         type="text"
         value={pvalue}
         onChange={updatePValue}
         />
         <button className='btn btn-primary'>Search</button>
        </form>
        {getSwitch()}
    </div>
  )
}

export default Product