import { Form, DatePicker, Input, Select, Avatar, Button, InputNumber , message, Icon, Card } from 'antd'
import { connect } from 'react-redux'
import Router from 'next/router'
import MapSolo from './MapSolo'
import LocalAvatar from '../../static/addTravel/local.png'
import NacionalAvatar from '../../static/addTravel/nacional.png'
import ConveniosAvatar from '../../static/addTravel/convenios.png'
import { addTravelRequest } from '../../redux/actions/travelAction'
import Mascotas from './images/mascota.png'
import NoMascotas from './images/nomascota.png'
import Equipaje from './images/equipaje.png'
import NoEquipaje from './images/noequipaje.png'
import Cigarrillo from './images/cigarro.png'
import NoCigarro from './images/nocigarro.png'
import Comida from './images/comida.png'
import NoComida from './images/nocomida.png'

const { Option } = Select
const { TextArea } = Input
const { Meta } = Card

const TravelDetails = ({ info, ...props }) => {
  const petChoice = (info.pets) ?
    <img key='Mascotas' alt="Opciones de viaje" src={Mascotas} />
    :
    <img key='NoMascotas' alt="Opciones de viaje" src={NoMascotas} />
  const lugaggeChoice = (info.lugagge) ?
    <img  alt="Opciones de viaje" src={Equipaje} />
    :
    <img key='NoEquipaje' alt="Opciones de viaje" src={NoEquipaje} />
  const cigarChoice = (info.smoke) ?
    <img key='Cigarrillo' alt="Opciones de viaje" src={Cigarrillo} />
    :
    <img alt="Opciones de viaje" src={NoCigarro} />
  const foodChoice = (info.food) ?
    <img key='Comida' alt="Opciones de viaje" src={Comida} />
    :
    <img key='NoComida'  alt="Opciones de viaje" src={NoComida} />
  return (
    <>
    <Card
      style={{ width: 300, display: 'inline-block' }}
      cover={
        <div className="map-container">
          <MapSolo props={info} />
        </div>
      }
      actions={[<Icon onClick={() => props.handler()} type="edit" />]}
    >
      <Meta
        avatar={[petChoice, lugaggeChoice, cigarChoice, foodChoice]}
        title={<p>Desde:{info.nameFrom}</p>}
        description={<p>Hacia:{info.nameTo}</p>}
      />
    </Card>
    <style scoped>{`
      .map-container {
        position: relative;
        width: 300px;
        height: 130px;
      }
      .ant-card-meta-avatar img {
        width: 20%;
      }
      .ant-card-meta-avatar {
        float: none;
      }
    `}</style>
    </>
  )
}

function SecondPartForm(props) {
  const { dispatch, user, nameTo } = props
  const { getFieldDecorator } = props.form
  const userId = user.id
  const config = {
    rules: [{ type: 'object', required: true, message: 'Selecciona la hora de tu viaje' }],
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };
  function handleSubmit (e) {
    e.preventDefault()
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(addTravelRequest(values, userId))
        message
          .loading('Tu viaje esta siendo publicado..', 1.5)
          .then(() => message.success(`El viaje hacia ${nameTo} fue publicado con exito!`, 2.5))
        Router.push('/profile')
      }
    })
  }
  return (
    <div className="second-part-container">
      <TravelDetails {...props} />
      <Form 
        {...formItemLayout}
        onSubmit={handleSubmit}>
        <Form.Item label="Indica el dia y la hora de tu viaje">
          {getFieldDecorator('date', config)(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
          )}
        </Form.Item>
        <Form.Item label="Ingresa la placa de tu vehiculo">
          {getFieldDecorator('plate', {
            rules: [
              {
                required: true,
                message: 'Por favor ingresa la placa de tu vehiculo',
              }
            ]
          })(<Input placeholder="Ingresa la placa de tu vehiculo" />)}
        </Form.Item>
        <Form.Item label="Cuanto sera el valor por persona">
          {getFieldDecorator('price', {
            rules: [
              {
                required: true,
                message: 'Por favor ingresa el valor por persona',
              },
            ],
          })(<InputNumber 
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')} 
            placeholder="Ingresa el valor por persona" 
          />)}
        </Form.Item>
        <Form.Item label="Informa tus comentarios adicionales">
          {getFieldDecorator('comments')(<TextArea type="text" placeholder="Ingresa tus comentarios adicionales" />)}
        </Form.Item>
        <Form.Item label="Que tipo de viaje haras">
          {getFieldDecorator('traveltype', {
            initialValue:"local",
            rules: [
              {
                required: true,
                message: 'Elige el tipo de viaje'
              },
            ] 
          })(
            <Select>
              <Option value="local"><Avatar src={LocalAvatar}/>Local</Option>
              <Option value="nacional"><Avatar src={NacionalAvatar}/>Nacional</Option>
              <Option value="convenios" ><Avatar src={ConveniosAvatar}/> Convenios</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Cuantos puestos tienes disponibles">
          {getFieldDecorator('sits', {
            initialValue:"1",
            rules: [
              {
                required: true,
                message: 'Indicanos los puestos que tienes disponibles',
              },
            ]  
          })(
            <Select>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3" >3</Option>
              <Option value="4" >4</Option>
            </Select>
          )}
        </Form.Item>
        <Button style={{ top: 80 }} type="primary" htmlType="submit">
            Confirmar y postear tu viaje!
        </Button>
      </Form>
      <style scoped>{`
        .ant-form {
          background: rgba(255, 255, 255, .8);
          padding: 28px;
          margin-top: 20px;
        }
        .ant-row {
          margin-bottom: 0px;
        }
        .second-part-container {
          position: relative;
          top: 20%;
        }
      `}</style>
    </div>
  )
}

const SecondPartFormEnhanced = Form.create({ name: 'second-part-form' })(SecondPartForm)

function mapStateToProps(state) {
  return {
    nameTo: state.travelsReducer.info.nameTo,
    info: state.travelsReducer.info
  }
} 

export default  connect(mapStateToProps)(SecondPartFormEnhanced)