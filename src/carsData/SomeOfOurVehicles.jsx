import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { GoArrowRight } from "react-icons/go";
import audiA4 from "./classes/berlines/audi/audiA4.jpg";
import audiA6 from "./classes/berlines/audi/audiA62.jpg";
import bmwSERIE3 from "./classes/berlines/BMW/bmwSERIE3.jpg";
import bmwSERIE5 from "./classes/berlines/BMW/bmwSERIE5.jpg";
import mercedesCLASSE_C from "./classes/berlines/mercedes/mercedesCLASSE_C.jpg";
import mercedesCLASSE_E from "./classes/berlines/mercedes/mercedesCLASSE_E.jpg";
import berlinesSIXTH from "./classes/berlines/berlinesSIXTH.jpg";

import fordESCAPE from "./classes/SUV/ford/fordESCAPE.jpg";
import fordEXPLORER from "./classes/SUV/ford/fordEXPLORER2.jpg";
import hondaCRV from "./classes/SUV/honda/hondaCRV.jpg";
import hondaPILOT from "./classes/SUV/honda/hondaPILOT2.jpg";
import toyotaHIGHLANDER from "./classes/SUV/toyota/toyotaHIGHLANDER.jpg";
import toyotaRAV4 from "./classes/SUV/toyota/toyotaRAV4.jpg";
import suvSIXTH from "./classes/SUV/suvSIXTH.jpg";

import audiA4_AVANT from "./classes/breaks/audi/audiA4_AVANT.jpg";
import audiA6_AVANT from "./classes/breaks/audi/audiA6_AVANT.jpg";
import subaruFORESTER from "./classes/breaks/subaru/subaruFORESTER.jpg";
import subaruOUTBACK from "./classes/breaks/subaru/subaruOUTBACK.jpg";
import volvoV60 from "./classes/breaks/volvo/volvoV60.jpg";
import volvoV90 from "./classes/breaks/volvo/volvoV90.jpg";
import breaksSIXTH from "./classes/breaks/breaksSIXTH.jpg";

import bmwSERIE4 from "./classes/cabriolets/BMW/bmwSERIE4.jpg";
import bmwSERIE8 from "./classes/cabriolets/BMW/bmwSERIE8.jpg";
import mazdaMX5_MIATA from "./classes/cabriolets/mazda/mazdaMX5_MIATA.jpg";
import mazdaMX5_RF from "./classes/cabriolets/mazda/mazdaMX5_RF.jpg";
import cabrioletSIXTH from "./classes/cabriolets/cabrioletSIXTH.jpg";

import hondaCIVIC from "./classes/compactes/honda/hondaCIVIC.jpg";
import hondaFIT from "./classes/compactes/honda/hondaFIT.jpg";
import toyotaCOROLLA from "./classes/compactes/toyota/toyotaCOROLLA.jpg";
import toyotaYARIS from "./classes/compactes/toyota/toyotaYARIS.jpg";
import volkswagenGOLF from "./classes/compactes/volkswagen/volkswagenGOLF.jpg";
import volkswagenJETTA from "./classes/compactes/volkswagen/volkswagenJETTA.jpg";
import compactesSIXTH from "./classes/compactes/compactSIXTH.jpg";

import mazdaCX5 from "./classes/crossovers/mazda/mazdaCX5.jpg";
import mazdaCX9 from "./classes/crossovers/mazda/mazdaCX9.jpg";
import crossover from "./classes/crossovers/crossoverSIXTH.jpg";

