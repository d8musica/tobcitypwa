export function addPlacesRequest(places, preferences) {
  return dispatch =>  dispatch({ type: 'SAVE_HALF_TRAVEL', places, preferences })
}