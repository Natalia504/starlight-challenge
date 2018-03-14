import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { getAllProduct, toggleView } from './components/reducer';

class App extends Component {
  
  showAll() {
    
    !this.props.allProduct ? null : this.props.getAllProduct()
    this.props.toggleView(this.props.hidden);
  }

  render() {
   
    let data = this.props.allProduct.map((el, i) => {
      return (
        <div key={el.id}>
          <div>Name: {el.name}</div>
          <div>Serial: {el.serial}</div>
          <div>Size: {el.size}</div>
          <div>Date Created: {el.createdDate}</div>
          <div>Modified On: {el.modifiedDate}</div>
        </div>
      )
    })
    return (
      <div className="App">
      <button onClick={() => this.showAll()}>{this.props.hidden ? 'All Items': 'Hide'}</button>
        { !this.props.hidden ? data : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allProduct: state.allProduct,
    hidden: state.hidden
  }
}

export default connect(mapStateToProps, { getAllProduct, toggleView })(App);
