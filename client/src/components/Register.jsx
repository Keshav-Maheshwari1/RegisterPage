import React,{useState} from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export const Register = () => {
        const navigate = useNavigate()
        const[data,setData] = useState(
                {
                    email:'',
                    password:'',
                    confirmPassword:''
                }
    
        )

        const registerUser = async (e) => {
                e.preventDefault()
                const{email,password,confirmPassword} = data
                try{
                        const{data} = await axios.post('/register',{
                                email,
                                password,
                                confirmPassword
                        })
                        if(data.message) {
                                toast.error(data.message)
                        }else{
                                setData({})
                                toast.success('Registered successfully🔥')
                                navigate('/Home')
                        }
                }catch(error){
                        console.log(error)
                }
        }
  return (
        <div className="Register" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'blue',
                backgroundColor: 'rgb(6, 1, 34)',
                height: '725px',
        }}>

                <form onSubmit={registerUser} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        width:'30%',
                        height: '50%'
                        

                }}>
                        <h1>Hello! Welcome to Our Team</h1>
                        <input type="email" placeholder="Email" value={data.email} 
                        onChange={(e)=>setData({...data,email:e.target.value})} style={{
                                height:'8%'
                        }}/>

                        <input type="password" placeholder="Password" value={data.password} 
                        onChange={(e)=>setData({...data,password:e.target.value})} style={{
                                height:'8%'
                        }}/>

                        <input type="password" placeholder="Confirm Password" value={data.confirmPassword} 
                        onChange={(e)=>setData({...data,confirmPassword:e.target.value})} style={{
                                height:'8%'
                        }}/>

                        <button type='submit'style={{
                                marginTop:'40px',
                                marginBottom:'30px'
                        }}>Register</button>

                        <a href="http://localhost:3000/Login">Already User! Click Me</a>
                </form>
                        
        </div>
  )
}
