import React, { Component, Fragment } from 'react'
import Router from 'next/router'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Link from 'next/link'
import { NextAuth } from 'next-auth/client'

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
    if (this.props.session.user) {
      return (
        <div className="container">
          <div className="text-center">
            <h1 className="display-4 mt-3">NextAuth Example</h1>
            <p className="lead mt-3 mb-1">You are signed in as <span className="font-weight-bold">{this.props.session.user.email}</span>.</p>
          </div>
          <div className="row">
            <div className="col-sm-5 mr-auto ml-auto">
              <LinkAccounts
                session={this.props.session}
                linkedAccounts={this.props.linkedAccounts}
              />
            </div>
          </div>
          <p className="text-center">
            <Link href="/"><a>Home</a></Link>
          </p>
        </div>
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
      <div className="card mt-3 mb-3">
        <h4 className="card-header">Link Accounts</h4>
        <div className="card-body pb-0">
          {
            Object.keys(this.props.linkedAccounts).map((provider, i) => {
              return <LinkAccount key={i} provider={provider} session={this.props.session} linked={this.props.linkedAccounts[provider]} />
            })
          }
        </div>
      </div>
    )
  }
}

export class LinkAccount extends React.Component {
  render() {
    if (this.props.linked === true) {
      return (
        <form method="post" action={`/auth/oauth/${this.props.provider.toLowerCase()}/unlink`}>
          <input name="_csrf" type="hidden" value={this.props.session.csrfToken} />
          <p>
            <button className="btn btn-block btn-outline-danger" type="submit">
              Unlink from {this.props.provider}
            </button>
          </p>
        </form>
      )
    } else {
      return (
        <p>
          <a className="btn btn-block btn-outline-primary" href={`/auth/oauth/${this.props.provider.toLowerCase()}`}>
            Link with {this.props.provider}
          </a>
        </p>
      )
    }
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(SigninForm)

export default WrappedNormalLoginForm