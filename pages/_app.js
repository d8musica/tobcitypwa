import App, { Container } from 'next/app'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import { PageTransition } from 'next-page-transitions'
import Loader from '../components/Loader'
import Layout from '../layouts/main'
import '../static/css/styles.less'
import axios from 'axios'

const TIMEOUT = 400
class MyApp extends App {
  static async getInitialProps({ Component, ctx}) {
    let pageProps = {}
    if(Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    if(ctx.req && ctx.req.session.passport) {
      pageProps.user =  await ctx.req.user
    }
    return {pageProps}
  }
  state = {
    user: this.props.pageProps.user
  }
  render () {
    const { Component, pageProps, reduxStore } = this.props
    const props = {
      ...pageProps,
      user: this.state.user
    }
    return (
      <Container>
        <Provider store={reduxStore}>
          <Layout user={this.state.user}>
            <PageTransition
              timeout={TIMEOUT}
              classNames='page-transition'
              loadingComponent={<Loader />}
              loadingDelay={500}
              loadingTimeout={{
                enter: TIMEOUT,
                exit: 0
              }}
              loadingClassNames='loading-indicator'
            >
              <Component {...props} key={Component}/>
            </PageTransition>
          </Layout>
        </Provider>
        <style jsx global>{`
          a {
            color: rgb(42,168,154);
          }
          a:hover {
            color: rgba(255, 200, 58, 1);
          }
          .ant-btn {
            color: rgb(42,168,154);
          }
          .ant-btn-primary {
            background: rgb(42,168,154);
            border: none;
            color: white;
          }
          .ant-btn:focus,
          .ant-btn:active,
          .ant-btn:hover,
          .ant-btn-primary:focus,
          .ant-btn-primary:active,
          .ant-btn-primary:hover {
            background-color: rgba(255, 200, 58, 1);
            color: black;
          }
          .page-transition-enter {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          .page-transition-enter-active {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity ${TIMEOUT}ms;
          }
          .loading-indicator-appear,
          .loading-indicator-enter {
            opacity: 0;
          }
          .loading-indicator-appear-active,
          .loading-indicator-enter-active {
            opacity: 1;
            transition: opacity ${TIMEOUT}ms;
          }
        `}</style>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)