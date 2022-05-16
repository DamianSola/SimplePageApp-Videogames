import React, { useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { filterByGenres, filterByPlatforms,filterABC, addNewVideoGame,funcInOrder,getAllVideoGames} from "../../../Redux/actions";
import "./filter.css"

const FilterGenres = () =>{

    const dispatch = useDispatch()
    const {genres,videogames2} = useSelector(state => state)


    
    const platforms = () =>{
        let platform = videogames2.map(e => e.platforms)
        platform = platform.join()
        platform = platform.split(",")
        platform = platform.filter((item,index)=>{
            return platform.indexOf(item) === index;
        })
        return platform
    }
    const abc = () => {
        let abc = videogames2.map(e => e.name[0])
        abc = abc.filter((item,index)=>{
            return abc.indexOf(item) === index;
        })
        abc = abc.sort()
        return abc
    }
    
    const onChangeGenres = (e) => {
        dispatch(filterByGenres(e.target.value))
    }
    const onChangePlatforms = (e) => {
        dispatch(filterByPlatforms(e.target.value))
    }
    const onChangeAbc = (e) => {
        dispatch(filterABC(e.target.value))
    }

    const onChangeNewGame = () => {
        dispatch(addNewVideoGame())
    }

    const inOrder = () => {
        dispatch(funcInOrder())
    }

    const allGames = () => {
        dispatch(getAllVideoGames(videogames2))
    }


    return(
        <div className="filt-cont">
            <label id="label">filter by gender </label>
            <select onChange={(e) => onChangeGenres(e)} id="label">
                <option value="all">all genres</option>
                {genres && genres.map(e => {
                    return(
                    <option value={e.name} key={e.id}>{e.name}</option>
                    ) 
                })}
            </select>

            <label id="filt">filter by platforms </label>
            <select onChange={(e) => onChangePlatforms(e)} id="label">
                <option value="all">all platforms</option>
                {platforms() && platforms().map(e => {
                    return(
                    <option value={e} key={e}>{e}</option>
                    ) 
                })}
            </select>

            <label id="filt">A-Z </label>
            <select  id="label" onChange={(e) => onChangeAbc(e)}>
                <option value="all" >all</option>
                {abc() && abc().map(e => {
                    return(
                    <option value={e} key={e}>{e}</option>
                    ) 
                })}
            </select>
            <br/>
            <button onClick={onChangeNewGame} id="btn-new-games">games created</button>
            <button onClick={inOrder}  id="btn-new-games" >in order</button>
            <button onClick={allGames}  id="btn-new-games" > all Games</button>
    </div>
    )
}

export default FilterGenres;