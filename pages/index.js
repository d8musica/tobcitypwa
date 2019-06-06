import React from 'react'
import Login from '../components/Login'
import Router from 'next/router'
import Link from 'next/link'
import { NextAuth } from 'next-auth/client'

function Home (props) {
  function handleSignOutSubmit(event) {
    event.preventDefault()
    NextAuth.signout()
      .then(() => {
        Router.push('/auth/callback')
      })
      .catch(err => {
        Router.push('/auth/error?action=signout')
      })
  }
  if (props.session.user) {
    return (
      <React.Fragment>
        <p><Link href="/auth"><a className="btn btn-secondary">Manage Account</a></Link></p>
        <form id="signout" method="post" action="/auth/signout" onSubmit={handleSignOutSubmit}>
          <input name="_csrf" type="hidden" value={props.session.csrfToken} />
          <button type="submit" className="btn btn-outline-secondary">Sign out</button>
        </form>
      </React.Fragment>
    )
  } else {
    return (
      <Login />
    )
  }
}

Home.getInitialProps = async ({ req }) => {
  return {
    session: await NextAuth.init({ req }),
    linkedAccounts: await NextAuth.linked({ req }),
    providers: await NextAuth.providers({ req })
  }
}
export default Home