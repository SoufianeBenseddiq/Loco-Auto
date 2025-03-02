import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import map from "../../carsData/map.jpg";
import car from "../../carsData/blackCar.png";

const Whyus = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div className="mt-24 mb-32 min-screen:flex min-screens:flex-col flex-row max-w-[1100px] mx-auto">
            <div className="flex">
                <img data-aos="fade-up" data-aos-delay="200" src={map} alt="" className="h-[400px]" />
                <img data-aos="fade-up" data-aos-delay="500" src={car} alt="" className="h-[220px] relative min:screens:right-[320px] right-[365px] top-[150px]" />
            </div>
            <div className="max-w-[600px] mx-auto text-center mt-8">
                <h2 className="text-3xl font-semibold mb-4" data-aos="fade-up" data-aos-delay="700">Pourquoi LocoAuto?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-100 rounded-lg shadow-2xl" data-aos="fade-up" data-aos-delay="900">
                        <h3 className="text-xl font-semibold mb-2">Réservation pratique</h3>
                        <p className="text-gray-700">Réservez facilement votre voiture de location en ligne, ce qui vous fera gagner du temps et vous évitera des tracas.</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-lg shadow-2xl" data-aos="fade-up" data-aos-delay="1000">
                        <h3 className="text-xl font-semibold mb-2">Large sélection</h3>
                        <p className="text-gray-700">Choisissez parmi une large gamme de véhicules adaptés à vos besoins et préférences.</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-lg shadow-2xl" data-aos="fade-up" data-aos-delay="1050">
                        <h3 className="text-xl font-semibold mb-2">Prix compétitifs</h3>
                        <p className="text-gray-700">Bénéficiez de prix compétitifs et d’une tarification transparente sans frais cachés.</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-lg shadow-2xl" data-aos="fade-up" data-aos-delay="1150">
                        <h3 className="text-xl font-semibold mb-2">Service excellent</h3>
                        <p className="text-gray-700">Bénéficiez d’un excellent service client et d’une assistance tout au long de votre expérience de location.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Whyus;
