import { useState } from 'react'
import { connect } from "react-redux"
import { List, message, Avatar, Spin, Button } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import moment from 'moment-timezone'
import Mascotas from './search/images/options/mascota.png'
import NoMascotas from './search/images/options/nomascota.png'
import Equipaje from './search/images/options/equipaje.png'
import NoEquipaje from './search/images/options/noequipaje.png'
import Cigarrillo from './search/images/options/cigarro.png'
import NoCigarro from './search/images/options/nocigarro.png'
import Comida from './search/images/options/comida.png'
import NoComida from './search/images/options/nocomida.png'
moment.locale('es')

function handleInfiniteOnLoad() {  
  setLoading(!loading)
  if (travels.length > 14) {
    message.warning('Infinite List loaded all')
    setLoading(!loading)
    setHasMore(!hasMore)
    return;
  }
  this.fetchData(res => {
    data = data.concat(res.results);
    this.setState({
      data,
      loading: false
    })
  })
}

function ContentComponent (props) {
  // console.log('props: ', props);
  const [loading, setLoading] = useState(false)
  const [hasMore, sethasMore] = useState(false)
  const { _id, avatarData } =  props.user

  const { travels } = props
  const userId = _id
  const typeSelected = props.type
  let filterTravels
  if(typeSelected === 'tobpasajero') {
    filterTravels = travels.filter((travel => travel.passenger.length > 0 && travel.passenger.filter(passenger => passenger._id === userId)))
  }
  if(typeSelected === 'tobconductor') {
    filterTravels = travels.filter((travel => travel.author._id === userId))
  }
  return (
    <div className="demo-infinite-container">
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
      >
        <List
          dataSource={filterTravels}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title={
                  <>
                    <p><span className="title">Desde:</span> {item.nameFrom}</p>
                    <p><span className="title">Hacia:</span> {item.nameTo}</p>
                  </>
                }
                description={item.email}
              />
              <div>
                <div className="info">
                  <p className="fecha" ><span className="title">Hora:</span> {moment.utc(item.date).format('hh:mm a')}</p>
                  <p className="fecha" ><span className="title">Fecha:</span> {moment.tz(item.date, 'America/Bogota').format('ll')}</p>
                  <p className="cupos" ><span className="title">Puestos:</span> {item.sits}/4</p>
                  { item.content !== 'undefined' && <p className="descripcion" ><span className="title">Descripcion:</span> {item.content}</p>}
                </div>{ item.description && <p className="descripcion" ><span className="title">Descripcion:</span> {item.description}</p>}
                <div className="options-container">
                  <p className="title">PREFERENCIAS</p>
                  {
                    item.pets ?
                      <img className="optionsimg" alt="Opciones de viaje" src={Mascotas} />
                      :
                      <img className="optionsimg" alt="Opciones de viaje" src={NoMascotas} />
                  }
                  {
                    item.lugagge ?
                      <img className="optionsimg" alt="Opciones de viaje" src={Equipaje} />
                      :
                      <img className="optionsimg" alt="Opciones de viaje" src={NoEquipaje} />
                  }
                  {
                    item.smoke ?
                      <img className="optionsimg" alt="Opciones de viaje" src={Cigarrillo} />
                      :
                      <img className="optionsimg"  alt="Opciones de viaje" src={NoCigarro} />
                  }
                  {
                    item.food ?
                      <img className="optionsimg" alt="Opciones de viaje" src={Comida} />
                      :
                      <img className="optionsimg" alt="Opciones de viaje" src={NoComida} />
                  }
                </div>
              </div>
            </List.Item>
          )}
        >
          {loading && hasMore && (
            <div className="demo-loading-container">
              <Spin />
            </div>
          )}
        </List>
      </InfiniteScroll>
      <style scoped>{`
        .optionsimg {
          width: 34px;
        }
        .title {
          font-weight: 800;
        }
        .demo-infinite-container {
          border: 1px solid #e8e8e8;
          border-radius: 4px;
          overflow: auto;
          padding: 8px 24px;
          height: 300px;
        }
        .demo-loading-container {
          position: absolute;
          bottom: 40px;
          width: 100%;
          text-align: center;
        }
        }
      `}</style>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    travels: state.travelsReducer.travels,
  }
}

export default connect(mapStateToProps)(ContentComponent)