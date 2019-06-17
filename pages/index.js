import { useState, useEffect } from 'react'
import Login from '../components/Login'
import { connect } from 'react-redux'
import Link from 'next/link'
import { Card, Button, Avatar, Row, Col, Modal } from 'antd'
import ProfileCover from '../static/home/profileCover.png'
import SearchCover from '../static/home/searchCover.png'
import SearchAvatar from '../static/home/searchAvatar.png'
import AddAvatar from '../static/home/addAvatar.png'
import AddTravelCover from '../static/home/addTravelCover.png'
import HomeBG from '../static/home/homebg.png'
import AddTravel from '../static/home/addTravel.png'
import SuggestTravel from '../static/home/suggestTravel.png'
import Nacional from '../static/home/nacional.png'
import Local from '../static/home/local.png'
import Convenios from '../static/home/convenios.png'
import { fetchTravels, fetchUsersWithTravels } from '../redux/actions/travelAction'

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
      actions={[<Link href="/profile"><Button type="primary">VE A TU PERFIL</Button></Link>]}
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
        description="Programa, encuentra y sugiere destinos para compartir en Tobcity"
      />
    </Card>
  )
}

function Home (props) {
  // console.log('props: ', props);
  const [addTravelModal, setAddTravelModal] = useState(false)
  const [searchTravelModal, setSearchTravelModal] = useState(false)
  const { displayName, picture } = props.user || ''
  useEffect(() => {
    props.dispatch(fetchTravels())
    props.dispatch(fetchUsersWithTravels())
  }, [])
  function handleOk() {
    console.log('hi!')
  }
  function handleAddTravelModal() {
    setAddTravelModal(!addTravelModal)
  }
  function handleSearchModal() {
    setSearchTravelModal(!searchTravelModal)
  }
  if (props.user) {
    return (
      <Row  gutter={{xs: 8, sm: 16, md: 48}} className='main-container'>
        <img className="background-home" src={HomeBG} alt="TOBCITY background home" />
        <div className="options-container-home">
          <Col xs={24} sm={12} lg={8} ><Profile name={displayName} avatar={picture} /></Col>
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
          <Row gutter={16} className='main-container'>
            <Col span={8} >
              <Link href="search-travel/nacional">
                <Card
                  style={{ background: "rgb(42,168,154)" }}
                  hoverable
                  bordered={false}
                  cover={
                    <img alt="Buscar Viaje nacionales en TOBCITY" src={Nacional} />
                  }
                >
                  <Meta
                    title={
                      <div style={{ textAlign: "center" }}>
                        <h3 style={{ color: "white" }}>Nacionales</h3>
                      </div>
                    }
                  />
                </Card>
              </Link>
            </Col>
            <Col span={8} >
              <Link href="search-travel/local">
                <Card
                  style={{ background: "rgb(189, 187, 185)" }}
                  hoverable
                  bordered={false}
                  cover={
                    <img alt=" Viajes locales en TOBCITY" src={Local} />
                  }
                >
                  <Meta
                    title={
                      <div style={{ textAlign: "center"}}>
                        <h3 style={{ color: "white" }}>Locales</h3>
                      </div>
                    }
                  />
                </Card>
              </Link>
            </Col>
            <Col span={8} >
              <Link href="search-travel/convenios">
                <Card
                  style={{ background: "rgb(255, 200, 58)" }}
                  hoverable
                  bordered={false}
                  cover={
                    <img alt="Viajes en convenio con TOBCITY" src={Convenios} />
                  }
                >
                  <Meta
                    title={
                      <div style={{ textAlign: "center"}}>
                        <h3 style={{ color: "white" }}>Convenios</h3>
                      </div>
                    }
                  />
                </Card>
              </Link>
            </Col>
          </Row>     
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
            .options-container-home {
              top: 10px;
              position: relative
            }
            .background-home {
              position: absolute;
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


function mapStateToProps(state) { 
  return {
    state
  }
}

export default connect(mapStateToProps)(Home)