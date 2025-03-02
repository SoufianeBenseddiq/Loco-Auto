import React from "react";
import Navbar from "../../layout/Navbar";
import Landing from "./Landing";
import Whyus from "./Whyus";
import Logosbar from "../../carsData/Logosbar";
import FAQ from "./FAQ";
import SomeOfOurVehicles from "../../carsData/SomeOfOurVehicles";
import Footer from "../../layout/Footer";

const Home=()=>{return(
    <>
        <Navbar/>
        <Landing/>
        <Logosbar/>
        <Whyus/>
        <FAQ/>
        <SomeOfOurVehicles/>
        <Footer/>
    </>
);}
export default Home;