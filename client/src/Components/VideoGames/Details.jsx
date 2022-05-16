import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { removeGameDetail, videoGamesDetails } from "../../Redux/actions";
import Loading2 from "../Home/Loading/Loadin2";
import "./Details.css"

const Details = () => {


    const dispatch = useDispatch();
    let {id} = useParams();

    const {loading2,videogame} = useSelector(state => state)

    // let gameDetails = Promise.all(videogames.find(e => e.name === videogame.name))
    // .then((res) => res.data)
    
    // console.log(gameDetails)
   


    useEffect(()=>{
        dispatch(removeGameDetail())
        dispatch(videoGamesDetails(id))
       
    },[dispatch])

    return( 
        <div>{
            videogame.name && <div className="contain-gameDetail">
                 <h2>{videogame.name}</h2>
            
                <img src={videogame.img} id="img1" alt="imagen del juego" />
                <div className="all-items">
                <div>

                <h4 >released: {videogame.released}</h4>

                <h4>rating: {videogame.rating}</h4>
                </div>

                <h4>platforms:{videogame.platforms && videogame.platforms.map(e => <a id="plats" key={e}>{e}</a>)}</h4>
                {/* <h4>genres:</h4> */}
                <h4>genres: {videogame.genres && videogame.genres.map(e => <a id="plats" key={e.id}>{e.name}</a>)}</h4>
            
                </div>
            <p>{videogame.description}</p>
                </div>}
                {loading2 && <Loading2/>}
        </div>
    )
}

export default Details;