import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideoGames,Genres, createVideoGame,addNewVideoGame } from "../../Redux/actions";
import "./Create.css"


const validation = (newGame) => {

    let error = {}

    if(!newGame.name)  error.name="se requiere un nombre" 
    if(!newGame.rating)  error.rating="se requiere un rating"
    if(newGame.description.length < 10) error.description="se requiere al menos 10 caracteres"
    if(newGame.platforms.length === 0) error.platforms="se requiere al menos una plataforma"
    if(newGame.genres.length === 0) error.genres="se requiere al menos un genero"
    if(!newGame.img) error.img="se requiere una url"
    if(!newGame.released) error.released="se requiere una fecha"

    return error;
    
}

//////////// CREAR/AGREGAR UN JUEGO NUEVO AL LA APP
const CreateVideoGame = () => {

    const [input, setInput] = useState({
        name:"",
        rating:"",
        platforms:[],
        genres:[],
        description: "",
        img: "",
        released:"",
    }) 
    const [error, setError] = useState({})


    let {videogames2,genres} = useSelector(state => state)
    let dispatch = useDispatch()


    const getPlatforms = () => {/// esta funcion sirve para mostrar las plataformas en la pp
        if(videogames2.length === 0 ) dispatch(getAllVideoGames())
        if(genres.length === 0) dispatch(Genres())
        let platform = videogames2.map(e => e.platforms)
        platform = platform.join()
        platform = platform.split(",")
        platform = platform.filter((item,index)=>{
            return platform.indexOf(item) === index;
        })
        return platform
    }

    


    const handleOnChange = (event) => {
        // if()
        const {name, value} = event.target;  
        
        setInput({
          ...input,
          [name]:value
        })
        setError(validation({
            ...input,
            [name]: value
        }))
        console.log(error)
        // console.log(plat)
    }

    const handleSelctor = (e) => {        
        let {value,name} = e.target

        if(name === "platforms"){
            if(input.platforms.includes(value)){
                // setPlat(plat.filter(e => e !== value))
                setInput({
                    ...input,
                    platforms: input.platforms.filter(e => e !== value)
                })
            }else setInput({
                ...input,
                platforms: [...input.platforms, value]
            })
            // setPlat(plat.concat(value))

            // setInput({...input , platforms:plat})  
        }
        // setInput({...input ,platforms:plat})  
        if(name === "genres"){
            if(input.genres.includes(value)){
                setInput({
                    ...input,
                    genres: input.genres.filter(e => e !== value)
                })
            }else {
                setInput({
                    ...input,
                    genres:[...input.genres, value]
                })
            }
            // setGen(gen.concat(value))
            
        }
        setError(validation({
            ...input,
            [name]:value
        }))
    }

    const HandleSubmit = (e) => {
        e.preventDefault()
        if(Object.keys(error).length === 0){
            dispatch(createVideoGame(input))
            alert("se agrego un nuevo juego")
            dispatch(addNewVideoGame(input))
        }else{
            alert("el campo debe ser completado correctamente")
        }
    }

    return(
        <form className="container-form" onSubmit={(e) =>HandleSubmit(e)}>
            <label>name</label>
            <input type="text" name="name" onChange={(e) => handleOnChange(e)} value={input.name}/>
            {error.name && <p className="error-item">{error.name}</p>}

            <label>rating</label>
            <input type="number" max="10" min="0" step="0.01" name="rating" onChange={handleOnChange} value={input.rating}/>
            {error.rating && <p className="error-item">{error.rating}</p>}
            
            <br/>
            <label>platforms</label>
            <select name="platforms" onChange={handleSelctor} value={input.platforms} multiple>
                {getPlatforms().map(p => {
                    return <option  key={p} value={p}>{p}</option>
                })}
            </select>
            {error.platforms && <p className="error-item">{error.platforms}</p>}
            <p>{input.platforms && input.platforms.map(e => <a key={e}>{e+", "}</a>)}</p>
            

            <label>genres</label>
            <select name="genres" onChange={handleSelctor} value={input.genres} multiple>
                {genres.map(p => {
                    return <option key={p.id} value={p.id}>{p.name}</option>
                })}
            </select>
            {error.genres && <p className="error-item">{error.genres}</p>}
            {/* <p>{input.genres && input.genres.map(e => <a key={e}>{e+", "}</a>)}</p> */}


            <br/>
            <label htmlFor="">released</label>
            <input type='date' name="released" onChange={handleOnChange} value={input.released}/>
            {error.released && <p className="error-item">{error.released}</p>}


            <label>videogame image</label>
            <input name="img" type="url" onChange={handleOnChange} value={input.value}/>
            {error.img && <p className="error-item">{error.img}</p>}
            <img src={input.img}/>

            <br/>
            <label>description</label>
            <input type="text" name="description" 
            onChange={handleOnChange} value={input.description} 
            className="input-desc"/>
            {error.description && <p className="error-item">{error.description}</p>}


            <br/>
            <input type="submit" value="create" id="btn-create"/>
            {error.length > 0 && <p>la informacion no es valida</p>}
            {error.length === 0 && <p>la ing=formacion es valida</p>}

        </form>
    )
}

export default CreateVideoGame;