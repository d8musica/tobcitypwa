import Head from '../components/head'
import Show from '../components/Show'
import { connect } from 'react-redux'

import {
  Button
} from 'antd'


function Home (props) {
    console.log("TCL: Home -> props", props)
    function Sum () {
      props.dispatch({ type: 'INCREMENT' })      
    }

    function Substraction () {      
      props.dispatch({ type: 'DECREMENT' })   
    }

  return (
    <div>
      <Head title="Tobcity PWA" />
    

      <div className="hero">
        <Button type="primary" onClick={Sum} >Suma</Button>
        <Button type="primary" onClick={Substraction} >Resta</Button>
        HOME

        <Show />



      </div>

      <style jsx>{`
        .hero {
          text-align: center;
        }
      `}</style>
    </div>
  )
}



export default connect()(Home)
