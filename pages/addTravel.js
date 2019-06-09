import React from 'react'
import AddTravelForm from '../components/AddTravelForm'
import Map from '../components/Map/MapContainer'
import Clouds from '../static/addTravel/nubes.png'
import City from '../static/addTravel/ciudad.png'

function AddTravel() {
  function handlerMap() {
    console.log('HI')
  }
  return (
    <div style={{ textAlign: "center", position: "relative", height: "100vh", width: "100%", background: " rgba(20, 19, 19, .2)"}}>
      <img className="nubes" src={Clouds} alt="TOBCITY background agregar viaje" />
      <img className="city" src={City} alt="TOBCITY background agregar viaje" />
      <div className="add-travel-form-container">
        <Map handler={handlerMap} />
      </div>
      <style scoped>{`
        .add-travel-form-container {
          width: 400px;
          display: inline-block;
          position: relative;
          top: 50px;
        }
        .city {
          position: absolute;
          width: 100%;
          left: 0px;
          bottom: 0px;
        }
        .nubes {
          position: absolute;
          width: 100%;
          left: 0px;
        }
      `}</style>
    </div>
  )
}

export default AddTravel