import React from 'react'
import { Form, Input, Button, Checkbox,message } from 'antd';
import {
  useHistory,
} from "react-router-dom";
import fetching from '@/util/fetching'
import './index.less'

const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 24,
  },
};



const Index = () => {

  const history = useHistory();



  const onFinish = (values) => {
    console.log('Success:', values);
    fetching('/weather_boot/call/login', {
      body: values,
      method:'POST'
    })
      .then(res => {
        if(res && res.code === 200) {
          localStorage.setItem('token',res.data)
          history.push(`/home`,)
        } else message.error(res.msg)
       
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login_bc">
      <div className="login">
        <h2>简易天气预报系统</h2>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input.Password  placeholder="请输入用密码" />
          </Form.Item>

          {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

          <Form.Item {...tailLayout}>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              登录
        </Button>
          </Form.Item>
        </Form>
      </div>
    </div>


  );
}

export default Index
