import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { getAllProduct, toggleView, searchItem, userInput } from './components/reducer';

class App extends Component {
  constructor() {
    super()
    this.state = {
      foundArr: [],
      toggleFound: true
    }
  }

  showAll() {
    (!this.props.allProduct ? null : this.props.getAllProduct());
    this.props.toggleView(this.props.hidden);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.found.data !== this.props.found.data) {
      this.setState({
        foundArr: nextProps.found.data, 
        toggleFound: !this.state.toggleFound
      })
    }
  }

  renderFound(input) {
    this.props.searchItem(input);
  }

  render() {

    let foundData = this.state.foundArr.length ? this.state.foundArr.map(e => {
      return <div key={e.id} className='found-box'>
        <div>Name: {e.name}</div>
        <div>ID: {e.id}</div>
        <div>Serial: {e.serial}</div>
        <div>Size: {e.size}</div>
        <div>Date Created: {e.createdDate}</div>
        <div>Modified On: {e.modifiedDate}</div>
      </div>
    })
      : null

    let data = this.props.allProduct.map((e, i) => {
      return (
        <div key={e.id} className='data-box'>
          <div>Name: {e.name}</div>
          <div>ID: {e.id}</div>
          <div>Serial: {e.serial}</div>
          <div>Size: {e.size}</div>
          <div>Date Created: {e.createdDate}</div>
          <div>Modified On: {e.modifiedDate}</div>

        </div>
      )
    })
    return (
      <div className="App" >
        <input placeholder='enter size' onChange={(e) => this.props.userInput(e.target.value)} />
        <button onClick={() => this.renderFound(this.props.input)}>{this.state.toggleFound ? 'Find' : 'Hide'}</button>
        {!this.state.toggleFound
        ? <div className='found'>{foundData}</div>
        : null}

        <hr />

        <button onClick={() => this.showAll()}>
          {this.props.hidden ? 'All Items' : 'Hide'}
        </button >
        {!this.props.hidden
          ?
          <div className='data'>{data}</div>
          : null}
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    allProduct: state.allProduct,
    hidden: state.hidden,
    found: state.found,
    input: state.input
  }
}

export default connect(mapStateToProps, { getAllProduct, toggleView, searchItem, userInput })(App);
