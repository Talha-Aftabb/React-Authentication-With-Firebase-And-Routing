import SignupForm from "./Components/SignupForm";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router,Routes,Route, Link } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import { Button, Result } from "antd";
import ForgotPassword from "./Components/ForgotPassword";
import UpdateProfile from "./Components/UpdateProfile";
  
function App() {
  return ( 
    <Router>
    <AuthProvider>
      <Routes>
        <Route exact path='/' element={<Dashboard />} />
         <Route path='/signup' element={<SignupForm />} />
         <Route path='/login' element={<Login />} />
         <Route path='/forgot-password' element={<ForgotPassword />} />
         <Route path='/update-profile' element={<UpdateProfile />} />
         <Route path="*" element={ <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={<Link to='/login'><Button type="primary">Back Home</Button></Link>}/>} 
              />
      </Routes>
     </AuthProvider>
    </Router>
   );
}

export default App;
