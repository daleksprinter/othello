import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField';



class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      'text' : '',
      'messages' : []
    }
    this.socket = io('127.0.0.1:8000');

    
    this.click = ev => {
      ev.preventDefault();

      this.socket.emit('send', this.state.text);
      this.setState({text : ""});
    
    }

    const addmessage = (data) => {
      this.setState({messages : [...this.state.messages, data]});
    }

    this.socket.on('recieve', (data) => {
      console.log('got data');
      addmessage(data);
    })
  }


  render() {
    return (
      <div>
        <div>
          {this.state.messages.map(message => {
            return(
              <div>{message}</div>
            )
          })}
        </div>
        <input type = "text" value = {this.state.text} onChange = {(event) => {this.setState({text : event.target.value})}}></input>
        <button onClick = {(ev) => this.click(ev)}>send message</button>
      </div>
    );
  }
}

export default App;
