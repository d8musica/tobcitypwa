import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  number: 0,
  letra: "a" 
}

export const actionTypes = {
  
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  
}

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case actionTypes.INCREMENT:
      return {
        ...state,
        number: state.number + 1
      }
    case actionTypes.DECREMENT:
      return {
        ...state,
        number: state.number - 1
      }
    
    default:
      return state
  }
}

// ACTIONS

export const incrementCount = () => {
  return { type: actionTypes.INCREMENT }
}

export const decrementCount = () => {
  return { type: actionTypes.DECREMENT }
}


export function initializeStore (initialState = initialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  )
}