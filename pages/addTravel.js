import { useState } from 'react'
import Map from '../components/Map/MapContainer'
import SecondPartForm from '../components//Map/SecondPartForm'
import Clouds from '../static/addTravel/nubes.png'
import City from '../static/addTravel/ciudad.png'
function AddTravel() {
  const [showMap, setShowMap] = useState(true)
  function handlerMap() {
    setShowMap(!showMap)
  }
  return (
    <div style={{ textAlign: "center", position: "relative", height: "100vh", width: "100%", overflowY: "auto"}}>
      <img className="nubes" src={Clouds} alt="TOBCITY background agregar viaje" />
      <img className="city" src={City} alt="TOBCITY background agregar viaje" />
      {
        !showMap ? <Map handler={handlerMap} /> : <SecondPartForm />
      }
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