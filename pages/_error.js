import React from 'react'
import notFound from '../static/notfound.png'
import Link from 'next/link'

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    return (
      <>
        {this.props.statusCode
          ? (
            <div className='not-found-container'>
              <h1 className='nf-text'>Oooops, esto sucedio: {this.props.statusCode}</h1>
              <h3 className='nf-text'>Por favor intenta de nuevo!</h3>
              <p>Regresa a<Link href="/"><a> TOBCITY </a></Link></p>
              <img className='not-found-img' src={notFound} alt="Not Found" />
            </div>
          )
          : (
            <div className='not-found-container'>
              <h1 className='nf-text'>Oooops, Algo inesperado ocurrio!</h1>
              <h3 className='nf-text'>Por favor intenta de nuevo!</h3>
              <p>Regresa al<Link href="/"><a>TOBCITY</a></Link></p>
              <img className='not-found-img' src={notFound} alt="Not Found" />
            </div>
          )}
          <style scoped>{`
            .not-found-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              height: 100vh;
            }
            
            .not-found-img {
              width: 50%;
            }
            
            .nf-text {
              text-align: center;
              font-weight: 100;
              color: rgb(42,168,154)
            }
          `}</style>
      </>
    )
  }
}

export default Error