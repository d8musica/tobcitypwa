import React from "react"
import { Row, Col, Card, Tooltip } from 'antd'
import Link from 'next/link'
import Nacional from './images/nacional.png'
import Local from './images/local.png'
import Convenios from './images/convenios.png'

export function SearchOptions() {
  return (
    <Row gutter={16} className='main-container'>
      <Col span={8}  className='control-width'>
        <Link href="/search-travel/nacional">
          <Card style={{ background: "transparent"}} hoverable bordered={false} cover={<Tooltip title="Ir a viajes nacionales">
            <img alt="Buscar Viaje nacionales en TOBCITY" src={Nacional} />
          </Tooltip>} 
          />
        </Link>
      </Col>
      <Col span={8} className='control-width'>
        <Link href="/search-travel/local">
          <Card style={{ background: "transparent"}} hoverable bordered={false} cover={<Tooltip title="Ir a viajes locales">
            <img alt=" Viajes locales en TOBCITY" src={Local} />
          </Tooltip>} 
          />
        </Link>
      </Col>
      <Col span={8} >
        <Link href="/search-travel/convenios">
          <Card hoverable style={{ background: "transparent"}} bordered={false} cover={<Tooltip title="Ir a viajes con convenio">
            <img alt="Viajes en convenio con TOBCITY" src={Convenios} />
          </Tooltip>} />
        </Link>
      </Col>
      <style scoped>{`
    `}</style>
    </Row>
    )
}
  