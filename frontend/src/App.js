import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import keys from './keys';

class App extends Component {

  state = {
    messages: [],
  }

  componentDidMount() {
    axios.get(`${keys.APIPATH}/message/`)
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
