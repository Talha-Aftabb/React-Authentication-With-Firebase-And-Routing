import { Alert, Button, message } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const {currentUser,logout} = useAuth()

  const handleLogout = async () => {
   setError('')
   try {
    await logout()
    message.success("Logout successfully completed")
    navigate('/login')
   }catch{
    setError("Failed To Logout")
   }
  }

  return (
    <div>
       <h1 style={{display:"flex",justifyContent:'center',paddingTop:'10px',paddingBottom:'10px'}}>DashBoard</h1>
      <strong>Email: </strong> {currentUser && currentUser.email}
      {error && <Alert variant="danger">{error}</Alert>}
      <br />
      <>
      <Link to='/update-profile'><Button type='primary'>Update Profile</Button></Link>
      <br />
      <Button type="primary" style={{marginTop:'5px'}} onClick={handleLogout}>Logout</Button>
      </>
    </div>
  )
}

export default Dashboard
