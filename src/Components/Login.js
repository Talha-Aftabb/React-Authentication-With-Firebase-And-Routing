import React from 'react'
import { Alert, Button, Form, Input, message } from 'antd'
import {useAuth} from "../contexts/AuthContext"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

 function Login() {
  const navigate = useNavigate();
  const {login} = useAuth()
  const [loading , setLoading]=useState(false)
  const [error, setError] = useState("")



    const onFinish = async (values) => {
    try {
      setError("")
      setLoading(true)
      await login(values?.email,values?.password)
      message.success("Login successfully")
      navigate("/")
    } catch {
      setError("Failed to sign in")
    }
     setLoading(false)
  };

  return (
    <div>
       <h1 style={{display:"flex",justifyContent:'center',paddingTop:'10px',paddingBottom:'10px'}}>Login</h1>
       {error && <Alert variant="danger">{error}</Alert>}
        <Form
      name="basic" 
      initialValues={{ remember: true }}
      onFinish={onFinish} 
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input type='email' />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password" 
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password maxLength={8}/>
      </Form.Item>
        <div>
            <h2>Need An Account? <Link to='/signup'>Signup</Link></h2>
        </div>
        <div>
            <Link to='/forgot-password'>Forgot Password?</Link>
        </div>
        <br />
         <Button type="primary" htmlType="submit" disabled={loading}>
          Submit
        </Button>
     </Form>
    </div>
  )
}

export default Login
