import { Fragment } from 'react'
import { Layout } from 'antd'
const { Content, Footer } = Layout;
import SideMenu from '../components/SiderComponent'
import Head from '../components/head'

export default ({ children }) => (
  <Fragment>
    <Head title="Tobcity PWA" />
    <Layout style={{ minHeight: '100vh' }}>
      <SideMenu />
      <Layout>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: "100vh" }}>{children}</div>
          
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  </Fragment>
)