import React, { useState } from 'react';
import loginImg from './login2.jpg';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate(); // Corrected: useNavigate should be called as a function
    // const [token,setToken]=useState("")
    const [data, setData] = useState({
        email:"",
        password:""
    });
    const handleChange =(e)=>{
        setData({...data , [e.target.name]:e.target.value})
    }
    const handleLogin = (e) => {
        e.preventDefault();
        let dataToSend = {
            email: data.email,
            password: data.password
        };
        axios.post("http://localhost/locoauto/login.php", dataToSend)
            .then((result) => {
                if (result.data.status === "Invalid") {
                    alert("Utilisateur ou mot de passe incorrect!");
                }else if(result.data.status === "Empty"){
                    alert("Vous devez remplire les chanps d'identification!");
                } else if(result.data.status === "Success") {
                    const token = result.data.token;
                    if (token!=="") {
                        // alert(token)
                        var date = new Date();
                        date.setTime(date.getTime() + (10 * 24 * 60 * 60 * 1000));
                        var expires = "expires=" + date.toUTCString();
                        document.cookie = "token=" + token + ";" + expires + ";path=/";
                        axios.get(`http://localhost/locoauto/admin/checkAdmin.php?token=${token}`).then(
                            (response)=>{
                                // alert(response.data)
                                if(response.data==='admin'){
                                    navigate("/HomeAdmin");
                                }else{
                                    navigate("/");
                                }
                            }
                        )
                        
                    } else {
                        alert("Token not received from server.");
                    }
                }
            })
            .catch(error => {
                console.error("Login Error:", error);
            });
    };



    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full fixed'>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={loginImg} alt="" />
            </div>
            <div className='bg-gray-950 flex flex-col justify-center'>
                <form onSubmit={handleLogin} className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'>
                    <h2 className='text-4xl font-serif dark:text-white font-bold text-center'>Identifiez vous</h2>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Email</label>
                        <input onChange={handleChange} name='email' className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="email" />
                    </div>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Password</label>
                        <input onChange={handleChange} name='password' className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" />
                    </div>
                    <input type="submit" value="Se connecter" className="hover:cursor-pointer w-full bg-blue-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-[#ff0366] transition duration-300" />
                    <div className='flex justify-center' >
                        <p className='cursor-pointer hover:underline mt-2 underline text-gray-400 text-[12px] text-center hover:text-white ' ><Link to={"/signup"} >Creer un compte</Link></p>
                        {/* <p className='cursor-pointer hover:underline mt-2 underline text-gray-400 text-[12px] text-center hover:text-white ' >Mot de passe oublié ?</p> */}
                    </div>
                </form>
            </div>
        </div>
    )
}
