import React from 'react'
import { Form, DatePicker, Input, Button } from 'antd'

 function SecondPartForm(props) {
  const { getFieldDecorator } = props.form
  const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  function handleSubmit() {
    console.log('hi');
  }
  return (
    <div className="second-part-container">
      <Form 
        {...formItemLayout}
        onSubmit={handleSubmit}>
        <Form.Item label="DatePicker[showTime]">
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
      </Form>
      <style scoped>{`
        .ant-row {
          display: inline-block
        }
      `}</style>
    </div>
  )
}

const SecondPartFormEnhanced = Form.create({ name: 'tsecond-part-form' })(SecondPartForm)

export default  SecondPartFormEnhanced