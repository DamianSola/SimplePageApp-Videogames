import React, { useEffect, useState } from "react";
// import {getAllVideoGames} from "./Redux/actions";
import CardGame from "../VideoGames/CardGame";
import {getAllVideoGames,Genres} from "../../Redux/actions"
import { useDispatch, useSelector } from "react-redux";
import "./Home.css"
import NavBar from "../NavBar/NavBar";
import Loading from "./Loading/Loading";
import Pagination from "./Pagination/Pagination";
import FilterGenres from "./Filters/FilterGenres";


const Home = () => {

    // let [loading, setLoading] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const [gamesPerPage, setGamesPerPage] = useState(15)
    
    const {videogames,loading} = useSelector(state => state)
    console.log(videogames)
    
    const indexUltGames = currentPage*gamesPerPage;
    const indexFirstGame = indexUltGames-gamesPerPage;
    const currentGames = videogames.slice(indexFirstGame,indexUltGames);
    console.log(currentGames)


    const page = (numPage) =>{
        setCurrentPage(numPage)
    }
    
    let dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllVideoGames())
        dispatch(Genres())
        // if(videogames.length > 0) setLoading(false)
    },[])

    return(
    <div>
        <FilterGenres/>
        <Pagination 
            gamesPerPage= {gamesPerPage}
            totalGames= {videogames.length}
            page = {page}/>
        <div className="home-container"> 
            {currentGames && currentGames.map(e => {
                return <CardGame
                id= {e.id}
                name= {e.name}
                img= {e.img}
                genres= {e.genres && e.genres.map(e => e.name)}
                key= {e.id?e.id:"NNNN"}/>
            })}
        </div>
        {loading && <Loading/>}
    </div>)
  
}

export default Home;