import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const About = (props) => {
  const { info } = props;
  const navigate = useNavigate();
  return (
    <div style={{ height: "80vh" }}>
      About:{info}
      <div className="d-flex justify-content-center">
        <button className="btn btn-warning m-3" onClick={()=>navigate(-1)}>Back</button>
        <button className="btn btn-warning m-3" onClick={() => navigate("/",{replace:true})}>
          Home
        </button>
        <button className="btn btn-warning m-3" onClick={()=>navigate(1)}>Forward</button>
      </div>
    </div>
  );
};

export default About;
