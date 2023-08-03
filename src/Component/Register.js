import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Link } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import '../Style/Home.css'
import Header from './Navbar';

const Register = () => {

    const [value , setValue] = useState({
        firstname : '',
        lastname : '',
        email : '',
        password : ''
      })
    
      const [data, setData] = useState()
      const navigate = useNavigate()


      const handleOnchange = (e) => {
        setValue({...value, [e.target.name] : e.target.value})
      }
  
      const handleSubmit = (e) => {
        e.preventDefault();
        
         setData(value)
         const name = value.firstname + ' ' +  value.lastname
         localStorage.setItem("user",name)
         setTimeout(() => {
            navigate('/login')
         },1000)
        
      }
  return (
    <>
    <Header/>
    <div style = {{justifyContent : 'center', display : 'flex'}}>
    <Box  sx={{
      pt : 2,
      pl : 6,
      pr : 6,
      textAlign : "center",
    width: 400,
   
    backgroundColor: 'white',mt :6 ,boxShadow:'5px 5px 15px 5px rgba(0,0,0,0.3)',}}>
    <div>
      <h1 style = {{marginBottom : '6px'}}>Register</h1>
      <span >Already have an account ?  &nbsp; <Link href = "/login">Sign In</Link></span>
      <form onSubmit={handleSubmit}>
    <TextField style = {{margin : '30px 0px 30px 0px'}} type = 'text' name = 'firstname'   onChange={handleOnchange} fullWidth label="First Name" id="fullWidth" />
    <TextField style = {{marginBottom : '30px'}}  type = 'text' name = 'lastname'   onChange={handleOnchange} fullWidth label="Last Name" id="fullWidth" />
  <TextField style = {{marginBottom : '30px'}} type = 'email' name = 'email'   onChange={handleOnchange} fullWidth label="Email" id="fullWidth" />
  <TextField style = {{marginBottom : '30px'}} type = 'password' name = 'password'  onChange={handleOnchange} minLength = {6} fullWidth label="Password" id="fullWidth" />
  <Button type = 'submit' variant="contained" style = {{width : "100%", marginBottom : '50px'}}  > 
                Sign Up
           </Button>
</form>
</div>
</Box>
    
</div>
</>
  )
}

export default Register