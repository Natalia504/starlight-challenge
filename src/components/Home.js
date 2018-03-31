import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import {
  getAllProducts,
  toggleView,
  toggleFound,
  searchItem,
  userInput
} from '../reducer';
import { Link } from 'react-router-dom';
import parseDate from './../utils';


class Home extends Component {

  showAll() {
    this.props.allProducts.length ? null : this.props.getAllProducts();
    this.props.toggleView(this.props.hidden);
  }

  renderFound(input) {
    this.props.searchItem(input);
    this.props.toggleFound(this.props.hideFound);
  }

  render() {

// DISPLAY SEARCH RESULTS
    let foundData = this.props.found.length
      ? this.props.found.map(e => {
        return <Link key={e.id} to={`/itemDetails/${e.id}`}>
          <div  className='found-box'>
            <div className='row'>Name: {e.name}</div>
            <div className='row'>ID:{e.id}</div>
            <div className='row'>Serial: {e.serial}</div>
            <div className='row'>Size: {e.size}</div>
            <div className='row'>Date Created: {parseDate(e.createdDate)}</div>
            <div className='row'>Modified On: {parseDate(e.modifiedDate)}</div>
          </div>
        </Link>
      })
      : null;

//DISPLAY ALL ITEMS
    let data = this.props.allProducts.map((e) => {
      return (
        <Link key={e.id} to={`/itemDetails/${e.id}`}>
          <div  className='data-box'>
            <div>Name: {e.name}</div>
            <div>ID: {e.id}</div>
            <div>Serial: {e.serial}</div>
            <div>Size: {e.size}</div>
            <div>Date Created: {parseDate(e.createdDate)}</div>
            <div>Modified On: {parseDate(e.modifiedDate)}</div>
          </div>
        </Link>
      )
    })
    return (
      <div className="App" >
{/* FOUND RESULTS */}
        <input placeholder='enter size' onChange={(e) => this.props.userInput(e.target.value)} />
        <button onClick={() => this.renderFound(this.props.input)}>{this.props.hideFound ? 'Find' : 'Hide Results'}</button>
        {!this.props.hideFound
          ? <div className='found'>
            <div>{`Search results: ${this.props.found.length}`}</div>
            <div className='found'>{foundData}</div>
          </div>
          : null}

{/* ALL ITEMS */}
        <button type='button' onClick={() => this.showAll()}>
          {this.props.hidden ? 'Show All Items' : 'Hide Items'}
        </button >
        {!this.props.hidden
          ?
          <div className='data'>
            <div>{`Total items: ${this.props.allProducts.length}`}</div>
            <div className='data'>{data}</div>
          </div>
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.allProducts,
    hidden: state.hidden,
    found: state.found,
    hideFound: state.hideFound,
    input: state.input
  }
}

export default connect(mapStateToProps, { getAllProducts, toggleView, toggleFound, searchItem, userInput })(Home);
