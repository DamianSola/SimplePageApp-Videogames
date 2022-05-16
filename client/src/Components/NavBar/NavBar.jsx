import React from "react";
import Search from "./Search";
import "./NavBar.css"
import { Link } from "react-router-dom";
import FilterGenres from "../Home/Filters/FilterGenres";

const NavBar = () => {

    return(
        <div className="container-barra">
            <Link to='/'>
            <img src="https://1000marcas.net/wp-content/uploads/2020/01/Sonic-Logo-1.png"  width="80" height="50" alt="" />
            </Link>
            {/* <FilterGenres/> */}
            <Link to="/videogames"><button className="title">VIDEOGAMES</button></Link>
            <Link to="/videogames/create"><button id="add-btn">add videogame</button></Link>
            <Search/>
        </div>
    )
}

export default NavBar;