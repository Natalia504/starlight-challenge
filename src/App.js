import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { getAllProduct } from './components/reducer';

class App extends Component {


  render() {
    return (
      <div className="App">
      ALL PRODUCTS: {this.props.allProduct}
      </div>
    );
  }
}

const mapStateToProps= state => {
  return {
    allProduct: state.allProducts
  }
}

export default connect(mapStateToProps, { getAllProduct })(App);
