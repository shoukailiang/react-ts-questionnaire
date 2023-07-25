import React, { FC, useEffect, useState } from 'react'
import { Typography, Space, Button, Form, Input, Checkbox, message } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '@/router'
import { useRequest } from 'ahooks'
import { getUserInfoService, loginService } from '@/services/user'
import { setToken } from '@/utils/user-token'
import useLoadUserData from '@/hooks/useLoadUserData'
import { loginReducer } from '@/store/userReducer'
import styles from './index.module.scss'

const USERNAME_KEY = 'username'
const PASSWORD_KEY = 'password'

const rememberUser = (username: string, password: string) => {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

const getUser = () => {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY)
  }
}

const Login: FC = () => {
  const [userInfo, setUserInfo] = useState({ username: '', nickname: '' })
  const nav = useNavigate()
  const { Title } = Typography

  const [form] = Form.useForm()

  useEffect(() => {
    const { username, password } = getUser()
    form.setFieldsValue({ username, password })
  }, [])

  const dispatch = useDispatch()

  // 加载用户信息
  const loadUserInfo = () => {
    getUserInfoService()
      .then((res) => {
        // 导航到主页
        nav(MANAGE_INDEX_PATHNAME)
        setUserInfo(res as any)
        dispatch(loginReducer(res as any))
        message.success('登陆成功')
      })
      .catch((err) => {
        console.log(err)
        message.error('获取信息失败')
      })
  }

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
        message.success('登陆成功')
        const { token } = res
        loadUserInfo()
      }
    }
  )

  const onFinish = (values: any) => {
    const { username, password, remember } = values
    if (remember) {
      rememberUser(username, password)
    } else {
      console.log('忘记')
    }
    // 执行登陆
    login(values)
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
