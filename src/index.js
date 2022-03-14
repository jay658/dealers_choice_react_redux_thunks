import React from 'react';
import { render } from 'react-dom';
import store , {getGames} from './store'
import {Provider, connect} from 'react-redux'
import Games from './games'

class _App extends React.Component{

    async componentDidMount(){
        this.props.getGames()
    }

    render(){
        return(
            <div>
                <h1>Games</h1>
                <Games/>
            </div>
        )
    }
}

const App = connect(state=>state, (dispatch)=>{
    return {
        getGames: ()=>{
            dispatch(getGames())
        }
    }
})(_App)


render(<Provider store = {store}><App/></Provider>, document.querySelector('#root'));