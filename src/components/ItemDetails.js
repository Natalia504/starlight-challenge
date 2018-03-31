import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchItem } from './reducer';

class ItemDetails extends Component {

    parseDate(date) {
        const newDate = new Date(date);
        const day = newDate.getDate();
        let month = newDate.getMonth();
        const arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        month = arr[month]
        const year = newDate.getFullYear();
        return `${month} ${day}, ${year}`
    }

    render() {
        console.log('this.props.found', this.props.found)
        const itemDetail = this.props.found.data.map((e, i) => <div key={e.id} className='found-box'>
            <div className='row'>Hello: {e.name}</div>
            <div className='row'>ID:{e.id}</div>
            <div className='row'>Serial: {e.serial}</div>
            <div className='row'>Size: {e.size}</div>
            <div className='row'>Date Created: {this.parseDate(e.createdDate)}</div>
            <div className='row'>Modified On: {this.parseDate(e.modifiedDate)}</div>
        </div>)
        return (
            <div>
                {itemDetail}
                <Link to='/'><button>Back</button></Link>
            </div>
        )
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

export default connect(mapStateToProps, { searchItem })(ItemDetails);
