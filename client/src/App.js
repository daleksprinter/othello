import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      'username' : '',
      'roomname' : '',
      'messages' : [],
    }
    this.socket = io('127.0.0.1:8000');

    this.enter = () => {
      this.socket.emit('enter', this.state.roomname);
    }

    this.socket.on('message', (message) => {
      this.setState({'messages' : [...this.state.messages, message]});
    })


  }


  render() {
    return (
      <div>
        <div id = 'input'>
          <Input
            placeholder = 'UserName'
            value = {this.state.username}
            onChange = {(event) => {this.setState({username : event.target.value})}}
          ></Input><div></div>
          
          <Input
            placeholder = 'RoomName'
            value = {this.state.roomname}
            onChange = {(event) => {this.setState({roomname : event.target.value})}}
          ></Input><div></div>
          
          <Button variant = 'contained' onClick = {() => this.enter()}>Enter</Button>
        </div>
        
        <div id = 'messages'>
          {this.state.messages.map((message) => (
            <div>{message}</div>
          ))}
        </div>

        <div id = 'board'></div>
      </div>
    );
  }
}

export default App;
