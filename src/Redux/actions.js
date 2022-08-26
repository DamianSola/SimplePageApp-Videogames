const axios = require('axios')


export const getAllVideoGames = (arg) => {
    if(arg){
        return{
            type: "GET_ALL_VIDEOGAMES",
            payload: arg
        }
    }
    return function (dispatch){
        return axios.get("/videogames")
        .then((res) => {
            dispatch({
                type: "GET_ALL_VIDEOGAMES",
                payload: res.data
            })
        })
    }
}

export const getGameByName = (name) => {
    return function (dispatch){
        return axios.get("/videogames?name="+name)
        .then((res) => {
            dispatch({
                type: "GET_VIDEOGAME",
                payload: res.data
            })
        })
    }
}

export const Genres = () =>{
    return function(dispatch){
        return axios.get("/genres")
        .then((res =>{
            dispatch({
                type:"ALL_GENRES",
                payload: res.data
            })
        }))
    }
}

export const filterByGenres = (genres) => {
    return {
        type: 'FILTER_BY_GENRES',
        payload: genres
    }
}

export const filterByPlatforms = (platform) => {
    return{
        type: "FILTER_BY_PLATFORM",
        payload: platform
    }
}

export const filterABC = (word) =>{
    return{
        type:"FILTER_WORD",
        payload: word
    }
}

export const videoGamesDetails = (id) => {
    return function(dispatch){
        return axios.get(`/videogames/${id}`)
        .then(res => {
            dispatch({
                type:"VIDEOGAMES_DETAILS",
                payload: res.data
            })
        })
    }
}

export const removeGameDetail = () => {
    return{
        type: "REMOVE_GAME_DETAIL",
        payload: {}
    }
}
export const createVideoGame = (data) => {
    return function(dispatch){
        return axios.post(`/videogames`,data)
            .then((res)=>{
                return res;
            })
        }
}

export const addNewVideoGame = (data) => {
    return{
        type:"FILT_NEW_VIDEOGAME",
        payload: data
    }
}

export const funcInOrder = () => {
    return{
        type: "IN_ORDER_ALF"
    }
}


export default (getAllVideoGames,getGameByName,
    filterByGenres,Genres,
    removeGameDetail,filterByPlatforms,
    filterABC,createVideoGame,addNewVideoGame,funcInOrder)
