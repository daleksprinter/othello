import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client'


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      'newroom' : '',
      'existroom' : '',
      'roomname' : '',
    }
    this.socket = io('127.0.0.1:8000');
    console.log(this.socket.id);

    //involve to creating room
    this.create = () => {
      this.socket.emit('create_room', this.state.newroom);
    }

    this.socket.on('success_create',(data) => {
      this.setState({roomname : data});
    })

    this.socket.on('failed_create', () =>{
      console.log('failed_create');
    })


    //involve to entering room 
    this.enter = () => {
      this.socket.emit('enter_room', this.state.existroom);
    }

    this.socket.on('success_enter', (data) => {
      this.setState({roomname : data});
    })

    this.socket.on('failed_enter', () => {
      console.log('failed_enter');
    })

    //involve to exiting room
    this.exitroom = () => {
      this.socket.emit('exitroom', this.state.roomname);
    }

    this.socket.on('exit', (data) => {
      this.setState({roomname : ''});
    })


  }


  render() {
    return (
      <div>
        <div>
          <div id = 'create_new_room'>
            <div>Create New Room</div>
            <input type = 'text' placeholder = 'Room Name' value = {this.state.newroom} onChange = {(event) => this.setState({newroom : event.target.value})}></input>
            <button type = 'button' onClick = {() => this.create()}>Create Room</button>
          </div>

          <div id = 'enter_room'>
            <div>Enter Room</div>
            <input type = 'text' placeholder = "Room Name" value = {this.state.existroom} onChange = {(event) => this.setState({existroom : event.target.value})}></input>
            <button type = 'button' onClick = {() => this.enter()}>Enter Room</button>
          </div>

          <div>You are entering room {this.state.roomname}</div>
          <button type = 'button' onClick = {() => this.exitroom()}>Exit Room</button>
        </div>
      </div>
    );
  }
}

export default App;
