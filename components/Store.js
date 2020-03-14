import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

//ACTION ITEM
const GET_HEALTHY_ITEM = 'GET_HEALTHY_ITEM'

//ACTION CREATOR
const getHealthyItem = (healthy) => {
    return {
        type: GET_HEALTHY_ITEM,
        healthy
    }
}

//THUNK

//INITIAL STATE
const initialState = {
    healthy: [],
    unhealthy: [],
    nutritionalInfo: {}
}

//REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HEALTHY_ITEM:
            return {...state, healthy: action.healthy}
        default:
            return state
    }
}

//STORE
export const store = createStore(reducer, applyMiddleware(thunkMiddleware))