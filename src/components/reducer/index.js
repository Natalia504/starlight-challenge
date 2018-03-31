import axios from 'axios';


const initialState = {
    allProducts: [],
    hidden: true,
    found: [],
    input: ''
}

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const TOGGLE_VIEW = 'TOGGLE_VIEW';
const SEARCH_ITEM = 'SEARCH_ITEM';
const USER_INPUT = 'USER_INPUT';
const ITEM_DETAILS = 'ITEM_DETAILS';

// ACTIONS

export function itemDetails(id){
    return {
        type: ITEM_DETAILS,
        payload: axios.get(`/api/item/${id}`)
    }
}

export function userInput(val) {
    return {
        type: USER_INPUT,
        payload: val
    }
}

export function searchItem(input) {
    return {
        type: SEARCH_ITEM,
        payload: axios.get(`/api/found/${input}`)
    }
}


export function toggleView(currentHidden) {
    return {
        type: TOGGLE_VIEW,
        payload: !currentHidden
    }
}

export function getAllProducts() {
    return {
        type: GET_ALL_PRODUCTS,
        payload: axios.get('/api/allProducts')
    }
}

// REDUCERS

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case GET_ALL_PRODUCTS + '_FULFILLED':
            return Object.assign({}, state, { allProducts: action.payload.data })

        case TOGGLE_VIEW:
            return Object.assign({}, state, { hidden: action.payload })

        case SEARCH_ITEM + '_FULFILLED':
            return Object.assign({}, state, { found: action.payload })

        case USER_INPUT:
            return Object.assign({}, state, { input: action.payload })

        default:
            return state;
    }
};
