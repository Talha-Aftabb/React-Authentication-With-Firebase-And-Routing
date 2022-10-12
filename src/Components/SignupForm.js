import React from 'react'
import { Alert, Button, Form, Input, message } from 'antd'
import {useAuth} from "../contexts/AuthContext"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const navigate = useNavigate();
  const {signup} = useAuth()
  const [loading , setLoading]=useState(false)
  const [error, setError] = useState("")



    const onFinish = async (values) => {
if (values.password !== values.confirmPassword) {
      return setError("Passwords do not match")
    } 
       try {
      setError("")
      setLoading(true)
      await signup(values?.email,values?.password)
      message.success("Signup successfully")
      navigate("/")
     } catch {
      setError("Failed to create an account")
    }
     setLoading(false)
  };
 
  return (
    <div>
       <h1 style={{display:"flex",justifyContent:'center',paddingTop:'10px',paddingBottom:'10px'}}>Signup</h1>
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

      <Form.Item
        label="Confirm"
        name="confirmPassword" 
        rules={[{ required: true, message: 'Please Confirm Your Password!' }]}

      >
        <Input.Password maxLength={8}/>
      </Form.Item> 
       <div>
            <h2>Already Have An Account? <Link to='/login'>Login</Link></h2>
        </div>
        <br />
         <Button type="primary" htmlType="submit" disabled={loading}>
          Submit
        </Button>
     </Form>
    </div>
  )
}

export default SignupForm
