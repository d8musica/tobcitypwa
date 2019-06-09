import React from 'react'
import { Form, Input, Checkbox, Button } from 'antd'
import Map from './Map/MapContainer'
const style = {
  width: '93%',
  height: '50%',
  top: '221px',
}
function AddTravelFormComponent(props) {
  console.log('props: ', props);
  const { getFieldDecorator } = props.form
  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  function handlerMap () {
    console.log('HI')
  }
  
  return (
    <div className="add-travel-form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Donde inicia tu recorrido">
          {getFieldDecorator('from', {
            rules: [
              {
                required: true,
                message: 'Es necesario que ingreses donde te encuentras!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Donde termina tu recorrido">
          {getFieldDecorator('to', {
            rules: [
              {
                required: true,
                message: 'Es necesario que ingreses hacia donde te diriges!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      
      <style scoped>{`
        .add-travel-form-container {
          width: 400px;
          display: inline-block;
          position: relative;
          top: 50px;
        }
      `}</style>
    </div>
)
}
const AddTravelForm = Form.create({ name: 'add-travel' })(AddTravelFormComponent)

export default AddTravelForm