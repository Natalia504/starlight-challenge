import axios from 'axios';


const initialState = {
    allProduct: [],
    hidden: true,
    currentItem: {},
    found: [],
    input: ''
}

const GET_ALL_PRODUCT = 'GET_ALL_PRODUCT';
const TOGGLE_VIEW = 'TOGGLE_VIEW';
const SEARCH_ITEM = 'SEARCH_ITEM';
const USER_INPUT = 'USER_INPUT';

// ACTIONS
export function userInput(val) {
    console.log(val, "userInput action")
    return {
        type: USER_INPUT,
        payload: val
    }
}

export function searchItem(input) {
    console.log("Search ACTION fires, passing input", input)
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

export function getAllProduct() {
    return {
        type: GET_ALL_PRODUCT,
        payload: axios.get('/api/allProduct')
    }
}

// REDUCERS

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case GET_ALL_PRODUCT + '_FULFILLED':
            return Object.assign({}, state, { allProduct: action.payload.data })

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
