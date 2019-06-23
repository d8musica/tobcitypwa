import { useState } from 'react'
import { Button } from 'antd'
import Map from '../components/Map/MapContainer'
import SecondPartForm from '../components//Map/SecondPartForm'
import Clouds from '../static/addTravel/nubes.png'
import City from '../static/addTravel/ciudad.png'

function AddTravel({ user }) {
  const [showMap, setShowMap] = useState(true)
  function handleShowMap() {
    setShowMap(!showMap)
  }
  if(!user) return (
    <div className="no-register">
      <div>
        <h1>Debes estar registrado para agregar viajes en TOBCITY</h1>
        <Button type='primary' href='/' >Regresa al INICIO</Button>
      </div>
      <style scoped>{`
         .no-register {
          text-align: center;
          background: #00bfb5;
          height: 100vh;
          display: flex;
          align-items: center;

        }
        .no-register h1 {
          font-size: 40px;
          color: white;
        }
      `}</style>
    </div>
  )
  return (
    <div style={{ textAlign: "center", position: "relative", height: "100vh", width: "100%", overflowY: "auto"}}>
      <img className="nubes" src={Clouds} alt="TOBCITY background agregar viaje" />
      <img className="city" src={City} alt="TOBCITY background agregar viaje" />
      {
        showMap ? <Map handler={handleShowMap} /> : <SecondPartForm  handler={handleShowMap} user={user}/>
      }
      <style scoped>{`
        .add-travel-form-container {
          width: 400px;
          display: inline-block;
          position: relative;
          top: 150px;
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