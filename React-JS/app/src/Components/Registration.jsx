import React, { useState } from "react";

const Registration = () => {
  const [ regInfo, setRegInfo ] = useState({
    user:"",
    pwd:"",
    age:0
  });
  const [check,setCheck]=useState(false);
  const updateRegInfo = (event) => {
    const {name,value}=event.target;
    setRegInfo({...regInfo,[name]:value})
  };
  const submitValue = (event) => {
    event.preventDefault();
    setCheck(true)
  };
  return (
    <div className="w-100 mx-auto vh-100">
      <h2 className="bg-warning mt-3 text-center">Registration Form</h2>
      <form
        className="d-flex flex-column w-50 mx-auto gap-3 mt-5"
        onSubmit={submitValue}
      >
        <input
          type="text"
          name="user"
          value={regInfo.user}
          onChange={updateRegInfo}
          placeholder="Enter user name"
        />
        <input
          type="password"
          name="pwd"
          value={regInfo.pwd}
          onChange={updateRegInfo}
          placeholder="Enter password"
        />
        <input 
        type="number"
        name="age"
        value={regInfo.age}
        onChange={updateRegInfo}
        />
        <button
          type="submit"
          className="btn btn-primary w-25 align-self-center"
        >
          Register
        </button>        
      </form>
      {
        check && <Display user={regInfo.user} pwd={regInfo.pwd}/>
      }
    </div>
  );
};
const Display=(props)=>{
    const {user,pwd}=props;
 return (
    <div>
     <h3>User:{user}</h3>
     <h3>Password:{pwd}</h3>
    </div>
 )
}
export default Registration;
