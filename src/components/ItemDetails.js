import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { itemDetails } from './reducer';

class ItemDetails extends Component {

    componentWillMount() {
        console.log("hi")
        this.props.itemDetails(this.props.match.params.id);
    }

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
        console.log('this.props.item', this.props.item)
    
        const oneItem = this.props.item.data.map((e, i) => {
            return <div key={e.id}>
                <div className='row'>Hello: {e.name}</div>
                <div className='row'>ID:{e.id}</div>
                <div className='row'>Serial: {e.serial}</div>
                <div className='row'>Size: {e.size}</div>
                <div className='row'>Date Created: {this.parseDate(e.createdDate)}</div>
                <div className='row'>Modified On: {this.parseDate(e.modifiedDate)}</div>
            </div>
        })
        return (
            <div>
                {oneItem}
                <Link to='/'><button>Back</button></Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        item: state.item
    }
}

export default connect(mapStateToProps, { itemDetails })(ItemDetails);
