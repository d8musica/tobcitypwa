import axios from 'axios'
import getConfig from 'next/config'
const server = process.env.SERVER
export function addPlacesRequest(places) {
  return dispatch =>  dispatch({ type: 'SAVE_HALF_TRAVEL', places})
}

export function addTravelRequest(travelData, userId) {
  return (dispatch, getState) => {
    const travelData1 = getState().travelsReducer.info
    return axios.post(server + "/api/travels", {
      travel: {
        plate: travelData.plate,
        price: travelData.price,
        content: travelData.content,
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
        food: travelData1.food,
      },
      userId
    })
      .then((res) => dispatch({
        type: 'ADD_TRAVEL',
        travel: res.data.travel,
      }))
  }
}

export function fetchTravels() {
  return (dispatch) => {
    return axios(server + "/api/travels").then(res => {
      dispatch({
        type: 'ADD_TRAVELS',
        travels: res.data.travels,
      });
    });
  };
}
export function fetchUsersWithTravels() {
  return (dispatch) => {
    return axios(server + "/api/users").then(res => {
      dispatch({
        type: 'ADD_USERS_WITH_TRAVELS',
        travels: res.data.users,
      });
    });
  };
}