import { Fragment } from 'react'
import Login from '../components/Login'
import Link from 'next/link'
import { NextAuth } from 'next-auth/client'
import { Card, Icon, Avatar, Row, Col } from 'antd'
import ProfileCover from '../static/profileCover.png'
import SearchCover from '../static/searchCover.png'
const { Meta } = Card

function Profile ({ name, avatar }) {
  return (
    <Card
      hoverable
      style={{ width: 250 }}
      cover={
        <img
          alt="example"
          src={ProfileCover}
        />
      }
      actions={[<Link href="/auth"><a>VE A TU PERFIL</a></Link>]}
    >
      <Meta
        avatar={<Avatar size="large" src={avatar} />}
        title={`Hola ${name}`}
        description="Dale click y administra tu informacion en TOBCITY"
      />
    </Card>
  )
}

function BuscarViaje () {
  return (
    <Card
      hoverable
      style={{ width: 250 }}
      cover={
        <img
          alt="example"
          src={SearchCover}
        />
      }
      actions={[<Link href="/"><a>ENCUENTRA AQUI TU VIAJE</a></Link>]}
    >
      <Meta
        title="Buscar Viajes"
        description="Aqui encuentras viajes locales, nacionales y convenios"
      />
    </Card>
  )
}

function AgregarViaje () {
  return (
    <Card
      hoverable
      style={{ width: 250 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
    >
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title="Card title"
        description="This is the description"
      />
    </Card>
  )
}

function Home (props) {
  console.log('props: ', props);
  const { name, avatarData } = props.session.user || ''
  if (props.session.user) {
    return (
      <Row className='main-container'>
        <Col span={8} ><Profile name={name} avatar={avatarData.url}/></Col>
        <Col span={8} ><BuscarViaje /></Col>
        <Col span={8} ><AgregarViaje /></Col>
        <style scoped>{`
          .main-container {
            display: flex;
            justify-content: space-around;
            position: relative;
            top: 200px;
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