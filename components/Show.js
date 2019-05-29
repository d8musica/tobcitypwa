import React from 'react'
import { connect } from 'react-redux'

 function Show(props) {
    console.log(props)
    return (
        <div>
            {props.number}
        </div>
    )
}

function mapStateToProps(state) {
    return state
  }

export default connect(mapStateToProps)(Show)