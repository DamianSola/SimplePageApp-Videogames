

const initialState = {
    videogames: [],
    videogames2: [],
    genres: [],
    videogame: {},
    loading: true,
    loading2: true,
    newGame:[]
}

const Reducer = (state= initialState, action) => {
    switch(action.type){
        case "GET_ALL_VIDEOGAMES":
            // let vg;
            // if(state.videogames2.length > 0){
            //     vg = state.videogames2
            // }else{
            //     vg = action.payload
            // }
            return {
                ...state,
                videogames: action.payload,
                videogames2: action.payload,
                loading: false
            }
        case "GET_VIDEOGAME":
            return{
                ...state,
                videogames: action.payload
            }
        case 'FILTER_BY_GENRES':
            let allGames = state.videogames2;
            let filtradoGen = allGames.filter(e => e.genres !== undefined)
            let filtering = action.payload==="all"?filtradoGen:filtradoGen.filter(e => e.genres.find(e => e.name.includes(action.payload)))
            return{
                ...state,
                videogames: filtering
            }
        case "FILTER_BY_PLATFORM":
            let allgames = state.videogames2;
            let filter = action.playload==="all"?allgames:allgames.filter(e => e.platforms.includes(action.payload))
            return{
                ...state,
                videogames: filter
            }
        case "FILTER_WORD":
            let gamesWord = state.videogames2;
            let filt = action.payload==='all'?gamesWord:gamesWord.filter(e => e.name[0] === action.payload)
            return{
                ...state,
                videogames: filt
            }
        case "ALL_GENRES":
            return{
                ...state,
                genres: action.payload
            }
        case "VIDEOGAMES_DETAILS":
            return{
                ...state,
                videogame: action.payload,
                loading2: false
            }
        case "REMOVE_GAME_DETAIL":
            return{
                ...state,
                videogame: action.payload,
                loading2: true,
            }    
        case "FILT_NEW_VIDEOGAME":
            let justNewGames = state.videogames2.filter(e => e.id.length>4)
            return{
                ...state,
                videogames: justNewGames
            }
        case "IN_ORDER_ALF":
            let inOrderGames = state.videogames2
            let letras = inOrderGames.map(e => e.name[0])
            letras = letras.sort()
            letras = letras.filter((item,index)=>{
                return letras.indexOf(item) === index;
            })
            let ordenados = []
            for(let i = 0; i<letras.length; i++){
              let l = inOrderGames.filter(e => e.name[0] === letras[i])
            ordenados = ordenados.concat(l)
            }
        return{
            ...state,
            videogames:ordenados
        }
        default: return state;

    }
  
}

export default Reducer;