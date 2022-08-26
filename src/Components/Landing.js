import React from "react";
import {Link} from "react-router-dom";
import "./Landing.css";


const Landing  = ()=>{
    return(
        <div>
            <Link to= "/videogames" ><button  id="btn">LET'S GO!</button></Link>
        </div>
    )
}

export default Landing;
