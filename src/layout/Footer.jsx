import React from "react";
import logo from "./LocoAuto.png";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-4">
      <div className="container py-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:gap-8 text-left">
          {/* Logo et À Propos */}
          <div className="flex flex-col md:w-1/2 gap-8 md:pb-0 pb-8">
            <img src={logo} alt="logo du pied de page" className="w-40 md:w-60" />
            <p className="text-sm md:text-base">
              Louez votre voiture idéale avec LocoAuto. Découvrez notre gamme de véhicules pour chaque trajet.
            </p>
          </div>

          {/* Liens Rapides */}
          <div className="flex flex-col gap-4 md:pl-10">
            <p className="text-lg font-bold">Liens Rapides</p>
            <a href="http://localhost:3000/" className="text-gray-300 hover:text-white">
              Accueil
            </a>
            <a href="http://localhost:3000/about" className="text-gray-300 hover:text-white">
              À Propos de Nous
            </a>
            <a href="http://localhost:3000/filter" className="text-gray-300 hover:text-white">
              Véhicules
            </a>
            <a href="http://localhost:3000/contact" className="text-gray-300 hover:text-white">
              Contactez-nous
            </a>
          </div>

          {/* Informations de Contact */}
          <div className="flex flex-col gap-4 md:pl-10">
            <p className="text-lg font-bold">A propos</p>
            <p className="text-gray-300">zone industriel sidi ghanem N 11/1, Marrakesh 40000</p>
            <p className="text-gray-300">Marrakech, Maroc</p>
            <p className="text-gray-300">locoautosarl@gmail.com</p>
            <p className="text-gray-300">+212 6 84 71 16 37</p>
          </div>
        </div>

        {/* Mentions Légales et Réseaux Sociaux */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex justify-between items-center text-sm">
          <div>
            <p>&copy; {new Date().getFullYear()} LocoAuto. Tous droits réservés.</p>
          </div>
          <div className="flex gap-4">
            {/* <a href="#" className="text-gray-300 hover:text-white">
              Politique de Confidentialité
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Conditions d'Utilisation
            </a> */}
            {/* Ajouter des icônes de médias sociaux si nécessaire */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
