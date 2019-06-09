import React, { Component, Fragment } from 'react'
import Router from 'next/router'
import { Form, Icon, Input, Button, Descriptions, Row, Col, Avatar } from 'antd';
import Link from 'next/link'
import { NextAuth } from 'next-auth/client'
import ProfileBG from '../../static/profile/profilebg.png'
import AvatarCircle from '../../static/profile/profileCircle.png'

function Profile(props) {
  console.log('props: ', props);
  const { user: {name, email, avatarData}, session, linkedAccounts } = props
  return (
    <Row>
      <img className="background-profile" src={ProfileBG} alt="TOBCITY background home" />
      <div className="avatar-profile">
        <img alt="avatar circle" src={AvatarCircle} className="avatar-circle" />
        <img alt="your picture" src={avatarData.url} className="avatar-pic"/>
      </div>
      <Descriptions title="Informacion de tu cuenta" bordered size="small">
        <Descriptions.Item label="Tu Nombre">{name}</Descriptions.Item>
        <Descriptions.Item label="E-mail">{email}</Descriptions.Item>
      </Descriptions>
      <LinkAccounts
        session={session}
        linkedAccounts={linkedAccounts}
      />
      <style scoped>{`
        .avatar-circle {
          position: absolute
        }
        .avatar-profile {
         text-align: center; 
        }
        .avatar-pic {
          width: 200px;
          position: relative;
          top: 30px;
          left: 30px;
          border-radius: 50%;
        }
        .background-profile {
          width: 100%;
          height: 100vh;
          position: absolute;
          z-index: 0;
        }
        .ant-descriptions {
          color: white;
          position: relative;
          top: 30px;
          padding: 20px;
        }
      `}</style>
    </Row>
  )
}
class SigninForm extends Component {
  static async getInitialProps({ req }) {
    return {
      session: await NextAuth.init({ req }),
      linkedAccounts: await NextAuth.linked({ req }),
      providers: await NextAuth.providers({ req })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        NextAuth.signin(values.email)
          .then(() => {
            Router.push(`/auth/check-email?email=${values.email}`)
          })
          .catch(() => {
            Router.push(`/auth/error?action=signin&type=email&email=${values.email}`)
          })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { session, linkedAccounts } = this.props
    const { user } = this.props.session
    if (user) {
      return (
        <Profile user={user} session={session} linkedAccounts={linkedAccounts} />
      )
    } else {
        return (
          <div className="signin-container">
            <div className="signin-form">
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Por favor ingresa tu e-mail!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-mail" />
                  )}
                </Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Ingresa
                </Button>
              </Form>
            </div>
          <style jsx>{`
            .signin-container {
              text-align: center;
            }
            .signin-form {
              max-width: 300px;
              display: inline-block;
              text-align: center;
            }
          `}</style>
        </div>
      )
    }
  }
}

export class LinkAccounts extends React.Component {
  render() {
    return (
      <>
        <h2>Estas son tus cuentas asociadas a TOBCITY:</h2>
        {
          Object.keys(this.props.linkedAccounts).map((provider, i) => {
            return <LinkAccount key={i} provider={provider} session={this.props.session} linked={this.props.linkedAccounts[provider]} />
          })
        }
      </>
    )
  }
}
export class LinkAccount extends React.Component {
  render() {
    if (this.props.linked === true) {
      return (
        <form method="post" action={`/auth/oauth/${this.props.provider.toLowerCase()}/unlink`}>
          <input name="_csrf" type="hidden" value={this.props.session.csrfToken} />
          <Button type="danger" htmlType="submit">
            Desasociar TOBCITY de {this.props.provider}
          </Button>
          <style scoped>{`
          .ant-btn-primary {
            background: rgba(0, 191, 181, .4);
            position: relative;
            left: 20px;
            margin: 5px;
          }
          .ant-btn-danger {
            background: rgba(255, 200, 58, .4);
            position: relative;
            left: 20px;
            margin: 5px;
          }
          .ant-btn-primary:active,
          .ant-btn-primary:hover {
            background: rgb(0, 191, 181);
          }
        `}</style>
        </form>
      )
    } else {
      return (
        <Button type="primary" href={`/auth/oauth/${this.props.provider.toLowerCase()}`}>
          Asociar TOBCITY con {this.props.provider}
        </Button>
      )
    }
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(SigninForm)

export default WrappedNormalLoginForm