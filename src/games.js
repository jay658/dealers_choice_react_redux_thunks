import React from 'react'
import {connect} from 'react-redux'
import {addRandomGame} from './store'

const _Games = (props)=>{
    const games = props.games
    const addRandomGame = props.addRandomGame
    return (
        <div>
            <button onClick = {addRandomGame}>Add a random game</button>
            <ul>
                {games.map(game=>{
                    return(
                        <li key = {game.id}>{game.name} is a {game.genre} game published by {game.company.name}</li>
                    )
                })}
            </ul>
        </div>
    )
}

const Games = connect(state=>state, (dispatch) => {
    return {
        addRandomGame: ()=>{
            dispatch(addRandomGame())
        }
    }
})(_Games)

export default Games