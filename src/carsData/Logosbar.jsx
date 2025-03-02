import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import kia from "./logos/kia.png";
import audi from "./logos/audi.png";
import peugeot from "./logos/peigeot.png";
import renault from "./logos/renault.png";
import volkswagen from "./logos/volkswagen.jpg";
import hyundai from "./logos/hyundai.png";
import bmw from "./logos/bmw.png";
import mercedes from "./logos/mercedes.png";

const Logosbar = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
            once: true, // Only animate once
        });
    }, []);

    return (
        <div className="flex flex-col min-screen:flex-row justify-between items-center mt-24  max-w-[1100px] mx-auto px-4">
            <div className="flex w-[100%] min-screen:w-[45%] justify-between" >
                <img data-aos="fade-up" title="Voitures Volkswagen" src={volkswagen} alt="volkswagen" className="h-[40px] hover:cursor-pointer" />
                <img data-aos="fade-up" data-aos-delay="100" title="Voitures BMW" src={bmw} alt="BMW" className="h-[40px]  hover:cursor-pointer" />
                <img data-aos="fade-up" data-aos-delay="200" title="Voitures Peugeot" src={peugeot} alt="peugeot" className="h-[40px] hover:cursor-pointer" />
                <img data-aos="fade-up" data-aos-delay="300" title="Voitures audi" src={audi} alt="audi" className="h-[40px]  hover:cursor-pointer" />
            </div>
            <div className="flex w-[100%] min-screen:w-[45%] justify-between min-screen:mt-0 mt-16">
                <img data-aos="fade-up" data-aos-delay="400" title="Voitures Mercedes" src={mercedes} alt="mercedes" className="h-[40px] hover:cursor-pointer" />
                <img data-aos="fade-up" data-aos-delay="500" title="Voitures Hyundai" src={hyundai} alt="hyundai" className="h-[40px] hover:cursor-pointer" />
                <img data-aos="fade-up" data-aos-delay="600" title="Voitures Renault" src={renault} alt="renault" className="h-[40px] hover:cursor-pointer" />
                <img data-aos="fade-up" data-aos-delay="700" title="Voitures Kia" src={kia} alt="kia" className="h-[40px] hover:cursor-pointer" />
            </div>
        </div>
    );
}

export default Logosbar;
