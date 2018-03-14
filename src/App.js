import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { getAllProduct } from './components/reducer';

class App extends Component {


  componentDidMount() {
    this.props.getAllProduct();
  }


  render() {
    let data = this.props.allProduct.map((el, i) => {
      return (
        <div key={el.id}>
          <div>Name: {el.name}</div>
          <div>Size: {el.size}</div>
          <div>Serial: {el.serial}</div>
          <div>Date Created: {el.createdDate}</div>
          <div>Modified On: {el.modifiedDate}</div>
        </div>
      )
    })
    return (
      <div className="App">
        ALL PRODUCTS: {data}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allProduct: state.allProduct
  }
}

export default connect(mapStateToProps, { getAllProduct })(App);
