import React from 'react'
import {connect} from 'react-redux'
import {addRandomGame, deleteGame} from './store'

const _Games = (props)=>{
    const games = props.games
    const {addRandomGame, deleteGame } = props
    return (
        <div>
            <button onClick = {addRandomGame}>Add a random game</button>
            <ul>
                {games.map(game=>{
                    return(
                        <div key = {game.id}>
                            <li >{game.name} is a {game.genre} game published by {game.company.name}</li>
                            <button onClick = {()=>deleteGame(game)}>Delete Game</button>
                        </div>
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
        },
        deleteGame: (game)=>{
            dispatch(deleteGame(game))
        }
    }
})(_Games)

export default Games