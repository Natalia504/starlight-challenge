import React, { Component } from 'react';
import Home from './components/Home';
import ItemDetails from './components/ItemDetails';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/itemDetails/:id' component={ItemDetails} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;