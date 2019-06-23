import { Form, Icon, Input, InputNumber, Button, message, notification } from 'antd'
import { connect } from 'react-redux'
import { updateUser } from '../redux/actions/userActions'
import Router from 'next/router'

function UpdateUser(props) {
  console.log('props: ', props);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  }
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  }
  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        props.dispatch(updateUser(values))
        message
          .loading('Estamos actualizando tus datos', 1.5)
          .then(() => message.success(`Datos actualizados con exito!`, 2.5))
        setTimeout(() => {
          notification.open({
            duration: 0,
            message: 'A disfrutar de tu TOBCITY',
            description:
              'Gracias por acttualizar tus datos!',
            onClick: () => {
              console.log('Notification Clicked!')
            }
          })
        }, 4000)
        setTimeout(() => {
          window.location.reload()
        }, 5500)
      }
    })
  }
  const { getFieldDecorator } = props.form
  const { user: { name, idcedula, email, cellphone, city }}  = props
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} className="login-form">
      <Form.Item label="Nombre">
        {getFieldDecorator('name', {
          initialValue: name,
          rules: [{ required: true, message: 'Este campo es necesario' }],
        })(
          <Input
            placeholder="Nombre"
          />,
        )}
      </Form.Item>
      <Form.Item label="Cedula">
        {getFieldDecorator('idcedula', {
          initialValue: idcedula,
          rules: [{ type:'number', message: "Tu cedula no debe contener letras"},{ required: true, message: 'Este campo es necesario' }],
        })(
          <InputNumber
            type="number"
            placeholder="Cedula"
          />,
        )}
      </Form.Item>
      <Form.Item label="E-mail">
        {getFieldDecorator('email', 
          {
            initialValue: email,
            rules: [{
              type: 'email',
              message: 'No parece un mail valido!',
            },{ required: true, message: 'Este campo es necesario' }],
            type:"email"
          })(
          <Input
            placeholder="E-mail"
          />,
        )}
      </Form.Item>
      <Form.Item label="Telefono de contacto">
        {getFieldDecorator('cellphone', {
          initialValue: cellphone,
          rules: [{ required: true, message: 'Este campo es necesario' }],
        })(
          <Input
            placeholder="Numero Celular"
          />,
        )}
      </Form.Item>
      <Form.Item label="Ciudad desde donde utilizas Tobcity">
        {getFieldDecorator('city', {
          initialValue: city,
          rules: [{ required: true, message: 'Este campo es necesario' }],
        })(
          <Input
            placeholder="Ciudad"
          />,
        )}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" className="login-form-button">
            Editar
        </Button>
      </Form.Item>
      <style scoped>{`
        .ant-input-number{
          width: 100%;
        }
        .ant-input-number-handler-wrap {
          display: none;
        }
      `}</style>
    </Form>
  )
}

const UpdateUserForm = Form.create({ name: 'update_user' })(UpdateUser);

export default connect()(UpdateUserForm)