const SomeOfOurVehicles = () => {
    const [category, setCategory] = useState(2);

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
            once: true, // Only once animation
            mirror: false, // Whether elements should animate out while scrolling past them
        });
    }, []);

    const carsData = [
        [audiA4, audiA6, bmwSERIE3, bmwSERIE5, mercedesCLASSE_C, mercedesCLASSE_E, berlinesSIXTH],
        [suvSIXTH, hondaPILOT, hondaCRV, fordEXPLORER, toyotaHIGHLANDER, toyotaRAV4, fordESCAPE],
        [audiA4_AVANT, audiA6_AVANT, subaruFORESTER, subaruOUTBACK, volvoV60, volvoV90, breaksSIXTH],
        [bmwSERIE4, bmwSERIE8, mazdaMX5_MIATA, mazdaMX5_RF, mercedesCLASSE_C, mercedesCLASSE_E, cabrioletSIXTH],
        [hondaCIVIC, hondaFIT, toyotaCOROLLA, toyotaYARIS, volkswagenGOLF, volkswagenJETTA, compactesSIXTH],
        [mercedesCLASSE_E, mazdaCX9, bmwSERIE8, mercedesCLASSE_C, mazdaCX5, bmwSERIE4, crossover]
    ];

    return (
        <div className="mt-24 mb-24 max-w-[1100px] mx-auto p-4">
            <div className="flex flex-col items-center" data-aos="fade-up">
                <p className="md:text-[10px] text-gray-700">ONLY THE BEST CARS</p>
                <h1 className="text-5xl font-bold mb-6 mt-2" data-aos="fade-up">Our Vehicle Fleet</h1>
                <div className="flex flex-col items-center font-semibold" data-aos="fade-up">
                    <p>We provide our customers with the most incredible driving emotions.</p>
                    <p>That's why we have only world-class cars in our fleet.</p>
                </div>
            </div>

            <ul className="mx-auto mt-6 flex md:flex-row flex-col items-center l-screen:w-[50%] justify-between mb-4"  data-aos="fade-right">
                <li className={` md:w-[15%] w-[60%] md:mt-0 text-center rounded-xl hover:cursor-pointer ${category === 1 ? 'bg-black text-white' : 'bg-gray-200'}`} onClick={() => setCategory(1)}>SUV</li>
                <li className={` md:w-[15%] w-[60%] md:mt-0 mt-4 text-center rounded-xl hover:cursor-pointer ${category === 0 ? 'bg-black text-white' : 'bg-gray-200'}`} onClick={() => setCategory(0)}>Berlines</li>
                <li className={` md:w-[15%] w-[60%] md:mt-0 mt-4 text-center rounded-xl hover:cursor-pointer ${category === 5 ? 'bg-black text-white' : 'bg-gray-200'}`} onClick={() => setCategory(5)}>Crossover</li>
                <li className={` md:w-[15%] w-[60%] md:mt-0 mt-4 text-center rounded-xl hover:cursor-pointer ${category === 4 ? 'bg-black text-white' : 'bg-gray-200'}`} onClick={() => setCategory(4)}>Compact</li>
                <li className={` md:w-[15%] w-[60%] md:mt-0 mt-4 text-center rounded-xl hover:cursor-pointer ${category === 2 ? 'bg-black text-white' : 'bg-gray-200'}`} onClick={() => setCategory(2)}>Breaks</li>
                <li className={` md:w-[15%] w-[60%] md:mt-0 mt-4 text-center rounded-xl hover:cursor-pointer ${category === 3 ? 'bg-black text-white' : 'bg-gray-200'}`} onClick={() => setCategory(3)}>Cabriolets</li>
            </ul>

            <div className="w-[100%] h-[200px] mx-auto flex md:flex-row flex-col justify-between" data-aos="fade-up">
                <img src={carsData[category][0]} alt="" className="p-2 h-[190px] md:w-[31%] rounded-3xl" />
                <img src={carsData[category][4]} alt="" className="p-2 h-[190px] md:w-[31%] rounded-3xl" />
                <img src={carsData[category][3]} alt="" className="p-2 h-[190px] md:w-[31%] rounded-3xl" />
            </div>
            <div className="md:w-[80%] h-[120px] mx-auto flex md:flex-row flex-col justify-between md:mt-0 mt-[335px]" data-aos="fade-up">
                <img src={carsData[category][1]} alt="" className="p-2 md:h-[120px] h-[190px] md:w-[25%] rounded-3xl" />
                <img src={carsData[category][2]} alt="" className="p-2 md:h-[120px] h-[190px] md:w-[25%] rounded-3xl" />
                <img src={carsData[category][5]} alt="" className="p-2 md:h-[120px] h-[190px] md:w-[25%] rounded-3xl md:block hidden" />
                <img src={carsData[category][6]} alt="" className="p-2 md:h-[120px] h-[190px] md:w-[25%] rounded-3xl md:block hidden" />
            </div>
            <div className="flex items-center w-fit mx-auto hover:cursor-pointer md:mt-0 mt-64" data-aos="slide-right" >
                <a className="font-bold text-[16px]" href="http://localhost:3000/filter" >Voir toutes les voitures (+100)  </a>
                <GoArrowRight size={23} className="ml-2" />
            </div>
            
        </div>
    );
};

export default SomeOfOurVehicles;
