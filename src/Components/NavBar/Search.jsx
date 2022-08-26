import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getGameByName} from "../../Redux/actions"
import "./Search.css"


const Search = () => {

    let [input, setInput] = useState("")  


    const handleChange = (e) =>{
        setInput(e.target.value)
        console.log(e.target.value)
    }
    const {videogames} = useSelector(state => state)

    const dispatch = useDispatch()

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(getGameByName(input))
        setInput("")
    }

    return(
        <div>
            <form>
                <input type="text"  placeholder="videogames..." 
                onChange={(e) => handleChange(e)} value={input} />
                <button type='submit' onClick={(e) => handleSubmit(e)} id="btn-search">search</button>
            </form>
        </div>
    )
}


export default Search;