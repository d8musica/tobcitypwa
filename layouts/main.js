import { Fragment } from 'react'
import { Layout, Row, Col } from 'antd'
const { Content, Footer } = Layout;
import SideMenu from '../components/SiderComponent'
import Head from '../components/head'
import Fburl from "../static/login/facebook.png";
import Igurl from "../static/login/instagram.png";
import Gplusurl from "../static/login/google.png";

export default ({ children, user }) => (
  <Fragment>
    <Head title="Tobcity PWA" />
    <Layout style={{ minHeight: '100vh' }}>
      <SideMenu user={user} />
      <Layout>
        <Content style={{ margin: '16px' }}>
          <div style={{ minHeight: "100vh" }}>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <div>
            <img className="icon" src={Fburl} alt=""/>
            <img className="icon" src={Igurl} alt=""/>
            <img className="icon" src={Gplusurl} alt=""/>
          </div>
        </Footer>
      </Layout>
    </Layout>
    <style scoped>{`
    @media(max-width: 648px) {
      .ant-layout-footer img{
        width: 33%;
      }
    }
      .ant-layout-content {
        overflow: hidden;
      }
    `}</style>
  </Fragment>
)