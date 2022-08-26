const axios = require('axios');
const { response } = require('express');
const {Videogame,Genres} = require('../db.js');



const getVideoGamesByApi = async () => {
    let allGames = [];
    let index = 1;
    while(index<=5){
        const gamesUrl = await axios.get(`https://api.rawg.io/api/games?key=3770bf1853484aa28efc3db63fbc675b&page=${index}`)
        let games = gamesUrl.data.results.map( e => {
            return {
                name: e.name,
                released: e.released,
                rating: e.rating,
                platforms: e.platforms.map(p => p.platform.name),
                img: e.background_image,
                genres: e.genres,
                id: e.id
            }})
            allGames =  allGames.concat(games)
        index++
    }
    // Promise.all(allGames)
    // console.log(allGames)
    return allGames;
}

const videoGamesDetails = async(id) => {
    if(id.length > 6) {
        const dbgame = await Videogame.findOne({where: {id:id}, include:Genres})
        return dbgame;
    } 
//    console.log(dbgame)
    let detail;
    let index=1;
    while(!detail || index<6){
        detail = await axios.get(`https://api.rawg.io/api/games/${id}?key=3770bf1853484aa28efc3db63fbc675b&page=${index}`)
        index++
    }
    const videogame = detail.data
    return ({
        name: videogame.name,
        released: videogame.released,
        rating: videogame.rating,
        img: videogame.background_image,
        description: videogame.description_raw,
        genres: videogame.genres,
        platforms: videogame.platforms.map(e => e.platform.name)
    })
}

const createVideoGames = async({name,description,released,rating,platforms,img,genres}) => {
        const newGame = await Videogame.create({
        name:name,
        description: description,
        released: released,
        rating: rating,
        platforms: platforms,
        img:img,
    })
    console.log(genres, "holaaa estoy aqui")
    // let idsGen =  genres.map(async e => {
    //     return  function(){
    //         return  Genres.findOne({where :{name: e.name}})
    //     }})
    // console.log(idsGen)
    // let result = await Promise.all(idsGen.map(e => e()))
    // console.log(result)
    let gen = await newGame.addGenres(genres)
    console.log(gen)
    return newGame
}


const getVideoGamesDb= async() =>{
    return await Videogame.findAll({include: Genres})
}

const getAllVideoGames = async()=>{
    const infoDb = await getVideoGamesDb();
    const infoApi = await getVideoGamesByApi();
    return infoApi.concat(infoDb)
}

const getGenresVg = async() =>{
    const genresApi = await axios.get(`https://api.rawg.io/api/games?key=3770bf1853484aa28efc3db63fbc675b`)
    let genres = genresApi.data.results.map(e => e.genres.map(e => e.name))
    genres = genres.join()
    genres = genres.split(',');
    genres = genres.filter((item,index)=>{
        return genres.indexOf(item) === index;
    })
    genres = genres.map( e => ({name: e}))
    await Genres.bulkCreate(genres)
    console.log(genres)
} 

const genresDb =  async() => {
    return await Genres.findAll();
}
// getGenresVg()

module.exports ={
    getAllVideoGames,
    getVideoGamesByApi,
    getVideoGamesDb,
    videoGamesDetails,
    genresDb,
    createVideoGames,
    getGenresVg};