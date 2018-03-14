import axios from 'axios';


const initialState={
    allProduct: []
}

const GET_ALL_PRODUCT = 'GET_ALL_PRODUCT'

export function getAllProduct(){
    return {
        type: GET_ALL_PRODUCT,
        payload: axios.get('https://s3.us-east-2.amazonaws.com/cansdata/cans.json')
    }
}

// REDUCERS

export default function reducer( state = initialState, action){

    switch( action.type ) {
        case GET_ALL_PRODUCT + '_FULFILLED' :
        return Object.assign({}, state, {allProduct: action.payload.data})
        
        default: 
        return state;
    }
};
