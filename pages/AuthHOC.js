import React from 'react'

function AuthHOC(ComposedComponent) {

  console.log('ComposedComponent: ', ComposedComponent);
  return (
    <div>
         <ComposedComponent {...props} /> 
    </div>
  )
}

AuthHOC.getInitialProps = async ({ Component }) => {
  if(Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  if(ctx.req && ctx.req.session.passport) {
    pageProps.user = ctx.req.session.passport.user
  }
  return {pageProps}
}

export default AuthHOC