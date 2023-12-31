import React, { FC, useEffect } from 'react'
import { Typography, Space, Button, Form, Input, Checkbox, message } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '@/router'
import { useRequest } from 'ahooks'
import { loginService } from '@/services/user'
import styles from './index.module.scss'
import { setToken } from '@/utils/user-token'

const USERNAME_KEY = 'username'
const PASSWORD_KEY = 'password'

// 保存用户登陆信息
const rememberUser = (username: string, password: string): void => {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY)
  }
}

const Login: FC = () => {
  const nav = useNavigate()
  const { Title } = Typography

  const [form] = Form.useForm()

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage()
    form.setFieldsValue({ username, password })
  }, [])

  // 登陆
  const { run: login, loading: loginLoading } = useRequest(
    async (values) => {
      const { username, password } = values
      const data = await loginService(username, password)
      return data
    },
    {
      manual: true,
      onSuccess(res: any) {
        const { token = '' } = res
        setToken(token) // 存储 token
        message.success('登陆成功')
        // loadUserInfo()
        nav(MANAGE_INDEX_PATHNAME)
      }
    }
  )

  const onFinish = (values: any) => {
    const { username, password, remember } = values
    login({ username, password }) // 执行 ajax
    if (remember) {
      rememberUser(username, password)
    } else {
      console.log('忘记')
      deleteUserFromStorage()
    }
  }

  return (
    <div className={styles.container}>
      <Space>
        <Title level={2}>
          <FormOutlined />
        </Title>
        <Title level={2}>登录</Title>
      </Space>

      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
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
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 6, span: 16 }}
        >
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit" loading={loginLoading}>
              登录
            </Button>
            <Link to={REGISTER_PATHNAME}>注册新用户</Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
