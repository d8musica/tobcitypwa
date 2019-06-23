import { useEffect, useState } from "react";
import { Row, Col, Card, Divider, Carousel } from "antd";
import Link from "next/link";
import { connect } from 'react-redux'
import LoginFace from "../static/login/loginfacebook.png"
import LoginGoogle from "../static/login/logingoogle.png"
import LoginCell from "../static/login/login-celular.png"
import Circle from "../static/login/circle-emoji.png"
import Carousel1 from "../static/login/carousel1.png"
import Carousel2 from "../static/login/carousel2.png"
import Carousel3 from "../static/login/carousel3.png"
import Carousel4 from "../static/login/carousel4.png"
import Carousel5 from "../static/login/carousel5.png"
import Carousel6 from "../static/login/carousel6.png"
import Carousel7 from "../static/login/carousel7.png"
import Carousel8 from "../static/login/carousel8.png"
import Logo from "../static/logo.png"
import { fetchTravels } from '../redux/actions/travelAction'
import ContentComponent from './ContentComponent'
const tabList = [
  {
    key: 'nacional',
    tab: 'NACIONAL',
  },
  {
    key: 'local',
    tab: 'LOCAL',
  },
  {
    key: 'convenios',
    tab: 'CONVENIOS',
  },
];


function Login(props) {
  // console.log('props: ', props);
  const [historyType, setHistoryType] = useState({ key: 'nacional'})
  const { dispatch, travels } = props
  useEffect(() => {
    dispatch(fetchTravels())
  }, [])
  function onTabChange (key, type) {
    setHistoryType({ [type]: key });
  };
  return (
    <>
      <Row className="login-main-container">
        <Col xs={24} sm={12} >
          <div className="top-container">
            <div className="emoji-container">
              <img  src={Circle} alt="circle-emojis"  className="image emojis "/>
              <Carousel autoplay dotPosition="top" effect="fade" dots={false}>
                <div>
                  <img  src={Logo} alt="Tobcity Logo"  className="carousel-img "/>
                </div>
                <div>
                  <img  src={Carousel1} alt="circle-emojis"  className="carousel-img "/>
                </div>
                <div>
                  <img  src={Carousel2} alt="circle-emojis"  className="carousel-img "/>
                </div>
                <div>
                  <img  src={Carousel3} alt="circle-emojis"  className="carousel-img "/>
                </div>
                <div>
                  <img  src={Carousel4} alt="circle-emojis"  className="carousel-img "/>
                </div>
                <div>
                  <img  src={Carousel5} alt="circle-emojis"  className="carousel-img "/>
                </div>
                <div>
                  <img  src={Carousel6} alt="circle-emojis"  className="carousel-img "/>
                </div>
                <div>
                  <img  src={Carousel7} alt="circle-emojis"  className="carousel-img "/>
                </div>
                <div>
                  <img  src={Carousel8} alt="circle-emojis"  className="carousel-img "/>
                </div>
              </Carousel>
            </div>
            <div className="loginbtns">
              {/* <a href="/auth/login">
                <img className="login-button" src={LoginCell} alt="Ingreso con celular " />
              </a> */}
              <a href="/auth/facebook">
                <img className="login-button" src={LoginFace} alt="Ingreso con Facebook" />
              </a>
              <a href="/auth/google">
                <img className="login-button" src={LoginGoogle} alt="Ingreso con Google" />
              </a>
            </div>            
          </div>
        </Col>
        <Col xs={24} sm={12} >
          <Card
            style={{ width: '100%' }}
            title="Ultimos viajes programados"
            tabList={tabList}
            activeTabKey={historyType.key}
            onTabChange={key => {
              onTabChange(key, 'key');
            }}
          >
            <ContentComponent type={historyType.key} />
          </Card>
        </Col>
      </Row>
      <style scoped>
        {`
              @media(min-with: 568px){
                .login-main-container {
                  flex-wrap: wrap;
                }
              }
                  .loginbtns {
                    margin-bottom: 20px;
                  }
                .ant-carousel .carousel-img {
                  width: 62%;
                }
                .ant-carousel  {
                  position: relative;
                  left: 20%;
                  top: 50px;
              }
              .emojis {
                position: absolute;
              }
              .ant-carousel .slick-slide {
                text-align: center;
                height: 100%;
                line-height: 160px;
                overflow: hidden;
              }
              .logo {
                width: 100px;
              }
            .road {
              width: 100%;
            }
            .emoji-container {
              margin-bottom: 3rem;
            }
            .top-container img {
              width: 100%;
            }
            
            .image {
              -webkit-animation:spin 50s linear infinite;
              -moz-animation:spin 50s linear infinite;
              animation:spin 50s linear infinite;
          }
          @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
          @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
          @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

          @media(min-width: 798px) {
          }
        `}
      </style>
    </>
  )
}

function mapStateToProps (state){
  return {
    travels: state.travelsReducer.travels,
    state
  }
}

export default connect(mapStateToProps)(Login)