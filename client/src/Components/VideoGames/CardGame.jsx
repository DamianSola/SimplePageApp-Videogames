import React from "react";
import { Link } from "react-router-dom";
import "./CardGame.css"

const CardGame = ({img,name,genres,id}) =>{

   if(!name){
       return(
           <div>
               <h5>EL JUEGO NO EXISTE</h5>
               <img src="https://c.tenor.com/0Wu7tTrT54AAAAAC/sonicthehedgehog-sonic.gif"></img>
           </div>
       )
   }


    return(
        <div className="card-container">
            <Link to={`/videogames/${id}`}>
            <img src={img}  id="img" alt="imagen del juego" />
            </Link>
            <h3>{name}</h3>
            {genres && <p>genres: {genres[0]}, {genres[1]},{genres[2]}</p>}
        </div>
    )
}

export default CardGame;