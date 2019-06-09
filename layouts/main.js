import { Fragment } from 'react'
import { Layout } from 'antd'
const { Content, Footer } = Layout;
import SideMenu from '../components/SiderComponent'
import Head from '../components/head'

export default ({ children, session }) => (
  <Fragment>
    <Head title="Tobcity PWA" />
    <Layout style={{ minHeight: '100vh' }}>
      <SideMenu session={session} />
      <Layout>
        <Content style={{ margin: '16px' }}>
          <div style={{ minHeight: "100vh" }}>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>ANDRES Y DANIE8 2019</Footer>
      </Layout>
    </Layout>
    <style scoped>{`
      .ant-layout-content {
        overflow: hidden;
      }
    `}</style>
  </Fragment>
)