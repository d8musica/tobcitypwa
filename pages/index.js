import { Fragment } from 'react'
import { Layout } from 'antd'
const { Content, Footer } = Layout;
import SideMenu from '../components/SiderComponent'
import Head from '../components/head'

function Home (props) {
  return (
    <Fragment>
      <Head title="Tobcity PWA" />
      <Layout style={{ minHeight: '100vh' }}>
        <SideMenu />
        <Layout>
          <Content style={{ margin: '16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: "100vh" }}>Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </Fragment>
  )
}

export default Home