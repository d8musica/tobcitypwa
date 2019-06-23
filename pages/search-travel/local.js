import React from 'react'
import { Button } from 'antd'
import SearchTravel from '../../components/search/SearchTravel'

export default function local({user}) {
  if(!user) return (
    <div className="no-register">
      <div>
        <h1>Debes estar registrado para buscar viajes en TOBCITY</h1>
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
    <div>
      <SearchTravel type="local" userId={user._id} />
    </div>
  )
}
