import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

const GET_GAMES = 'GET_GAMES'
const ADD_RANDOM_GAME = 'ADD_RANDOM_GAME'

const initialState = {
    games: []
}

function reducer(state = initialState, action){
    if(action.type === GET_GAMES){
        state = {...state, games: action.games}
    }
    if(action.type === ADD_RANDOM_GAME){
        state = {...state, games: action.games}
    }
    return state
}

export const getGames = ()=>{
    return async(dispatch)=>{
        const response = await axios.get('/api/games')
        dispatch({
            type: GET_GAMES,
            games: response.data
        })
    }
}

export const addRandomGame = ()=>{
    return async(dispatch) =>{
        const response = await axios.post('/api/games')
        dispatch({
            type: ADD_RANDOM_GAME,
            games: response.data
        })
    }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store