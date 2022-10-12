import { Alert, Button, Form, Input, message } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ForgotPassword() {
   const {resetPassword} = useAuth()
   const [loading , setLoading]=useState(false)
   const [error, setError] = useState("")
 

    const onFinish = async (values) => {
    try {
      setError("")
      setLoading(true)
      await resetPassword(values?.email)
      message.success("Check your inbox for further instructions")
     } catch {
      setError("Failed to reset password")
    }
     setLoading(false)
  };

  return (
        <div>
       <h1 style={{display:"flex",justifyContent:'center',paddingTop:'10px',paddingBottom:'10px'}}>Forgot Password</h1>
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
        <div>
            <h2>Need An Account? <Link to='/signup'>Signup</Link></h2>
        </div>
        <div>
            <h2>Already Have An Account? <Link to='/login'>Login</Link></h2>
        </div>
        <br />
         <Button type="primary" htmlType="submit" disabled={loading}>
          Reset Password
        </Button>
     </Form>
    </div>
  )
}

export default ForgotPassword
