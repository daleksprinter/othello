import React,{Component} from 'react';
import Row from './Row';
export default class Board extends Component{

    constructor(props){
        super(props);

        

        this.popcount64 = (x1, x0) => {
            let t0 = x1 - (x1 >>> 1 & 0x55555555);
            t0 = (t0 & 0x33333333) + ((t0 & 0xcccccccc) >>> 2);
            let t1 = x0 - (x0 >>> 1 & 0x55555555);
            t0 += (t1 & 0x33333333) + ((t1 & 0xcccccccc) >>> 2);
            t0 = (t0 & 0x0f0f0f0f) + ((t0 & 0xf0f0f0f0) >>> 4);
            return t0 * 0x01010101 >>> 24;
        }

        this.put = (pos) => {
            console.log(pos);
        }

        this.state = {
            player_turn : 0,
            turn : 0,
            white0 : (1 << 27),
            white1 : (1 << 36 - 32),
            black0 : (1 << 28),
            black1 : (1 << 35 - 32),
            mob0 : this.mobility().first,
            mob1 : this.mobility().second,
            whitecount : 2,
            blackcount : 2,
        }

    }

    mobility = (turn) => {
        var p0, p1, o0, o1;
        if(turn == 0){
            p0 = this.state.black0;
            p1 = this.state.black1;
            o0 = this.state.white0;
            o1 = this.state.white1;
        }else{
            o0 = this.state.black0;
            o1 = this.state.black1;
            p0 = this.state.white0;
            p1 = this.state.white1;
        }

        let mob1 = 0;
        let mob0 = 0;
        
        let blank1 = ~(p1 | o1);
        let blank0 = ~(p0 | o0);
    
        let mo1 = o1 & 0x7e7e7e7e;
        let mo0 = o0 & 0x7e7e7e7e;
    
        // 右向き
    
        let ps1 = p1 << 1;
        let ps0 = p0 << 1;
    
        mob1 = (mo1 + ps1) & blank1 & ~ps1;
        mob0 = (mo0 + ps0) & blank0 & ~ps0;
    
        // 左向き
    
        let t0 = p0 >>> 1 & mo0;
        t0 |= t0 >>> 1 & mo0;
        t0 |= t0 >>> 1 & mo0;
        t0 |= t0 >>> 1 & mo0;
        t0 |= t0 >>> 1 & mo0;
        t0 |= t0 >>> 1 & mo0;
    
        mob0 |= t0 >>> 1 & blank0;
    
        let t1 = p1 >>> 1 & mo1;
        t1 |= t1 >>> 1 & mo1;
        t1 |= t1 >>> 1 & mo1;
        t1 |= t1 >>> 1 & mo1;
        t1 |= t1 >>> 1 & mo1;
        t1 |= t1 >>> 1 & mo1;
    
        mob1 |= t1 >>> 1 & blank1;
    
        // 上下
    
        mo1 = o1 & 0x00ffffff;
        mo0 = o0 & 0xffffff00;
    
        // 下向き
        t0 = p0 << 8 & mo0;
        t0 |= t0 << 8 & mo0;
        t0 |= t0 << 8 & mo0;
    
        t1 = (p1 << 8 | (t0 | p0) >>> 24) & mo1;
        t1 |= t1 << 8 & mo1;
        t1 |= t1 << 8 & mo1;
    
        mob1 |= (t1 << 8 | t0 >>> 24) & blank1;
        mob0 |= t0 << 8 & blank0;
    
        // 上
        t1 = p1 >>> 8 & mo1;
        t1 |= t1 >>> 8 & mo1;
        t1 |= t1 >>> 8 & mo1;
    
        t0 = (p0 >>> 8 | (t1 | p1) << 24) & mo0;
        t0 |= t0 >>> 8 & mo0;
        t0 |= t0 >>> 8 & mo0;
    
        mob1 |= t1 >>> 8 & blank1;
        mob0 |= (t0 >>> 8 | t1 << 24) & blank0;
    
        // 斜め
    
        mo1 = o1 & 0x007e7e7e;
        mo0 = o0 & 0x7e7e7e00;
    
        // 右下
        t0 = p0 << 9 & mo0;
        t0 |= t0 << 9 & mo0;
        t0 |= t0 << 9 & mo0;
    
        t1 = (p1 << 9 | (t0 | p0) >>> 23) & mo1;
        t1 |= t1 << 9 & mo1;
        t1 |= t1 << 9 & mo1;
    
        mob1 |= (t1 << 9 | t0 >>> 23) & blank1;
        mob0 |= t0 << 9 & blank0;
    
        // 左上
        t1 = p1 >>> 9 & mo1;
        t1 |= t1 >>> 9 & mo1;
        t1 |= t1 >>> 9 & mo1;
    
        t0 = (p0 >>> 9 | (t1 | p1) << 23) & mo0;
        t0 |= t0 >>> 9 & mo0;
        t0 |= t0 >>> 9 & mo0;
    
        mob1 |= t1 >>> 9 & blank1;
        mob0 |= (t0 >>> 9 | t1 << 23) & blank0;
    
        // 左下
        t0 = p0 << 7 & mo0;
        t0 |= t0 << 7 & mo0;
        t0 |= t0 << 7 & mo0;
    
        t1 = (p1 << 7 | (t0 | p0) >>> 25) & mo1;
        t1 |= t1 << 7 & mo1;
        t1 |= t1 << 7 & mo1;
    
        mob1 |= (t1 << 7 | t0 >>> 25) & blank1;
        mob0 |= t0 << 7 & blank0;
    
        // 右上
        t1 = p1 >>> 7 & mo1;
        t1 |= t1 >>> 7 & mo1;
        t1 |= t1 >>> 7 & mo1;
    
        t0 = (p0 >>> 7 | (t1 | p1) << 25) & mo0;
        t0 |= t0 >>> 7 & mo0;
        t0 |= t0 >>> 7 & mo0;
    
        mob1 |= t1 >>> 7 & blank1;
        mob0 |= (t0 >>> 7 | t1 << 25) & blank0;

        return({
            first : mob0,
            second : mob1,
        })
    }
    

    render(){
        this.setState({
            mob0 : this.mobility(this.state.turn).first,
            mob1 : this.mobility(this.state.turn).second,
        })
        var board = [];
        for(var i = 0; i < 32; i++){
            var state;
            if(this.state.white0 & (1 << i)) state = 'white';
            else if(this.state.black0 & (1 << i)) state = 'black';
            else if(this.state.mob0 & (1 << i)) state = 'mobility';
            else state = 'empty';
            board.push({'state' : state, 'id' : i});
        }

        for(var i = 0; i < 32; i++){
            var state;
            if(this.state.white1 & (1 << i)) state = 'white';
            else if(this.state.black1 & (1 << i)) state = 'black';
            else if(this.state.mob1 & (1 << i)) state = 'mobility';
            else state = 'empty';
            board.push({'state' : state, 'id' : 32 + i});
        }


 
        return(
            <div>
                <div>
                    <Row data = {board.slice(0, 8)} func = {this.put} />
                    <Row data = {board.slice(8, 16)} func = {this.put} />
                    <Row data = {board.slice(16, 24)} func = {this.put}/>
                    <Row data = {board.slice(24, 32)} func = {this.put}/>
                    <Row data = {board.slice(32, 40)} func = {this.put}/>
                    <Row data = {board.slice(40, 48)} func = {this.put}/>
                    <Row data = {board.slice(48, 56)} func = {this.put}/>
                    <Row data = {board.slice(56)} func = {this.put}/>
                </div>

            </div>
        )
    }
}