import React, { Component } from 'react';
import './App.css';
import Promise from './demo/promise'

class App extends Component {
    componentDidMount () {
        new Promise()
    }
    render() {
        return (
            <div className="App">
            </div>
        );
    }
}

export default App;
