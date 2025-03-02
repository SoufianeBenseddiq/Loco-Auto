import React, { useState,useEffect } from "react";
import Navbar from "../../layout/Navbar";
import Car from "./Car";
import { ReactTyped } from "react-typed";
import "aos/dist/aos.css";
import axios from "axios";
import CarDetails from "./CarDetail";

const FilterCars = () => {
const [currentPopUp,setCurrentPopUp]=useState("")
const [msg,setMsg]=useState("")
const [ids, setIds] = useState([]);
// const [showComments, setShowComments] = useState(false);
const [data, setData] = useState({
    categorie: null,
    nbrPassagers: null,
    nbrValises: null,
    transmission: null,
    marque: null,
    prix: null,
});
// to bring the ids for the first time
useEffect(()=>{
    axios.post("http://localhost/locoauto/carsIds.php").then(
        (response)=>{
            // alert(response.data)
            setIds(response.data)
        }
    )
},[])
// stop scrolling when a popup is on
useEffect(()=>{
    // alert(currentPopUp)
    if(currentPopUp.length===0){
        document.body.style.overflowY="scroll"
    }else{
        document.body.style.overflowY="hidden"
    }
},[currentPopUp])

const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
};


const handleFilter = (e) => {
    e.preventDefault();

    let finalData = {
    categorie: data.categorie,
    nbrPassagers: data.nbrPassagers,
    nbrValises: data.nbrValises,
    transmission: data.transmission,
    prix:data.prix,
    marque:data.marque
    };
    axios
    .post("http://localhost/locoauto/filter.php", finalData)
    .then((response) => {
        // alert(response.data.result);
        if(response.data.status==="success"){
            setIds(response.data.result);
            if(response.data.length===0){
                setMsg("Aucun resultat pour ce filtre!")
            }else{
                setMsg("Le resultat de votre filtration ("+response.data.length+" voitures) :")
            }
        }else{
            setMsg(response.data.result)
        }
    })
    .catch((error) => {
        alert("Error:", error);
    });
};

return (
    <div>
        {currentPopUp.length!=0 && <CarDetails currentId={currentPopUp} changeCurrentId={setCurrentPopUp} />}
        <Navbar />
        <div className="bg-gray-200 mt-3 ">
            {/* up side */}
            <div className="w-full h-40 bg-black shadow-2xl z-40 ">
            <ReactTyped
                className="text-white font-semibold text-4xl block text-center pb-4 pt-4"
                strings={["Filtrer. Choisir. Reserver!"]}
                typeSpeed={40}
                backSpeed={50}
            />
            <div className="min-screen:w-[87%] min-screen:mx-auto mx-4 min-screen:h-fit rounded-[20px] bg-[#ff0366] m-auto shadow-xl flex flex-col justify-center items-center pb-8 pt-6 px-4 ">
                <form action="" className="w-full px-10 " onSubmit={handleFilter} method="POST">
                    <div className="flex min-screen:flex-row flex-col justify-between" >
                        <select name="categorie" onChange={handleChange} className="block min-screen:w-[25%] bg-white border border-gray-400 text-blue-700 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight ease-in-out duration-300 focus:outline-none focus:shadow-outline" id="">
                            <option value={-1}>Toutes les Categories</option>
                            <option value={0}>SUV</option>
                            <option value={1}>Cabriolets</option>
                            <option value={2}>Breaks</option>
                            <option value={3}>Berlines</option>
                            <option value={4}>Compacts</option>
                            <option value={5}>Crossovers</option>
                        </select>
                        <select name="marque" onChange={handleChange} className="block min-screen:w-[25%] min-screen:mt-0 mt-5 bg-white border border-gray-400 text-blue-700 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight ease-in-out duration-300 focus:outline-none focus:shadow-outline " id="" >
                            <option value={-1} >Toutes les marques</option>
                            <option value={0}>Audi</option>
                            <option value={1}>BMW</option>
                            <option value={2}>Mercedes</option>
                            <option value={3}>Subaru</option>
                            <option value={4}>Volvo</option>
                            <option value={5}>Mazda</option>
                            <option value={6}>Honda</option>
                            <option value={7}>Toyota</option>
                            <option value={8}>Volkswagen</option>
                            <option value={9}>Nissan</option>
                            <option value={10}>Ford</option>
                            <option value={11}>Renault</option>
                        </select>
                        <select name="nbrPassagers" onChange={handleChange} className="block min-screen:w-[25%] min-screen:mt-0 mt-5 bg-white border border-gray-400 text-blue-700 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight ease-in-out duration-300 focus:outline-none focus:shadow-outline" id="">
                            <option value={-1}  >Nombre de Passagers</option>
                            <option value={5}>1 à 5 Passagers</option>
                            <option value={6}>6 ou plus de Passagers</option>
                        </select>
                    </div>
                    <div className="flex min-screen:flex-row flex-col justify-between items-center " >
                        <select name="nbrValises" onChange={handleChange} className="block min-screen:w-[25%] w-[100%] h-fit min-screen:mt-3 mt-5 bg-white border border-gray-400 text-blue-700 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight ease-in-out duration-300 focus:outline-none focus:shadow-outline" id="">
                            <option value={-1}  >Nombre de Valises</option>
                            <option value={5}>1 à 5 Valises</option>
                            <option value={6}>6 ou plus de Valises</option>
                        </select>
                        <select name="prix" onChange={handleChange} className="block mt-5 min-screen:w-[25%] w-[100%] bg-white border border-gray-400 text-blue-700 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight ease-in-out duration-300 focus:outline-none focus:shadow-outline" >
                            <option value={-1}  >Prix</option>
                            <option value="asc">Prix Ascendent</option>
                            <option value="desc">Prix Descendent</option>
                        </select>
                        <input type="submit" value="Valider" name="" id=""  className="hover:cursor-pointer min-screen:w-[25%]  w-[50%] min-screen:mx-0 mx-auto bg-black border-white border text-white py-2 px-4 mt-4 rounded-md hover:bg-[#ff0366] transition duration-300" />
                    </div>
                </form>
            </div>
        </div>

            {/* Affichage de voitures */}
            <div className=" min-screen:mt-28 mt-96 max-w-[1090px] min-screen:mx-auto mx-4" >
                <h1 className={msg?.length === 0 ? "hidden" : "font-bold text-2xl"}>{msg}</h1>
                <div className="grid l-screen:grid-cols-3 border-t border-t-gray-400 pt-10 sm:grid-cols-2 grid-cols-1 gap-4" >
                    {/* loop on ids and send it to data */}
                    {
                        ids.map((carId) => (<Car key={carId} carId={carId} changeCurrent={setCurrentPopUp} />))
                    }

                </div>
            </div>
            
        </div>
    </div>
    );
};

export default FilterCars;
