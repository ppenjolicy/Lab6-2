import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware } from 'redux'
import Bear from './Bear'
import logger from 'redux-logger'
import axios from 'axios'
import thunk from 'redux-thunk'

// ========  action (As Dispatcher) ==========
export const add = () => ({type: 'ADD'})
export const add2 = (number) => ({type: 'ADD2', number})
export const minus = () => ({ type: 'MINUS'})

export const getBearsSuccess = bears => ({
   type: 'GET_BEARS_SUCCESS',
   bears
});
export const getBearsFailed = () => ({ type: 'GET_BEARS_FAILED'});

export const getBears = (name) => async (dispatch) => {
   try {
       console.log('get bear new')
       const response = await axios.get(`https://api.github.com/users/${name}`)
       const responseBody = await response.data;
       console.log('response: ', responseBody)
       dispatch(getBearsSuccess(responseBody));
   } catch (error) {
       console.error(error);
       dispatch(getBearsFailed());
   }
}


// ========  reducer (As Controller) =========
export const numberReducer =  (state = 0, action) => {
   switch (action.type) {
       case 'ADD':
           console.log('my add...')
           return state + 1
       case 'MINUS':
           return state - 1
       case 'ADD2':
           return state + action.number
       default:
           return state
   }
}

export const bearReducer = (state = 0, action) => {
   switch (action.type) {
       case 'GET_BEARS_SUCCESS':
               console.log('action: ' , action.bears)
           return action.bears
       case 'GET_BEARS_FAILED':
               console.log('action: Failed')
           return action.bears
       default:
           return state
   }
}


export const rootReducer = combineReducers({number: numberReducer, bears: bearReducer})
export const store = createStore(rootReducer, applyMiddleware(logger,thunk))


// ======== wrap root element by Provider with Store ========
class App extends Component {
   render() {
       return <Provider store={store}><Bear/></Provider>
   }
}

export default App
