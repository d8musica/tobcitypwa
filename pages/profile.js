import React, { Component, useState, useEffect } from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { Badge, Icon, Progress, Button , Modal, Descriptions, Row, Card, Rate } from 'antd'
import { SearchOptions } from '../components/search/SearchOptions'
import Link from 'next/link'
import moment from 'moment'
import Nacional from '../static/home/nacional.png'
import Local from '../static/home/local.png'
import Convenios from '../static/home/convenios.png'
import ProfileBG from '../static/profile/profilebg.png'
import AvatarCircle from '../static/profile/profileCircle.png'
import MyTravels from '../static/profile/mis-viajes.png'
import { fetchTravels } from '../redux/actions/travelAction'
import HistoryComponent from '../components/HistoryComponent'
import Login from '../components/Login'
import EditForm from '../components/EditForm'

const tabList = [
  {
    key: 'tobpasajero',
    tab: 'TOBPASAJERO'
  },
  {
    key: 'tobconductor',
    tab: 'TOBCONDUCTOR'
  }
]


function Profile(props) {
  // console.log('props: ', props);
  const [historyType, setHistoryType] = useState({ key: 'tobpasajero'})
  const [showEdit, setShowEdit] = useState(false)
  useEffect(() => {
    props.dispatch(fetchTravels())
  }, [])
  function onCompleteInfo() {
    setShowEdit(!showEdit)
  } 
  function onTabChange(key, type) {
    setHistoryType({ [type]: key })
  }
  if(!props.user) return <Login />
  const user = props.user
  const { name, email, cellphone, rateCount, rateValue, confirmed, city } = user
  const avatarGoogle =  (user.google && user.google.avatar)
  const avatarFace =  (user.facebook && user.facebook.avatar)
  const score = rateValue / rateCount
  return (
    <Row className="profile-main-container">
      <img className="background-profile" src={ProfileBG} alt="TOBCITY background home" />
      <div className="avatar-profile">
        <div className="imgs-container">
          <img alt="your picture" src={avatarFace || avatarGoogle} className="avatar-pic"/>
          <img alt="avatar circle" src={AvatarCircle} className="avatar-circle" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
          <Progress  strokeColor='#ffc83a'  type="circle" percent={rateCount} format={percent => `${percent} viajes`} />
          <Badge  count={ !confirmed ? <Icon type="exclamation-circle" style={{ color: '#f5222d' }} /> : <Icon type="check-circle" style={{ color: '#52c41a' }}/>}>
            {!confirmed ? <><p className="missing-info">Completa tus datos <br/><Button type="primary" onClick={onCompleteInfo} style={{ marginTop: 10 }}>AQUI!</Button></p> </>: <p className="missing-info">Tus datos estan completos</p>}
          </Badge>
        </div>
      </div>
      <Descriptions title="Informacion de tu cuenta" size="small">
        <Descriptions.Item label="Tu Calificacion"><Rate allowHalf disabled defaultValue={score} /></Descriptions.Item>
        <Descriptions.Item label="Tu Nombre">{name}</Descriptions.Item>
        <Descriptions.Item label="E-mail">{email}</Descriptions.Item>
        <Descriptions.Item label="Numero celular">{cellphone !== undefined ? cellphone : "aun   no registras tu numero"}</Descriptions.Item>
        <Descriptions.Item label="Ciudad">{city !== undefined ? city : "aun no sabemos desde donde utilizas TOBCITY"}</Descriptions.Item>
      </Descriptions>
      <SearchOptions   Nacional={Nacional} Local={Local} Convenios={Convenios}  />
      <div>
        <div className="history-container">
          <Card
            title={<img src={MyTravels} style={{ width: '37%' }} alt='my travels' />}
            tabList={tabList}
            activeTabKey={historyType.key}
            onTabChange={key => {
              onTabChange(key, 'key');
            }}
          >
            <HistoryComponent type={historyType.key} user={user} />
          </Card>
        </div>
        <Modal
          footer={null }
          title="Edita tus datos"
          visible={showEdit}
          onOk={onCompleteInfo}
          onCancel={onCompleteInfo}
        >
          <EditForm user={props.user} />
        </Modal>
      </div>
      <style scoped>{`
        .missing-info {
          border-radius: 100%;
          padding: 23px;s
          height: 123px;
          border: solid 7px #00bfb5;
          width: 134px;
          font-weight: 800;
        }
        .ant-progress-circle-trail {
          stroke: #aaa9a5 !important;
        }
        .imgs-container {
          width: 100%;
          display: inline-block;
          width: 50%;
          position: relative;
        }
        .ant-card-head-wrapper {
          text-align: center;
          background: #00bfb5;
        }
        .avatar-circle{
          width: 80%;
        }
        .avatar-pic {
         border-radius: 50%;
          top: 10%;
          left: 22%;
          position: absolute;
          width: 59%;
        }
        .avatar-profile {
         position: relative;
         text-align: center;
        }
        .background-profile {
          width: 100%;
          height: 100vh;
          position: absolute;
          z-index: 0;
        }
        .ant-descriptions-view {
          border: solid 1px #FFC83A;
          border-radius: 10px;
          padding: 20px;
          position: relative;
        }
        
        .ant-descriptions-item-label {
          color: gray;
          font-size: 15px;
          height: 100%;
          width: 95%;
          border-radius: 5px;
          background: white;
          margin: 5px;
        }
        .ant-descriptions .ant-descriptions-item-label, .ant-descriptions .ant-descriptions-item-content {
          padding-left: 15px !important;
        }
        .ant-descriptions-item-content {
          font-size: 12px;
          color: gray;
          height: 100%;
          width: 95%;
          border-radius: 5px;
          background: white;
          margin: 5px;
        }
        `}</style>
    </Row>
  )
} 

export default connect()(Profile)