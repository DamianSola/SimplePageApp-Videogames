const { Router } = require('express');
const express = require('express');
const {Videogame,Genres} = require('../db')
const {getAllVideoGames,videoGamesDetails, genresDb, createVideoGames,getGenresVg} = require('./GamesFunctions')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const logger = require('morgan')



const router = Router();
router.use(express.json())

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", async (req,res) => {
    let name = req.query.name;
    const videoGames = await getAllVideoGames()
    try{
        if(name){
            let nameVideoGame = videoGames.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            console.log(nameVideoGame)
            if(nameVideoGame.length!==null && nameVideoGame.length !== 0) {
                res.json(nameVideoGame)
            }else res.status(400).send({msg:"el juego no existe"})
        }else{
            res.send(videoGames)
        }
    }catch(error){
       console.log(error)
    }

})

router.get('/videogames/:idVideogame', async (req,res) => {
    let {idVideogame} = req.params;
    // res.send(idVideogame)
    try{
        let videoGame = await videoGamesDetails(idVideogame)
        if(videoGame){
            res.json(videoGame);
        } 
        else res.status(404).send({error: 'el id no es correcto'})
    }catch(error){
        console.log(error);
        res.json({msg:{error}})
    }
})

router.get('/genres',async (req,res) => {
    let gen = await Genres.count()
    if(gen === 0) await getGenresVg();
    let genres = await genresDb();
    res.send(genres)
})

router.post('/videogames', async(req,res,next) => {
    let {name,description,released,rating,platforms,img,genres} = req.body;
    try{
        released = released
        let newVideoGame = await createVideoGames({name,description,released,rating,platforms,img,genres})
        console.log(newVideoGame)
        res.send(newVideoGame)
    }catch(error){
        console.log(error)
        next(error)    }
})


module.exports = router;
