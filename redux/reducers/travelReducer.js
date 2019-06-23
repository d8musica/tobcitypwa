import { SAVE_HALF_TRAVEL, ADD_TRAVEL, ADD_TRAVELS, CONFIRMATION_ERROR, ADD_UPDATED_TRAVEL } from '../actions'

const initialState = {
  info: {},
  travels: [],
  msg: ''
}

const travelReducer =(state = initialState, action) => {
  switch(action.type) {
  case SAVE_HALF_TRAVEL:
    return {
      ...state,
      info: action.places
    }
  case ADD_TRAVEL:
    // eslint-disable-next-line
    const { travel } =action
    return {
      ...state,
      travels: [
        ...state.travels,
        travel
      ]}
  case ADD_TRAVELS:
    // eslint-disable-next-line
    const { travels } = action
    return {
      ...state,
      travels
    }
  case CONFIRMATION_ERROR:
    return {
      ...state,
      msg: action.msg
    }
  case ADD_UPDATED_TRAVEL:
    // eslint-disable-next-line
    const newTravels = state.travels.map((travel) => {  
      if(travel._id === action.travel._id) {
        return action.travel
      }
      return travel
    })
    return {...state, travels: newTravels}
  default:
    return state
  }
}

export default travelReducer