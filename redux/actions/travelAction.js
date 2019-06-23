import axios from 'axios'

const server = process.env.SERVER
export function addPlacesRequest(places) {
  return dispatch =>  dispatch({ type: 'SAVE_HALF_TRAVEL', places})
}

export function addTravelRequest(travelData, userId) {
  console.log('userId: ', userId);
  return (dispatch, getState) => {
    const travelData1 = getState().travelsReducer.info
    return axios.post(server + "/api/travels", {
      travel: {
        plate: travelData.plate,
        price: travelData.price,
        content: travelData.comments,
        traveltype: travelData.traveltype,
        sits: travelData.sits,
        date: travelData.date,
        latFrom: travelData1.latFrom,
        lngFrom: travelData1.lngFrom,
        latTo: travelData1.latTo,
        lngTo: travelData1.lngTo,
        nameFrom: travelData1.nameFrom,
        nameTo: travelData1.nameTo,
        from: travelData1.from,
        to: travelData1.to,
        polyline: travelData1.polyline,
        pets: travelData1.pets,
        lugagge: travelData1.lugagge,
        smoke: travelData1.smoke,
        food: travelData1.food
      },
      userId
    })
      .then((res) => dispatch({
        type: 'ADD_TRAVEL',
        travel: res.data.travel
      }))
  }
}

export function fetchTravels() {
  return (dispatch) => {
    return axios(server + "/api/travels").then(res => {
      dispatch({
        type: 'ADD_TRAVELS',
        travels: res.data.travels
      })
    })
  }
}

export function addPassengerToTravel(travelId) {
  return (dispatch) => {
    return axios.post(server + "/api/add_passenger_to_travel", {travelId}).then(res => {
      if(res.data.noCellError) {
        dispatch({
          type: 'CONFIRMATION_ERROR',
          msg: res.data.noCellError
        })
      }
      if(res.data.travel) {
        dispatch({
          type: 'ADD_UPDATED_TRAVEL',
          travel: res.data.travel
        })
      }
    })
  }
}
export function firstVisitCheck() {
  return () => {
    return axios.post(server + "/api/check_user_visit")
  }
}

export function closeModal() {
  return dispatch => {
    dispatch({
      type: 'CONFIRMATION_ERROR',
      msg: ''
    })
  }
}