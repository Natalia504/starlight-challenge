import axios from 'axios';
// var data = require('./../../../src/cans.json');


const initialState={
    allProduct: []
}

const GET_ALL_PRODUCT = 'GET_ALL_PRODUCT'

export function getAllProduct(){
    return {
        type: GET_ALL_PRODUCT,
        payload: axios.get('./../../cans.json')
    }
}

// REDUCERS...

export default function reducer( state = initialState, action){
    console.log('reducer is running')
    console.log(state);
    switch( action.type ) {
        case GET_ALL_PRODUCT + '_FULFILLED':
        return Object.assign({}, state, {allProduct:[...state.allProduct, action.payload.data]})

        default: 
        return state;
    }
};
