import { Form, DatePicker, Input, Select, Avatar, Button, InputNumber , message} from 'antd'
import { connect } from 'react-redux'
import Router from 'next/router'
import LocalAvatar from '../../static/addTravel/local.png'
import NacionalAvatar from '../../static/addTravel/nacional.png'
import ConveniosAvatar from '../../static/addTravel/convenios.png'
import { addTravelRequest } from '../../redux/actions/travelAction'
const { Option } = Select;
const { TextArea } = Input


function SecondPartForm(props) {
  console.log('props: ', props);
  const { dispatch, session, nameTo } = props
  const { getFieldDecorator } = props.form
  const userId = session.user.id
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
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(addTravelRequest(values, userId))
        message
          .loading('Tu viaje esta siendo publicado..', 1.5)
          .then(() => message.success(`El viaje hacia ${nameTo} fue publicado con exito!`, 2.5))
        Router.push('/auth')
      }
    })
  }
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <div className="second-part-container">
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
              },
            ],
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
                message: 'Elige el tipo de viaje',
              },
            ] 
          })(
            <Select onChange={handleChange}>
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
            <Select onChange={handleChange}>
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
    state
  }
} 

export default  connect(mapStateToProps)(SecondPartFormEnhanced)