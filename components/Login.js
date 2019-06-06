import { Fragment } from "react";
import { Row, Col, Carousel} from "antd";
import Link from "next/link";
import LoginFace from "../static/login/loginfacebook.png";
import LoginGoogle from "../static/login/logingoogle.png";
import LoginCell from "../static/login/login-celular.png";
import Path from "../static/login/path.png";
import Fburl from "../static/login/facebook.png";
import Igurl from "../static/login/instagram.png";
import Gplusurl from "../static/login/google.png";
import Circle from "../static/login/circle-emoji.png";


function Login() {
  return (
    <Fragment>

      <Row>
        <Col span={12}>
          <Row className="carousel">
            <div className="relative">
              <img  src={Circle} alt="circle-emojis"/>
            </div>
            <div className="absolute">
              <Carousel>
                <div>
                  <img className="" src={Fburl} alt="carousel-item-1"/>
                </div>
                <div>
                  <img className="" src={Fburl} alt="carousel-item-2"/>
                </div>
                <div>
                  <img className="" src={Fburl} alt="carousel-item-3"/>
                </div>
                <div>
                  <img className="" src={Fburl} alt="carousel-item-4"/>
                </div>
              </Carousel>
            </div>
          </Row>
          <Row className="access-buttons">
            <div className="accessbtn">
              <Link href="/auth">
                <img className="centered login-button" src={LoginCell} alt="Ingreso con celular " />
              </Link>
              <Link href="/auth/oauth/facebook">
                <img className="centered login-button" src={LoginFace} alt="Ingreso con Facebook" />
              </Link>
              <Link href="/auth/oauth/google">
                <img className="centered login-button" src={LoginGoogle} alt="Ingreso con Google" />
              </Link>
            </div>
          </Row>
        </Col>
        <Col span={12}>
          <div>
            <img src={Path} alt="Path"/>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <Row className="centered">
            <img className="icon" src={Fburl} alt=""/>
            <img className="icon" src={Igurl} alt=""/>
            <img className="icon" src={Gplusurl} alt=""/>
          </Row>
        </Col>
        <Col span={8}></Col>
      </Row>
      
      <style scoped>
        {`

          .relative
          {
            position: relative;
            top: 0;
            left: 0;
          }
          .absolute
          {
            position: absolute;
            top: 60px;
            left: 80px;
          }

          .login-button {
            width: 75%;
            height: 1%;
            text-align:center;
          }
          
          .icon {
            width: 20%;

          }
          .centered {
            text-align: center;
          }
        `}
      </style>
    </Fragment>
  )
}

export default Login