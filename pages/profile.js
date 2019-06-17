import React, { Component, useState, useEffect } from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Descriptions, Row, Card, Avatar } from 'antd';
import Link from 'next/link'
import ProfileBG from '../static/profile/profilebg.png'
import AvatarCircle from '../static/profile/profileCircle.png'
import MyTravels from '../static/profile/mis-viajes.png'
import { fetchTravels } from '../redux/actions/travelAction'
import HistoryComponent from '../components/HistoryComponent'
import AuthHOC from './AuthHOC'

const tabList = [
  {
    key: 'tobpasajero',
    tab: 'TOBPASAJERO',
  },
  {
    key: 'tobconductor',
    tab: 'TOBCONDUCTOR',
  },
]


function Profile(props) {
  const user = { email: "jandreus87@hotmail.com", name: 'FULOANO', avatarData: { url: 'data:image/png;base64,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'}}
  const { name, avatarData, email, cellphone } = user

  const [historyType, setHistoryType] = useState({ key: 'tobpasajero'})
  useEffect(() => {
    props.dispatch(fetchTravels())
  }, [])
  function onTabChange (key, type) {
    setHistoryType({ [type]: key });
  }
  return (
    <Row className="profile-main-container">
      <img className="background-profile" src={ProfileBG} alt="TOBCITY background home" />
      <div className="avatar-profile">
        <div className="imgs-container">
          <img alt="your picture" src={avatarData.url} className="avatar-pic"/>
          <img alt="avatar circle" src={AvatarCircle} className="avatar-circle" />
        </div>
      </div>
      <Descriptions title="Informacion de tu cuenta" size="small">
        <Descriptions.Item label="Tu Nombre">{name}</Descriptions.Item>
        <Descriptions.Item label="E-mail">{email}</Descriptions.Item>
        { !cellphone && <Descriptions.Item label="Numero celular">{cellphone || "aun no registras tu numero"}</Descriptions.Item>}
      </Descriptions>
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
      </div>
      <style scoped>{`
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
console.log('AuthHOC: ', AuthHOC(Profile));

export default connect()(Profile)