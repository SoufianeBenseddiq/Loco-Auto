import React, { useState } from "react";
import signupImg from "../Login/login2.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

    //this hook is simple like header
    let history=useNavigate();
    const [data,setData]=useState({
        nom : "",
        prenom : "",
        telephone : "",
        email : "",
        password : "",
    })

    //remplire l'objet data par le changement des valeurs de champs
    const handleChange =(e)=>{
        setData({...data , [e.target.name]:e.target.value})
        // console.log(data)
        //va change les valeurs des attributs de l objet data par les valeurs changees en input
    }

    const submitForm = (e) => {
        e.preventDefault();
        const finalDataToSend = {
            nom: data.nom,
            prenom: data.prenom,
            telephone: data.telephone,
            email: data.email,
            password: data.password
        };
    
        axios.post("http://localhost/locoauto/signup.php", finalDataToSend)
            .then((result) => {
                if (result.data.status === "Invalid") {
                    alert("Invalid User");
                } else {
                    history("/login"); // Navigate to the login page upon successful signup
                }
            })
            .catch(error => {
                console.error("Signup Error:", error);
            });
    };
    
    return (
        <div className="flex h-[100vh] text-white">
            <div className="hidden md:block md:w-1/2 relative">
                <img src={signupImg} alt="" className="w-full h-full object-cover absolute inset-0" />
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-950">
                <div className="p-6 max-w-md w-full bg-gray-900 rounded-xl">
                    <h1 className="text-2xl font-semibold mb-8 text-center">Inscrivez vous Gratuitement!</h1>
                    <form className="space-y-5 " onSubmit={submitForm} >
                        <div>
                            {/* <label htmlFor="nom" className="block mb-1">Nom:</label> */}
                            <input placeholder="Nom :" value={data.nom} onChange={handleChange} type="text" name="nom" id="nom" required className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:border-blue-500 text-white" />
                        </div>
                        <div>
                            {/* <label htmlFor="prenom" className="block mb-1">Prenom:</label> */}
                            <input placeholder="Prenom :" value={data.prenom} onChange={handleChange} type="text" name="prenom" id="prenom" required className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:border-blue-500 text-white" />
                        </div>
                        <div>
                            {/* <label htmlFor="telephone" className="block mb-1">Telephone:</label> */}
                            <input placeholder="Telephone :" value={data.telephone} onChange={handleChange} type="tel" name="telephone" id="telephone" required className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:border-blue-500 text-white" />
                        </div>
                        <div>
                            {/* <label htmlFor="email" className="block mb-1">Email:</label> */}
                            <input placeholder="Email :" value={data.email} onChange={handleChange} type="text" name="email" id="email" required className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:border-blue-500 text-white" />
                        </div>
                        <div>
                            {/* <label htmlFor="password" className="block mb-1">Mot de passe:</label> */}
                            <input placeholder="Password :" value={data.password} onChange={handleChange} type="password" name="password" id="password" required autoComplete="off" className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:border-blue-500 text-white" />
                        </div>
                        <div>
                            <input type="submit" value="S'inscrire" className="hover:cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-[#ff0366] transition duration-300"/>
                            <p className="text-gray-400 text-[12px] text-center mt-2  " >Avez vous deja un compte ? <Link to={"/login"} > <span className="cursor-pointer text-white underline" >Connectez vous</span></Link></p>
                        </div>
                            
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
