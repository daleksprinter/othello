import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client'



class App extends Component {

  constructor(props){
    super(props);
    this.socket = io('127.0.0.1:8000');
    console.log(this.socket);
  }

  render() {
    return (
      <div>hello react</div>
    );
  }
}

export default App;
