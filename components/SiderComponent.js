import { useState, Fragment } from 'react'
import { Layout, Menu, Icon } from 'antd'
const { Sider } = Layout
const { SubMenu } = Menu
import Logo from '../static/icon.png'

export default function SiderComponent() {
  const [collapsed, setCollapsed] = useState(true)
  function onCollapse() {
    setCollapsed(!collapsed)
  }
  return (
    <Fragment>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <img className={ collapsed ? 'logo-small' : 'logo-big' } src={Logo} alt="Tobcity Logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>Option 2</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>User</span>
              </span>
            }
          >
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="team" />
                <span>Team</span>
              </span>
            }
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <Icon type="file" />
            <span>File</span>
          </Menu.Item>
        </Menu>
        <style jsx>{`
        .logo-small {
          margin: 16px;
          height: 50px;
        }
        .logo-big {
          margin: 50px;
        }
      `}</style>
      </Sider>
    </Fragment>
  )
}
