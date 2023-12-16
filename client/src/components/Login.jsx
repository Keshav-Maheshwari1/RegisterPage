import React,{useState} from 'react'
import axios from 'axios';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate  = useNavigate()
  const[data,setData] = useState(
    {
      email:'',
      password:''
    }

  )
  const loginUser = async (e)=>{
    e.preventDefault()
    const {email,password} = data
    try {
      const{data} = await axios.post('/Login',{
        email,
        password
      });
      if(data.message){
        toast.error(data.message);
      }
      else{
        setData({});
        navigate('/Home')
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="Login" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'blue',
                backgroundColor: 'rgb(6, 1, 34)',
                height: '725px',
        }}>

        <form onSubmit={loginUser} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        width:'30%',
                        height: '50%'
                        

                }}>
          <h1>Hello! Great To See You</h1>

          <input type="email" placeholder="Email" value={data.email} 
            onChange={(e)=>setData({...data,email:e.target.value})}
            style={{
              height:'8%'
            }}/>

          <input type="password" placeholder="Password" value={data.password} 
            onChange={(e)=>setData({...data,password:e.target.value})} 
            style={{
              height:'8%'
            }}/>

          <button type='submit'
            style={{
              marginTop:'40px',
              marginBottom:'30px'
            }}>
            Login
          </button>
          <a href="http://localhost:3000">New User! Click Me</a>
        </form>
      </div>
      {console.log(data)}
    </>
  )
}
export default Login;
