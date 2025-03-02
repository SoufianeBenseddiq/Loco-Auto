import React, { useState } from "react";
import img from "./contact.jpg";
import axios from "axios";
import { IoMdArrowBack } from "react-icons/io";


const Contact = () => {
    const [data, setData]=useState({
        name:"",
        email:"",
        msg:""
    });
    const goBack = () => {
        window.history.back();
    }
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const handleForm=(e)=>{
        e.preventDefault();
        let finalDataToSend={
            name:data.name,
            email:data.email,
            msg:data.msg
        };
        // alert(finalDataToSend.msg)
        // axios.post("http://localhost/locoauto/contact.php",finalDataToSend).then((result)=>{
        //     alert(result.data.email)
        // });
        axios.post("http://localhost/locoauto/contact.php",finalDataToSend)
        .then((result)=>{
            if(result.data.status==="success"){
                alert("Email bien envoye!")
            }else if(result.data.status==="error"){
                alert(result.data.message)
            }
        })
    }
    return (
        <div className="text-white xmin-screen:pt-[7%] pt-[40%]  " style={{ backgroundImage: `url(${img})`, backgroundSize: "cover", minHeight: "100vh", }}>
            <div className="max-w-md w-full mx-0 p-6 sm:ml-[10%]  bg-gray-900 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                        <IoMdArrowBack className="cursor-pointer text-white mr-2" onClick={goBack} />
                        <h2 className="text-3xl font-bold text-white">Contactez Nous</h2>
                    </div>
                <form onSubmit={handleForm}>
                    <div className="mb-4">
                        <input name="name" onChange={handleChange} placeholder="Votre nom" className="w-full px-3 focus:border py-2 rounded-lg bg-gray-800 focus:outline-none focus:border-blue-500" required type="text"/>
                    </div>
                    <div className="mb-4">
                        <input name="email" onChange={handleChange} placeholder="Votre email" className="w-full px-3 py-2 focus:border rounded-lg bg-gray-800 focus:outline-none focus:border-blue-500" required type="email"/>
                    </div>
                    <div className="mb-4">
                        <textarea name="msg" onChange={handleChange} rows="4" placeholder="Tapez votre message" className="w-full px-3 py-2 rounded-lg bg-gray-800 focus:outline-none focus:border focus:border-blue-500" required></textarea>
                    </div>
                    <div className="flex justify-center">
                        <input type="submit" value="Envoyer" className="hover:cursor-pointer w-full bg-blue-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-[#ff0366] transition duration-300" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
