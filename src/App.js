import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import {
  getAllProducts,
  toggleView,
  searchItem,
  userInput
} from './components/reducer';

class App extends Component {
  constructor() {
    super()
    this.state = {
      foundArr: [],
      toggleFound: true
    }
  }

  showAll() {
    (!this.props.allProducts ? null : this.props.getAllProducts());
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

  parseDate(date){
    const newDate = new Date(date);
    const day = newDate.getDate();
    let month = newDate.getMonth();
    const arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    month = arr[month]
    const year = newDate.getFullYear();
    return `${month} ${day}, ${year}`
  }

  render() {
    let foundData = this.state.foundArr.length
      ? this.state.foundArr.map(e => {
        return <div key={e.id} className='found-box'>
          <div className='row'>Name: {e.name}</div>
          <div className='row'>ID:{e.id}</div>
          <div className='row'>Serial: {e.serial}</div>
          <div className='row'>Size: {e.size}</div>
          <div className='row'>Date Created: {this.parseDate(e.createdDate)}</div>
          <div className='row'>Modified On:{this.parseDate(e.modifiedDate)}</div>
        </div>
      })
      : null;

    let data = this.props.allProducts.map((e, i) => {
      return (
        <div key={e.id} className='data-box'>
          <div>Name: {e.name}</div>
          <div>ID: {e.id}</div>
          <div>Serial: {e.serial}</div>
          <div>Size: {e.size}</div>
          <div>Date Created: {this.parseDate(e.createdDate)}</div>
          <div>Modified On: {this.parseDate(e.modifiedDate)}</div>

        </div>
      )
    })
    return (
      <div className="App" >
        <input placeholder='enter size' onChange={(e) => this.props.userInput(e.target.value)} />
        <button onClick={() => this.renderFound(this.props.input)}>{this.state.toggleFound ? 'Find' : 'Hide Results'}</button>
        {!this.state.toggleFound
          ? <div className='found'>
          <div>{`Search results: ${this.state.foundArr.length}`}</div><div className='found'>{foundData}</div>
          </div>
          : null}

        <hr />

        <button type='button' onClick={() => this.showAll()}>
          {this.props.hidden ? 'Show All Items' : 'Hide Items'}
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
    allProducts: state.allProducts,
    hidden: state.hidden,
    found: state.found,
    input: state.input
  }
}

export default connect(mapStateToProps, { getAllProducts, toggleView, searchItem, userInput })(App);
