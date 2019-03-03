import React,{Component} from 'react';
import Row from './Row';
export default class Board extends Component{

    constructor(props){
        super(props);
        this.state = {
            turn : 0,
            white0 : (1 << 27),
            white1 : (1 << 36 - 32),
            black0 : (1 << 28),
            black1 : (1 << 35 - 32),
        }
    }

    render(){
        var board = [];
        for(var i = 0; i < 32; i++){
            if(this.state.white0 & (1 << i)) board.push('white');
            else if(this.state.black0 & (1 << i)) board.push('black');
            else board.push('empty');
        }

        for(var i = 0; i < 32; i++){
            if(this.state.white1 & (1 << i)) board.push('white');
            else if(this.state.black1 & (1 << i)) board.push('black');
            else board.push('empty');
        }
        
 
        return(
            <div className = 'board'>
                <Row stones = {board.slice(0, 8)} />
                <Row stones = {board.slice(8, 16)} />
                <Row stones = {board.slice(16, 24)} />
                <Row stones = {board.slice(24, 32)} />
                <Row stones = {board.slice(32, 40)} />
                <Row stones = {board.slice(40, 48)} />
                <Row stones = {board.slice(48, 56)} />
                <Row stones = {board.slice(56)} />
            </div>
        )
    }
}