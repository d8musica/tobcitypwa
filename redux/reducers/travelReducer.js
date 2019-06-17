import { SAVE_HALF_TRAVEL, ADD_TRAVEL, ADD_TRAVELS, ADD_USERS_WITH_TRAVELS } from '../actions'

const initialState = {
  info: {},
  travels: [],
  users: []
}

const travelReducer =(state = initialState, action) => {
  switch(action.type) {
  case SAVE_HALF_TRAVEL:
    return {
      ...state,
      info: action.places
    }
  case ADD_TRAVEL:
    const { travel } =action
    return {
      ...state,
      travels: [
        ...state.travels,
        travel
      ]}
  case ADD_TRAVELS:
    const { travels } = action
    return {
      ...state,
      travels
    }
  case ADD_USERS_WITH_TRAVELS:
    const { users } = action
    return {
      ...state,
      users
    }
  default:
    return state
  }
}

export default travelReducer