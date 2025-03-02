import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0" data-aos="fade-right">
            <div className="text-7xl font-bold mb-4 text-center text-gray-900 shadow-xl bg-white rounded-lg p-4">
              LocoAuto
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12" data-aos="fade-left">
            <h2 className="text-4xl font-bold mb-4">À propos de LocoAuto</h2>
            <p className="text-lg mb-4">
              Fondée en 2011, LocoAuto a révolutionné l'industrie de la location de voitures en apportant directement le véhicule loué au consommateur. Nous comprenons les tracas liés à la location d'une voiture et visons à simplifier le processus en privilégiant la commodité et la satisfaction client.
            </p>
            <p className="text-lg mb-4">
              Notre modèle de service unique garantit que vous n'avez pas besoin de vous rendre à notre siège. Au lieu de cela, nous livrons la voiture à votre porte, vous permettant de l'inspecter et de finaliser le paiement après réception. Cette approche reflète notre engagement envers la transparence et la confiance.
            </p>
            <p className="text-lg">
              Que vous voyagiez pour affaires ou pour le plaisir, LocoAuto offre une expérience de location sans heurts avec une flotte diversifiée de voitures de classe mondiale. Rejoignez des milliers de clients satisfaits qui ont choisi la commodité et la fiabilité avec LocoAuto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
