import { useState } from 'react'
import Login from '../components/Login'
import Link from 'next/link'
import { NextAuth } from 'next-auth/client'
import { Card, Button, Avatar, Row, Col, Modal } from 'antd'
import ProfileCover from '../static/home/profileCover.png'
import SearchCover from '../static/home/searchCover.png'
import SearchAvatar from '../static/home/searchAvatar.png'
import AddAvatar from '../static/home/addAvatar.png'
import AddTravelCover from '../static/home/addTravelCover.png'
import HomeBG from '../static/home/homebg.png'
import AddTravel from '../static/home/addTravel.png'
import SuggestTravel from '../static/home/suggestTravel.png'

const { Meta } = Card

function ModalComponent ({title, visible, handleOk, handleVisible, children}) {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleVisible}
      footer={null}
    >{children}</Modal>
  )
}

function Profile ({ name, avatar }) {
  return (
    <Card
      hoverable
      bordered={false}
      style={{ width: 250, background: 'rgba(255, 255, 255, .6)', borderRadius: 7, margin: 10 }}
      cover={
        <img
          alt="example"
          src={ProfileCover}
        />
      }
      actions={[<Link href="/auth"><Button type="primary">VE A TU PERFIL</Button></Link>]}
    >
      <Meta
        avatar={<Avatar size="large" src={avatar} />}
        title={`Hola ${name}`}
        description="Dale click y administra tu informacion en TOBCITY"
      />
    </Card>
  )
}

function BuscarViaje (props) {
  return (
    <Card
      hoverable
      bordered={false}
      style={{ width: 250, background: 'rgba(255, 255, 255, .6)', borderRadius: 7, margin: 10 }}
      cover={
        <img
          alt="example"
          src={SearchCover}
        />
      }
      actions={[<Button type="primary" onClick={() => props.handleSearchModal()}>ENCUENTRA TU VIAJE</Button>]}
    >
      <Meta
        avatar={<Avatar size="large" src={SearchAvatar} />}
        title="Buscar Viajes"
        description="Aqui encuentras viajes locales, nacionales y convenios"
      />
    </Card>
  )
}

function AgregarViaje (props) {
  return (
    <Card
      hoverable
      bordered={false}
      style={{ width: 250, background: 'rgba(255, 255, 255, .6)', borderRadius: 7, margin: 10 }}
      cover={
        <img
          alt="example"
          src={AddTravelCover}
        />
      }
      actions={[<Button onClick={() => props.handleAddTravelModal()} type="primary">COMPARTE TU VIAJE</Button>]}
    >
      <Meta
        avatar={<Avatar src={AddAvatar} />}
        title="Agregar Viaje"
        description="Programa, encuentra y sugiere destinos para compartir"
      />
    </Card>
  )
}

function Home (props) {
  const [addTravelModal, setAddTravelModal] = useState(false)
  const [searchTravelModal, setSearchTravelModal] = useState(false)
  const { name, avatarData } = props.session.user || ''
  function handleOk() {
    console.log('hi!')
  }
  function handleAddTravelModal() {
    setAddTravelModal(!addTravelModal)
  }
  function handleSearchModal() {
    setSearchTravelModal(!searchTravelModal)
  }
  if (props.session.user) {
    return (
      <Row  gutter={{xs: 8, sm: 16, md: 48}} className='main-container'>
        <img className="background-home" src={HomeBG} alt="TOBCITY background home" />
        <div className="options-container-home">
          <Col xs={24} sm={12} lg={8} ><Profile name={name} avatar={avatarData.url} /></Col>
          <Col xs={24} sm={12} lg={8} ><BuscarViaje handleSearchModal={handleSearchModal} /></Col>
          <Col xs={24} sm={12} lg={8} ><AgregarViaje handleAddTravelModal={handleAddTravelModal} /></Col>
        </div>
        <ModalComponent 
          title="Agrega tu viaje o sugiere el que tienes en mente:" 
          visible={addTravelModal} 
          handleOk={handleOk} 
          handleVisible={handleAddTravelModal}
        >
          <Row gutter={16} className='main-container'>
            <Col span={12} >
              <Link href="/addTravel">
                <Card
                  style={{ background: "rgb(42,168,154)" }}
                  hoverable
                  bordered={false}
                  cover={
                    <img alt="Buscar Viaje en TOBCITY" src={AddTravel} />
                  }
                >
                  <Meta
                    title={
                      <div style={{ textAlign: "center" }}>
                        <h3 style={{ color: "white" }}>Agrega tu viaje</h3>
                      </div>
                    }
                  />
                </Card>
              </Link>
            </Col>
            <Col span={12} >
              <Link href="/suggestTravel">
                <Card
                  style={{ background: "rgb(255, 200, 58)" }}
                  hoverable
                  bordered={false}
                  cover={
                    <img alt="Sugerir Viaje en TOBCITY" src={SuggestTravel} />
                  }
                >
                  <Meta
                    title={
                      <div style={{ textAlign: "center"}}>
                        <h3 style={{ color: "white" }}>Sugiere tu viaje</h3>
                      </div>
                    }
                  />
                </Card>
              </Link>
            </Col>
          </Row>
        </ModalComponent>
        <ModalComponent
          title="Que tipo de viaje buscas:"
          visible={searchTravelModal}
          handleOk={handleOk}
          handleVisible={handleSearchModal}
        >
            Nacional o extranjero?     
        </ModalComponent>
        <style scoped>{`
            .ant-modal-close-icon {
              top: 5px;
              position: absolute;
              right: 5px;
            }
            .ant-modal-close-x {
              width: 25px;
              height: 25px;
              right: 10px;
              top: -5px;
            }
            .ant-modal-close {
              right: 10px;
              top: 5px;
              color: white;
              background: rgb(42,168,154);
              border-radius: 50%;
            }
            .ant-btn-primary {
              background: rgb(42,168,154);
              border: none;
              color: white;
            }
            .options-container-home {
              top: 10px;
              position: relative
            }
            .background-home {
              position: absolute;
            }
            .ant-btn-primary:focus,
            .ant-btn-primary:active,
            .ant-btn-primary:hover {
              background-color: rgba(255, 200, 58, 1);
              color: rgb(42,168,154);
            }
            @media (min-width: 992px) {
              .options-container-home {
                top: 150px;
              }
              .background-home {
                width: 100%;
                height: 100vh;
                position: absolute;
              }
            }
          
          
        `}</style>
      </Row>
    )
  } else {
    return (
      <Login />
    )
  }
}

Home.getInitialProps = async ({ req }) => {
  return {
    session: await NextAuth.init({ req })
  }
}
export default Home