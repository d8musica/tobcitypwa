import { Fragment } from 'react'
import Login from '../components/Login'
import Router from 'next/router'
import Link from 'next/link'
import { NextAuth } from 'next-auth/client'
import { Button, Card, Icon, Avatar } from 'antd'
import ProfileCover from '../static/profileCover.png'
const { Meta } = Card

function Profile ({ name }) {
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
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={`Hola ${name}`}
        description="Aqui encuentras toda tu informacion"
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
  const { name } = props.session.user || ''
  function handleSignOutSubmit(event) {
    event.preventDefault()
    NextAuth.signout()
      .then(() => {
        Router.push('/auth/callback')
      })
      .catch(err => {
        Router.push('/auth/error?action=signout')
      })
  }
  if (props.session.user) {
    return (
      <div className='main-container'>
        <form id="signout" method="post" action="/auth/signout" onSubmit={handleSignOutSubmit}>
          <input name="_csrf" type="hidden" value={props.session.csrfToken} />
          <button type="submit" className="btn btn-outline-secondary">Sign out</button>
        </form>
        <div><Profile name={name} /></div>
        <div><BuscarViaje /></div>
        <div><AgregarViaje /></div>
        <style scoped>{`
          .main-container {
            display: flex;
            justify-content: space-around;
            position: relative;
            top: 200px;
          }
        `}</style>
      </div>
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