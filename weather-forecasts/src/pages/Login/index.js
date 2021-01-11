import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import {
  useHistory,
} from "react-router-dom";

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
    history.push(`/home`,)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login_bc">
      <div className="login">
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
