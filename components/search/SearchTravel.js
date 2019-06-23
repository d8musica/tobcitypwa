import { SearchOptions } from './SearchOptions'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchTravels } from '../../redux/actions/travelAction'
import { Row, Col, List, Avatar, Icon, Popconfirm, Tooltip, Modal, message, notification } from 'antd'
import MapSolo from '../Map/MapSolo'
import moment from 'moment-timezone'
import Router from 'next/router'
import Nacional from '../../static/home/nacional.png'
import Local from '../../static/home/local.png'
import Convenios from '../../static/home/convenios.png'
import Mascotas from './images/options/mascota.png'
import NoMascotas from './images/options/nomascota.png'
import Equipaje from './images/options/equipaje.png'
import NoEquipaje from './images/options/noequipaje.png'
import Cigarrillo from './images/options/cigarro.png'
import NoCigarro from './images/options/nocigarro.png'
import Comida from './images/options/comida.png'
import NoComida from './images/options/nocomida.png'
import { addPassengerToTravel, closeModal } from '../../redux/actions/travelAction'

function IconText  ({ userId, authorId, type, text, to, travelId, dispatch }) {
  function confirm() {
    dispatch(addPassengerToTravel(travelId))
    message
      .loading('Te estamos conectando con el TOBCONDUCTOR..', 1.5)
      .then(() => message.success(`Te has unido exitosamente al viaje hacia ${to}`, 2.5))
    setTimeout(() => {
      notification.open({
        duration: 0,
        message: 'A disfrutar de tu viaje',
        description:
          'En unos momentos te llegara toda la informacion del TOBCONDUCTOR al e-mail que tienes registrado',
        onClick: () => {
          console.log('Notification Clicked!')
        }
      })
    }, 4000)
    Router.push('/profile')
  }
    
  if(userId === authorId) return <p>{text}</p>
  return (
    <span>
      <Tooltip title="Unirme a este viaje">
        <Popconfirm
          okText="Unirme a este viaje"
          cancelText="Cancelar"
          onConfirm={confirm}
          placement="bottom"
          title={`Estas seguro de unirte al viaje hacia ${to}`}
          icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
        >
          <Icon type={type} style={{ marginRight: 8, fontSize: 30, color: '#ffc83a' }} />
        </Popconfirm>
      </Tooltip>
      {text}
    </span>
  )}

export function TicketComponent ({travels, dispatch, userId}) {
  console.log('userId: ', userId);
  return (
    <>
        <List
          itemLayout="horizontal"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page)
            },
            pageSize: 3
          }}
          dataSource={travels}
          renderItem={item => (
            <List.Item
              key={item._id}
              actions={[
                <>
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
                  <div className="more-actions-container">
                    <IconText userId={userId} authorId={item.author._id} to={item.nameTo} travelId={item._id} dispatch={dispatch} type="user-add" text={`${item.sits} asientos disponibles`} />
                    <p>{item.passenger.map(passenger => {passenger.name})}</p>
                  </div>
                </>
              ]}
              extra={
                <div className="map-container">
                  <MapSolo props={item} />
                </div>
              }
            >
              <List.Item.Meta
                key={item._id}
                avatar={<Avatar src={item.author.google ? item.author.google.avatar : item.author.facebook.avatar } />}
                title={
                  <>
                    <p><span className="title">TOBCONDUCTOR:</span> {item.author.name}</p>
                    <p><span className="title">Desde:</span> {item.nameFrom}</p>
                    <p><span className="title">Hacia:</span> {item.nameTo}</p>
                  </>
                }
                description={<p className="price">${item.price}</p>}
              />
              <div className="info">
                <p className="fecha" ><span className="title">Hora:</span> {moment.utc(item.date).format('hh:mm a')}</p>
                <p className="fecha" ><span className="title">Fecha:</span> {moment.tz(item.date, 'America/Bogota').format('ll')}</p>
                <p className="cupos" ><span className="title">Puestos:</span> {item.sits}/4</p>
                { item.content !== 'undefined' && <p className="descripcion" ><span className="title">Descripcion:</span> {item.content}</p>}
              </div>
            </List.Item>
          )}
        />
        <div className="other-search-container" >
          <SearchOptions  Nacional={Nacional} Local={Local} Convenios={Convenios}  />
        </div>
        <style scoped>{`
        .more-actions-container {
          position: relative;
          margin: 5px;
          top: 10px;
          padding: 7px;
        }
        .title {
          font-weight: 800;
        }
        .price {
          background: #00bfb5;
          color: white;
          font-weight: 800;
          text-align: center;
          border-radius: 8px;
        }
        .ant-list-item-action {
          margin-bottom: 20px;
        }
        .ant-list-item {
          border: none;
          margin-bottom: 20px;
          padding: 28px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 5px;
        }
        .info {
          margin-left: 49px;
        }
          .optionsimg {
            width: 34px;
          }
          .map-container {
            position: relative;
            width: 300px;
            height: 130px;
          }
        `}</style>
    </>
  )
}

function SearchTravel(props) {
  const { travels } = props
  useEffect(() => {
    props.dispatch(fetchTravels())
  }, [])
  const Travels = travels.filter((travel) => travel.traveltype === props.type)
  function handleOk() {
    Router.push('/profile')
    props.dispatch(closeModal())
  }
  function handleCancel() {
    props.dispatch(closeModal())
  }
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>{props.type !== 'convenios' ? props.type + 'es' : props.type }</h1>
      <Row className="travels-list-container">
        <Col span={24}><TicketComponent travels={Travels} dispatch={props.dispatch} userId={props.userId} /></Col>
      </Row>
      <Modal
        onOk={handleOk}
        onCancel={handleCancel}
        title="Opps, parece que nos falta conocerte un poco"
        visible={props.errorMsg !== ''}
      >
        <div style={{ background: '#00bfb5', height: 100, display: 'flex',  alignItems: 'center',  fontWeight: 800 }}>
          <p style={{ color: 'white', textAlign: 'center'}}>Por favor ve a tu perfil y completa algunos datos para que TOBCITY sea mas seguro</p>
        </div>
      </Modal>
      <style scoped>{`
      .travels-list-container {
        margin: 10px;
      }
      `}</style>
    </>
  )
}

function mapStateToProps(state) {
  return {
    travels: state.travelsReducer.travels,
    errorMsg: state.travelsReducer.msg
  }
}

export default connect(mapStateToProps)(SearchTravel)