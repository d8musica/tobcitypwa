import { useState, Fragment } from 'react'
import { Layout, Menu, Icon } from 'antd'
const { Sider } = Layout
import Logo from '../static/icon.png'
import Link from 'next/link'

export default function SiderComponent() {
  const [collapsed, setCollapsed] = useState(true)
  function onCollapse() {
    setCollapsed(!collapsed)
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
