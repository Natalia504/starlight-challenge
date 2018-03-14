import axios from 'axios';


const initialState={
    allProduct: [],
    hidden: true
}

const GET_ALL_PRODUCT = 'GET_ALL_PRODUCT';
const TOGGLE_VIEW = 'TOGGLE_VIEW';

// ACTIONS
export function toggleView(currentHidden){
    return{
        type: TOGGLE_VIEW,
        payload: !currentHidden
    }
}

export function getAllProduct(){
    return {
        type: GET_ALL_PRODUCT,
        payload: axios.get('/api/allProduct')
    }
}

// REDUCERS

export default function reducer( state = initialState, action){

    switch( action.type ) {
        case GET_ALL_PRODUCT + '_FULFILLED' :
        return Object.assign({}, state, {allProduct: action.payload.data})
        
        case TOGGLE_VIEW :
        return Object.assign({}, state, {hidden: action.payload})

        default: 
        return state;
    }
};
