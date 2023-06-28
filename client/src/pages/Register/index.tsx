import React, { FC } from 'react'
import styles from './index.module.scss'
import { Typography, Space, Button, Form, Input } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { LOGIN_PATHNAME } from '@/router'
import { Link } from 'react-router-dom'

type RegisterType = {
  username: string
  password: string
  confirm: string
  nickname: string
}

const Register: FC = () => {
  const { Title } = Typography
  const onFinish = (values: RegisterType) => {
    console.log('Success:', values)
  }

  return (
    <div className={styles.container}>
      <Space>
        <Title level={2}>
          <FormOutlined />
        </Title>
        <Title level={2}>新用户注册</Title>
      </Space>

      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            {
              type: 'string',
              min: 5,
              max: 20,
              message: '字符长度在5-20位之间'
            },
            {
              pattern: /^\w+$/,
              message: '只能是字母数字下划线'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="confirm"
          rules={[
            { required: true, message: '请输入密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                } else {
                  return Promise.reject(new Error('两次密码不一致'))
                }
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label="昵称" name="nickname">
          <Input />
        </Form.Item>
      </Form>

      <Form.Item wrapperCol={{ offset: 0, span: 0 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          <Link to={LOGIN_PATHNAME}>已有账户，登录</Link>
        </Space>
      </Form.Item>
    </div>
  )
}

export default Register
