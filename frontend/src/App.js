import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const keys = require('./keys');

class App extends Component {

  state = {
    messages: [],
  }

  componentDidMount() {
    console.log(keys.apiPath)
    axios.get(`${keys.apiPath}/message/`)
    .then((result) => {
      this.setState({ messages: result.data })
    }).catch((err) => {
      console.log(err)
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Messages Received from Server
        </header>
        <div>
          { this.state.messages.map(message => <ul>{ message.message }</ul>) }
        </div>
      </div>
    );
  }
}

export default App;
