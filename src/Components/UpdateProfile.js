import React from 'react'
import { Alert, Button, Form, Input, message } from 'antd'
import {useAuth} from "../contexts/AuthContext"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function UpdateProfile() {
  const navigate = useNavigate();
  const {currentUser , updateEmail , updatePassword} = useAuth()
  const [loading , setLoading]=useState(false)
  const [error, setError] = useState("")



    const onFinish = (values) => {
      setLoading(true)
      setError("")
 if (values.password !== values.confirmPassword) {
      return setError("Passwords do not match")
    } 

    const promises = []
    if(values.email !== currentUser.email) {
      promises.push(updateEmail(values.email))
    }

    if(values.password) {
      promises.push(updatePassword(values.password))
    }

Promise.all(promises).then(() => {
  message.success("Profile updated successfully")
      navigate("/")
}).catch(()=> {
  setError("Failed to create an account")
}).finally(()=> {
      setLoading(false)
}) 
  };

  return (
     <div>
       {error && <Alert variant="danger">{error}</Alert>}
       <h1 style={{display:"flex",justifyContent:'center',paddingTop:'10px',paddingBottom:'10px'}}>Update Profile</h1>
       <Form
      name="basic" 
      onFinish={onFinish} 
     >
      <Form.Item
        label="Email"
        name="email"
       >
        <Input defaultValue={currentUser.email} type='email' />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password" 
       >
        <Input.Password placeholder='Initial Value To Leave The Same!' maxLength={8}/>
      </Form.Item>

      <Form.Item
        label="Confirm"
        name="confirmPassword"  
      >
        <Input.Password placeholder='Initial Value To Leave The Same!' maxLength={8}/>
      </Form.Item> 
        <div>
            <Link to='/'>Cancel</Link>
        </div>
        <br />
         <Button type="primary" htmlType="submit" disabled={loading}>
          Update
        </Button>
     </Form>
    </div>
  )
}

export default UpdateProfile
