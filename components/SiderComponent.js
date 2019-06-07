import { useState, Fragment } from 'react'
import { Layout, Menu, Icon } from 'antd'
const { Sider } = Layout
import Logo from '../static/icon.png'
import Link from 'next/link'

export default function SiderComponent(props) {
  console.log('props Sider: ', props);
  const [collapsed, setCollapsed] = useState(true)
  function onCollapse() {
    setCollapsed(!collapsed)
  }
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
  return (
    <Fragment>
      <Sider style={{ background: "#00BFB5" }} collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Link href="/" replace>
          <img className={ collapsed ? 'logo-small' : 'logo-big' } src={Logo} alt="Tobcity Logo" />
        </Link>
        <Menu defaultSelectedKeys={['1']} mode="inline" style={{ background: "#00BFB5" }}>
          <Menu.Item key="1">
            <Icon type="book" />
            <span>Terminos Y Condiciones</span>
            <Link href="/terms">
              <a></a>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="smile" />
            <span>Quienes Somos</span>
            <Link href="/about">
              <a></a>
            </Link>
          </Menu.Item>
          {
            props.session.user
              ? (
                <Menu.Item key="4">
                  <Icon type="logout" />
                  <span>Salir</span>
                  <Link href='/hello'>
                    <div>
                      <a onClick={() => { handleSignOutSubmit()}}>
                      </a>
                    </div>
                  </Link>
                  <form id="signout" method="post" action="/auth/signout" onSubmit={handleSignOutSubmit}>
                    <input name="_csrf" type="hidden" value={props.session.csrfToken} />
                    <button type="submit" className="btn btn-outline-secondary">Sign out</button>
                  </form>
                </Menu.Item>
              ) : null
          }
        </Menu>
        <style scoped>{`
        .logo-small {
          margin: 16px;
          height: 50px;
          cursor: pointer;
        }
        .logo-big {
          cursor: pointer;
          margin: 50px;
        }
        .ant-layout-sider .ant-layout-sider-trigger {
          background: #00BFB5
        }
        .ant-menu-item-selected {
          background-color: #ffc83a !important;
        }
      `}</style>
      </Sider>
    </Fragment>
  )
}


