import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField';



class App extends Component {

  constructor(props){
    super(props);
    this.socket = io('127.0.0.1:8000');
    this.click = ev => {
      ev.preventDefault();

      this.socket.emit('clicked', 'message');
    }
  }

  render() {
    return (
      <div>
        <div>hello react</div>
        <button onClick = {(ev) => this.click(ev)}>send message</button>
      </div>
    );
  }
}

export default App;
