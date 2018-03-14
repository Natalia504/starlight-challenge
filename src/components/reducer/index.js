import axios from 'axios';


const initialState={
    allProduct: []
}

const GET_ALL_PRODUCT = 'GET_ALL_PRODUCT'

export function getAllProduct(){
    console.log('HI')
    return {
        type: GET_ALL_PRODUCT,
        payload: axios.get('/api/allProduct')
    }
}

// REDUCERS

export default function reducer( state = initialState, action){

    switch( action.type ) {
        case GET_ALL_PRODUCT + '_FULFILLED' :
        console.log(action.payload)

        return Object.assign({}, state, {allProduct: action.payload.data})
        
        default: 
        return state;
    }
};
