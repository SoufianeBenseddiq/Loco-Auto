import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import carLeft from "./carLeft.jpg";

const Landing = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div className="mt-16 px-4 max-w-[1100px] mx-auto">
            <img data-aos="slide-left" data-aos-delay="150" className="absolute min-screen:inline hidden l-screen:left-[330px] l-screen:top-[200px] xl-screen:left-[380px]  2xl-screen:left-[550px] 3xl-screen:left-[650px] " src={carLeft} alt="carLeft" /> 
            <h1 data-aos="fade-up" data-aos-delay="100" className="xl-screen:text-6xl text-[40px] font-bold leading-14 ">
                Meilleures Voitures <br/>à Louer Partout<br /> Au Maroc
            </h1>
            <p data-aos="fade-up" data-aos-delay="300" className="font-semibold mt-16 leading-6">
                ne vous privez pas du plaisir<br/>de conduire les meilleures voitures<br/>du monde ici au Maroc
            </p> 
        </div>
    );
}
export default Landing;
