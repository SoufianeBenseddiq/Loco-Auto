-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 25, 2025 at 11:11 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `locoauto`
--

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS `InsertComments`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertComments` ()   BEGIN
    DECLARE car_id INT DEFAULT 1;
    DECLARE user_id INT;

    WHILE car_id <= 40 DO
        -- Randomly assign user IDs
        SET user_id = FLOOR(1 + (RAND() * 4)) * 2 - 1; -- Generates 1, 3, 4, or 5
        
        -- Insert three comments per car
        INSERT INTO `comments` (`comment`, `id_utilisateur`, `id_voiture`)
        VALUES
            (CONCAT('Excellent service for car ', car_id, '.'), user_id, car_id),
            (CONCAT('Good experience driving car ', car_id, '.'), user_id, car_id),
            (CONCAT('Car ', car_id, ' was very comfortable.'), user_id, car_id);
            
        SET car_id = car_id + 1;
    END WHILE;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id_cat` int DEFAULT NULL,
  `libelle_cat` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id_cat`, `libelle_cat`) VALUES
(0, 'suv'),
(1, 'cabriolets'),
(2, 'breaks'),
(3, 'berlines'),
(4, 'compacts'),
(5, 'crossovers');

-- --------------------------------------------------------

--
-- Table structure for table `chauffeur`
--

DROP TABLE IF EXISTS `chauffeur`;
CREATE TABLE IF NOT EXISTS `chauffeur` (
  `idChauff` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `cnie` varchar(20) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idChauff`),
  UNIQUE KEY `cnie` (`cnie`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `chauffeur`
--

INSERT INTO `chauffeur` (`idChauff`, `nom`, `prenom`, `cnie`, `telephone`, `created_at`, `updated_at`) VALUES
(1, 'El Khattabi', 'Mohammed', 'C12345678', '+212612345678', '2025-01-24 21:18:05', '2025-01-24 21:18:05'),
(2, 'El kadiri', 'Karim', 'EE98897', '066495774', '2025-01-24 21:18:54', '2025-01-24 21:18:54'),
(3, 'Karim', 'Adeymi', 'EE9556', '0632655887', '2025-01-24 21:22:21', '2025-01-24 21:22:21');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `id_utilisateur` int NOT NULL,
  `id_voiture` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_utilisateur` (`id_utilisateur`),
  KEY `id_voiture` (`id_voiture`)
) ENGINE=MyISAM AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `comment`, `id_utilisateur`, `id_voiture`) VALUES
(1, 'Excellent service, I had a great experience!', 1, 1),
(2, 'The car was clean and in good condition.', 3, 1),
(3, 'Very reliable and fuel-efficient.', 4, 1),
(4, 'Smooth ride, highly recommend!', 5, 2),
(5, 'Great value for the price.', 1, 2),
(6, 'I appreciated the fast service.', 4, 2),
(7, 'The car met all my expectations.', 3, 3),
(8, 'Good car for a family trip.', 5, 3),
(9, 'Very comfortable interior.', 4, 3),
(10, 'Spacious and easy to drive.', 1, 4),
(11, 'Affordable and reliable.', 3, 4),
(12, 'Loved the customer service!', 5, 4),
(13, 'Perfect for my business trip.', 4, 5),
(14, 'The car was in perfect condition.', 1, 5),
(15, 'Highly recommend this service.', 3, 5),
(16, 'Great handling and performance.', 5, 6),
(17, 'Fuel efficiency was impressive.', 4, 6),
(18, 'Comfortable and spacious interior.', 1, 6),
(19, 'Easy to drive and reliable.', 3, 7),
(20, 'The car exceeded my expectations.', 5, 7),
(21, 'Smooth ride, very enjoyable.', 4, 7),
(22, 'The car was perfect for my trip.', 1, 8),
(23, 'Excellent performance and handling.', 3, 8),
(24, 'Highly recommend this car.', 5, 8),
(25, 'Very reliable and affordable.', 4, 9),
(26, 'The service was top-notch.', 1, 9),
(27, 'Loved driving this car!', 3, 9),
(28, 'The car was in excellent condition.', 5, 10),
(29, 'Great car for long trips.', 4, 10),
(30, 'Very spacious and comfortable.', 1, 10),
(31, 'Excellent handling and fuel efficiency.', 3, 11),
(32, 'Great experience with this car.', 5, 11),
(33, 'Highly recommend this service.', 4, 11),
(34, 'Very smooth and reliable.', 1, 12),
(35, 'Good car for a family outing.', 3, 12),
(36, 'Affordable and clean.', 5, 12),
(37, 'Excellent car, very reliable.', 4, 13),
(38, 'Perfect for city trips.', 1, 13),
(39, 'Smooth ride and great comfort.', 3, 13),
(40, 'Loved the experience driving this car.', 5, 14),
(41, 'The car was in pristine condition.', 4, 14),
(42, 'Affordable and convenient.', 1, 14),
(43, 'Good performance and handling.', 3, 15),
(44, 'Very comfortable for long drives.', 5, 15),
(45, 'The service was excellent.', 4, 15),
(46, 'Loved the ride, very smooth.', 1, 16),
(47, 'Great car for short trips.', 3, 16),
(48, 'Highly recommend this service.', 5, 16),
(49, 'Excellent handling and comfort.', 4, 17),
(50, 'The car exceeded my expectations.', 1, 17),
(51, 'Very clean and well-maintained.', 3, 17),
(52, 'Perfect car for my trip.', 5, 18),
(53, 'Very affordable and reliable.', 4, 18),
(54, 'Smooth and enjoyable ride.', 1, 18),
(55, 'The car was great to drive.', 3, 19),
(56, 'Good value for the price.', 5, 19),
(57, 'Comfortable and efficient.', 4, 19),
(58, 'Excellent service and car quality.', 1, 20),
(59, 'Great experience overall.', 3, 20),
(60, 'Would definitely recommend!', 5, 20),
(61, 'Excellent service and performance.', 4, 21),
(62, 'Perfect car for my needs.', 1, 21),
(63, 'Very reliable and efficient.', 3, 21),
(64, 'Loved the car and the service.', 5, 22),
(65, 'The car was very comfortable.', 4, 22),
(66, 'Affordable and smooth ride.', 1, 22),
(67, 'Great car for city drives.', 3, 23),
(68, 'Very well-maintained and clean.', 5, 23),
(69, 'The car exceeded my expectations.', 4, 23),
(70, 'Smooth ride, highly recommend!', 1, 24),
(71, 'The service was exceptional.', 3, 24),
(72, 'Very affordable and reliable.', 5, 24),
(73, 'Perfect car for a weekend trip.', 4, 25),
(74, 'Great handling and comfort.', 1, 25),
(75, 'The car was in excellent condition.', 3, 25),
(76, 'Loved the experience with this car.', 5, 26),
(77, 'The car met all my expectations.', 4, 26),
(78, 'Very smooth and reliable.', 1, 26),
(79, 'Great car for long trips.', 3, 27),
(80, 'Highly recommend this service.', 5, 27),
(81, 'Excellent value for the price.', 4, 27),
(82, 'Loved the service and the car.', 1, 28),
(83, 'The car was very reliable.', 3, 28),
(84, 'Affordable and great quality.', 5, 28),
(85, 'Smooth ride, very comfortable.', 4, 29),
(86, 'Good car for a family trip.', 1, 29),
(87, 'Very reliable and clean.', 3, 29),
(88, 'Great experience with this car.', 5, 30),
(89, 'Perfect for city drives.', 4, 30),
(90, 'Would highly recommend this service.', 1, 30),
(91, 'Very comfortable and smooth.', 3, 31),
(92, 'The car was in great condition.', 5, 31),
(93, 'Loved driving this car!', 4, 31),
(94, 'Excellent handling and performance.', 1, 32),
(95, 'Good value for the price.', 3, 32),
(96, 'Would definitely use this service again.', 5, 32),
(97, 'Very clean and well-maintained.', 4, 33),
(98, 'Perfect car for a road trip.', 1, 33),
(99, 'Highly recommend this car.', 3, 33),
(100, 'The service was exceptional.', 5, 34),
(101, 'The car exceeded my expectations.', 4, 34),
(102, 'Affordable and reliable.', 1, 34),
(103, 'Great car for city trips.', 3, 35),
(104, 'Very smooth ride.', 5, 35),
(105, 'Comfortable and spacious.', 4, 35),
(106, 'Excellent car and service.', 1, 36),
(107, 'The car was in pristine condition.', 3, 36),
(108, 'Very reliable and efficient.', 5, 36),
(109, 'Good performance and handling.', 4, 37),
(110, 'Perfect for my business trip.', 1, 37),
(111, 'Would recommend this service.', 3, 37),
(112, 'Very reliable and clean.', 5, 38),
(113, 'Affordable and comfortable.', 4, 38),
(114, 'The car met all my expectations.', 1, 38),
(115, 'Great experience overall.', 3, 39),
(116, 'Very smooth and enjoyable ride.', 5, 39),
(117, 'Highly recommend this service.', 4, 39),
(118, 'Loved the service and the car.', 1, 40),
(119, 'The car was very clean.', 3, 40),
(120, 'Perfect for my trip.', 5, 40);

-- --------------------------------------------------------

--
-- Table structure for table `details_voitures`
--

DROP TABLE IF EXISTS `details_voitures`;
CREATE TABLE IF NOT EXISTS `details_voitures` (
  `id_detail` int NOT NULL AUTO_INCREMENT,
  `id_voiture` int DEFAULT NULL,
  `description` text NOT NULL,
  `nbr_passagers` int NOT NULL,
  `nbr_valises` int NOT NULL,
  `transmission` varchar(100) NOT NULL,
  `type_carburant` varchar(255) NOT NULL,
  `climatisation` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_detail`),
  KEY `id_voiture` (`id_voiture`)
) ENGINE=MyISAM AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `details_voitures`
--

INSERT INTO `details_voitures` (`id_detail`, `id_voiture`, `description`, `nbr_passagers`, `nbr_valises`, `transmission`, `type_carburant`, `climatisation`) VALUES
(1, 1, 'L\'Audi Q5 incarne le luxe et la polyvalence dans la catégorie des SUV premium. Avec son design élégant et ses performances impressionnantes, elle offre une conduite confortable sur route et une bonne capacité hors route. Son habitacle spacieux et bien équipé en fait un choix idéal pour les familles ou les aventuriers urbains.', 5, 4, 'Automatique', 'Essence', 1),
(2, 2, 'L\'Audi Q7 est un SUV de luxe offrant un mélange de confort, de performances et de technologie de pointe. Son design imposant est associé à un intérieur spacieux et luxueux, offrant un espace généreux pour les passagers et les bagages. Avec ses capacités hors route impressionnantes et ses nombreuses fonctionnalités de sécurité, l\'Audi Q7 est prête à affronter toutes les aventures.', 7, 5, 'Automatique', 'Essence', 1),
(3, 3, 'L\'Audi Q3 est un SUV compact offrant une conduite agile en ville et sur route. Avec son design moderne, son intérieur raffiné et ses nombreuses fonctionnalités technologiques, il offre un équilibre parfait entre style, confort et praticité. Idéal pour les petites familles ou les conducteurs à la recherche d\'un SUV urbain.', 5, 3, 'Automatique', 'Essence', 1),
(4, 4, 'Le BMW X5 est un SUV de luxe qui allie performances, confort et élégance. Doté d\'un design imposant et de lignes dynamiques, il se démarque sur la route. À l\'intérieur, le BMW X5 offre un habitacle spacieux et luxueux, avec des matériaux de haute qualité et une multitude de technologies embarquées. Sur le plan de la conduite, le X5 offre des performances impressionnantes grâce à ses moteurs puissants et sa tenue de route précise. Que ce soit pour une escapade en famille ou un voyage d\'affaires, le BMW X5 offre une expérience de conduite haut de gamme.', 5, 5, 'Automatique', 'Essence', 1),
(5, 5, 'Le BMW X3 est un SUV compact qui offre une expérience de conduite sportive et un intérieur luxueux. Avec son design élégant et ses lignes dynamiques, il attire les regards sur la route. L\'habitacle spacieux est doté de matériaux haut de gamme et de technologies de pointe, offrant confort et commodité à tous les occupants. Que ce soit pour les trajets quotidiens en ville ou les escapades le week-end, le BMW X3 est prêt à répondre à tous les besoins.', 5, 4, 'Automatique', 'Essence', 1),
(6, 6, 'Le BMW X1 est un SUV urbain qui associe praticité, confort et performances. Avec son design moderne et ses dimensions compactes, il est parfait pour naviguer en ville tout en offrant un intérieur spacieux et bien équipé. Les moteurs efficaces et la conduite agile font du BMW X1 un choix idéal pour les conducteurs urbains à la recherche d\'un SUV polyvalent.', 5, 3, 'Automatique', 'Essence', 1),
(7, 7, 'Le Mercedes-Benz GLE est un SUV de luxe qui allie performance, confort et style. Avec son design élégant et ses lignes fluides, il se démarque sur la route. L\'habitacle spacieux et bien aménagé offre un confort supérieur à tous les occupants. Les technologies de pointe et les caractéristiques de sécurité avancées font du GLE une option de choix pour les conducteurs exigeants.', 5, 5, 'Automatique', 'Essence', 1),
(8, 8, 'Le Mercedes-Benz GLC est un SUV compact qui allie performance et luxe. Son design moderne et ses lignes élégantes en font un véhicule attrayant. L\'intérieur spacieux et bien équipé offre confort et commodité à tous les passagers. Avec ses moteurs puissants et sa conduite agile, le GLC offre une expérience de conduite dynamique et agréable.', 5, 4, 'Automatique', 'Essence', 1),
(9, 9, 'Le Mercedes-Benz GLA est un SUV compact qui combine polyvalence, confort et style. Avec son design moderne et ses lignes sportives, il attire l\'attention sur la route. L\'intérieur spacieux et bien conçu offre un espace généreux pour les passagers et les bagages. Avec ses performances dynamiques et sa conduite agile, le GLA offre une expérience de conduite passionnante.', 5, 3, 'Automatique', 'Essence', 1),
(10, 10, 'Le Subaru Forester est un SUV polyvalent et robuste, parfait pour les aventures en plein air. Avec sa transmission intégrale et sa garde au sol élevée, il est prêt à affronter tous les types de terrains. L\'habitacle spacieux et bien conçu offre un confort supérieur, tandis que la réputation de fiabilité de Subaru en fait un choix sûr pour les conducteurs actifs.', 5, 4, 'Automatique', 'Essence', 1),
(11, 11, 'Le Subaru Outback est un crossover spacieux et polyvalent, idéal pour les familles actives et les aventuriers. Doté d\'une transmission intégrale et d\'une suspension robuste, il offre des performances hors route exceptionnelles. L\'habitacle confortable et bien équipé garantit un voyage agréable, que ce soit sur la route ou en dehors.', 5, 5, 'Automatique', 'Essence', 1),
(12, 12, 'Le Subaru Crosstrek est un SUV compact conçu pour les aventures en plein air. Avec sa transmission intégrale et sa garde au sol surélevée, il peut affronter les terrains les plus difficiles avec aisance. L\'intérieur spacieux et bien aménagé offre confort et commodité, tandis que la réputation de fiabilité de Subaru en fait un choix populaire parmi les conducteurs actifs.', 5, 3, 'Automatique', 'Essence', 1),
(13, 13, 'Le Volvo XC90 est un SUV de luxe offrant une expérience de conduite raffinée et confortable. Avec son design élégant et ses matériaux haut de gamme, il se distingue sur la route. L\'intérieur spacieux et bien équipé offre un confort supérieur à tous les passagers, tandis que les technologies de pointe et les fonctionnalités de sécurité avancées garantissent une conduite sûre et agréable.', 7, 5, 'Automatique', 'Essence', 1),
(14, 14, 'Le Volvo XC60 est un SUV de taille moyenne qui offre une combinaison parfaite de luxe, de confort et de performances. Avec son design élégant et son intérieur sophistiqué, il offre un voyage agréable à tous les occupants. Les moteurs puissants et la conduite douce font du XC60 un choix populaire parmi les conducteurs exigeants.', 5, 4, 'Automatique', 'Essence', 1),
(15, 15, 'Le Volvo XC40 est un SUV compact qui offre une expérience de conduite dynamique et confortable. Avec son design urbain et ses dimensions pratiques, il est idéal pour naviguer en ville. L\'intérieur bien aménagé offre confort et commodité à tous les passagers, tandis que les nombreuses fonctionnalités de sécurité en font un choix sûr pour les familles.', 5, 3, 'Automatique', 'Essence', 1),
(16, 16, 'Le Mazda CX-5 est un SUV compact qui offre une conduite dynamique et un intérieur raffiné. Avec son design élégant et ses lignes sportives, il se distingue sur la route. L\'habitacle spacieux et bien équipé offre un confort supérieur à tous les occupants, tandis que les technologies avancées garantissent une expérience de conduite agréable.', 5, 4, 'Automatique', 'Essence', 1),
(17, 17, 'Le Mazda CX-9 est un SUV familial spacieux et élégant, offrant confort et style. Avec son design dynamique et son intérieur haut de gamme, il offre une expérience de conduite premium. Les technologies avancées et les caractéristiques de sécurité en font un choix idéal pour les familles modernes.', 7, 5, 'Automatique', 'Essence', 1),
(18, 18, 'Le Mazda CX-30 est un SUV compact offrant une conduite agile et un intérieur luxueux. Avec son design moderne et ses finitions haut de gamme, il se distingue sur la route. L\'habitacle spacieux et bien aménagé offre confort et commodité à tous les occupants, tandis que les technologies avancées garantissent une expérience de conduite agréable.', 5, 3, 'Automatique', 'Essence', 1),
(19, 19, 'Le Honda CR-V est un SUV familial spacieux et polyvalent offrant un mélange parfait de confort et de praticité. Avec son design moderne et ses fonctionnalités innovantes, il est prêt à répondre à tous les besoins de transport. L\'habitacle bien aménagé offre un espace généreux pour les passagers et les bagages, tandis que les caractéristiques de sécurité avancées offrent une tranquillité d\'esprit supplémentaire.', 5, 4, 'Automatique', 'Essence', 1),
(20, 20, 'Le Honda Passport est un SUV robuste et polyvalent, idéal pour les aventuriers et les familles actives. Avec son design athlétique et son intérieur spacieux, il offre confort et commodité à tous les occupants. Les performances hors route exceptionnelles et les fonctionnalités de sécurité avancées en font un choix sûr pour toutes les escapades.', 5, 5, 'Automatique', 'Essence', 1),
(21, 21, 'Le Honda HR-V est un SUV compact et polyvalent conçu pour les trajets quotidiens en ville. Avec son design sportif et son habitacle bien aménagé, il offre un voyage confortable et pratique. Les performances économes en carburant et les fonctionnalités de sécurité avancées en font un choix populaire parmi les conducteurs urbains.', 5, 3, 'Automatique', 'Essence', 1),
(22, 22, 'Le Toyota RAV4 est un SUV polyvalent et fiable, parfait pour les aventures en famille ou les trajets quotidiens en ville. Avec son design robuste et son intérieur spacieux, il offre confort et commodité à tous les occupants. Les performances économes en carburant et la réputation de fiabilité de Toyota en font un choix populaire parmi les conducteurs.', 5, 4, 'Automatique', 'Essence', 1),
(23, 23, 'Le Toyota Highlander est un SUV familial spacieux et confortable offrant une conduite en douceur sur la route. Avec son intérieur bien aménagé et ses caractéristiques de sécurité avancées, il offre un espace généreux pour les passagers et les bagages. Les performances fiables et la réputation de qualité de Toyota en font un choix sûr pour les familles.', 7, 5, 'Automatique', 'Essence', 1),
(24, 24, 'Le Toyota 4Runner est un SUV tout-terrain robuste et fiable, parfait pour les aventures hors route. Avec son design musclé et sa transmission intégrale, il est prêt à affronter les terrains les plus difficiles. L\'intérieur spacieux et bien équipé offre confort et commodité à tous les occupants, faisant du 4Runner un choix idéal pour les amateurs de plein air.', 5, 5, 'Automatique', 'Essence', 1),
(25, 25, 'Le Volkswagen Tiguan est un SUV compact offrant confort, style et polyvalence. Avec son design moderne et ses fonctionnalités innovantes, il est parfait pour les aventures en ville et sur route. L\'habitacle spacieux et bien équipé offre confort et commodité à tous les passagers, tandis que les performances dynamiques garantissent une conduite agréable.', 5, 4, 'Automatique', 'Essence', 1),
(26, 26, 'Le Volkswagen Atlas est un SUV familial spacieux offrant confort et commodité à tous les occupants. Avec son design élégant et ses caractéristiques de sécurité avancées, il est parfait pour les longs voyages en famille. Les performances fiables et les technologies innovantes en font un choix sûr et pratique pour les conducteurs.', 7, 5, 'Automatique', 'Essence', 1),
(27, 27, 'Le Volkswagen Touareg est un SUV de luxe offrant une combinaison parfaite de performances, de confort et de style. Avec son design distinctif et son intérieur haut de gamme, il offre une expérience de conduite raffinée. Les caractéristiques de sécurité avancées et les technologies innovantes en font un choix premium pour les conducteurs exigeants.', 5, 5, 'Automatique', 'Essence', 1),
(28, 28, 'Le Nissan Rogue est un SUV polyvalent et économe en carburant, parfait pour les trajets quotidiens en ville. Avec son design moderne et ses fonctionnalités innovantes, il offre confort et commodité à tous les occupants. Les performances fiables et les caractéristiques de sécurité avancées en font un choix populaire parmi les conducteurs.', 5, 4, 'Automatique', 'Essence', 1),
(29, 29, 'Le Nissan Pathfinder est un SUV familial spacieux et polyvalent, idéal pour les aventures en famille. Avec son design robuste et son intérieur bien aménagé, il offre confort et commodité à tous les passagers. Les performances fiables et les caractéristiques de sécurité avancées en font un choix sûr et pratique pour les conducteurs.', 7, 5, 'Automatique', 'Essence', 1),
(30, 30, 'Le Ford Explorer est un SUV spacieux et robuste, idéal pour les familles nombreuses et les aventuriers. Avec son design imposant et son intérieur bien équipé, il offre confort et commodité à tous les passagers. Les performances fiables et les caractéristiques de sécurité avancées en font un choix populaire parmi les conducteurs.', 7, 5, 'Automatique', 'Essence', 1),
(31, 31, 'Le Ford Escape est un SUV compact et économe en carburant, parfait pour les trajets quotidiens en ville. Avec son design moderne et ses fonctionnalités innovantes, il offre confort et commodité à tous les occupants. Les performances économes en carburant et les caractéristiques de sécurité avancées en font un choix populaire parmi les conducteurs urbains.', 5, 4, 'Automatique', 'Essence', 1),
(32, 32, 'Le Ford Edge est un SUV élégant et performant offrant une conduite en douceur sur la route. Avec son design dynamique et son intérieur bien aménagé, il offre confort et style à tous les occupants. Les performances fiables et les caractéristiques de sécurité avancées en font un choix sûr et pratique pour les conducteurs.', 5, 4, 'Automatique', 'Essence', 1),
(33, 33, 'Le Renault Koleos est un SUV polyvalent et élégant, offrant confort et commodité à tous les occupants. Avec son design moderne et ses fonctionnalités innovantes, il est parfait pour les aventures en ville et sur route. L\'habitacle spacieux et bien équipé offre un espace généreux pour les passagers et les bagages.', 5, 4, 'Automatique', 'Essence', 1),
(34, 34, 'Le Renault Arkana est un SUV coupé élégant et sportif, offrant une conduite dynamique et un design distinctif. Avec son habitacle bien aménagé et ses fonctionnalités innovantes, il offre confort et style à tous les occupants. Les performances économes en carburant et les caractéristiques de sécurité avancées en font un choix populaire parmi les conducteurs urbains.', 5, 4, 'Automatique', 'Essence', 1),
(35, 35, 'Le Renault Kadjar est un SUV compact et polyvalent, idéal pour les aventures en ville et sur route. Avec son design moderne et ses fonctionnalités innovantes, il offre confort et commodité à tous les occupants. Les performances économes en carburant et les caractéristiques de sécurité avancées en font un choix populaire parmi les conducteurs urbains.', 5, 4, 'Automatique', 'Essence', 1),
(36, 36, 'L\'Audi A3 est une berline compacte offrant un mélange parfait de style, de performances et de confort. Avec son design élégant et son intérieur haut de gamme, elle offre une expérience de conduite raffinée. Les performances dynamiques et les caractéristiques de sécurité avancées en font un choix populaire parmi les conducteurs urbains.', 5, 3, 'Automatique', 'Essence', 1),
(37, 37, 'L\'Audi RS3 est une berline compacte de haute performance, conçue pour offrir une expérience de conduite sportive et dynamique. Avec son moteur puissant et son châssis sportif, elle offre des performances exceptionnelles sur route. L\'intérieur luxueux et les technologies avancées en font une voiture de sport haut de gamme.', 5, 3, 'Automatique', 'Essence', 1),
(38, 38, 'La BMW 1 Series est une berline compacte offrant une combinaison parfaite de performances et de confort. Avec son design dynamique et son intérieur bien aménagé, elle offre une expérience de conduite agréable. Les technologies innovantes et les caractéristiques de sécurité avancées en font un choix populaire parmi les conducteurs urbains.', 5, 3, 'Automatique', 'Essence', 1),
(39, 39, 'La BMW M2 est une berline compacte haute performance, conçue pour offrir une expérience de conduite sportive et excitante. Avec son moteur puissant et son châssis sportif, elle offre des performances exceptionnelles sur route et sur piste. L\'intérieur luxueux et les technologies avancées en font une voiture de sport premium.', 5, 3, 'Automatique', 'Essence', 1),
(40, 40, 'La Mercedes-Benz A-Class est une berline compacte offrant un mélange de luxe, de style et de technologie. Avec son design moderne et son intérieur haut de gamme, elle offre une expérience de conduite sophistiquée. Les performances dynamiques et les fonctionnalités avancées en font une voiture populaire parmi les conducteurs urbains.', 5, 3, 'Automatique', 'Essence', 1),
(41, 41, 'La Mercedes-Benz B-Class est une berline compacte polyvalente, offrant confort et commodité à tous les occupants. Avec son intérieur bien équipé et ses fonctionnalités innovantes, elle offre une expérience de conduite agréable. Les performances économes en carburant et les caractéristiques de sécurité avancées en font un choix populaire parmi les familles.', 5, 3, 'Automatique', 'Essence', 1),
(42, 42, 'La Mercedes-Benz CLA-Class est une berline compacte de luxe, offrant une combinaison parfaite de style et de performance. Avec son design dynamique et son intérieur haut de gamme, elle offre une expérience de conduite raffinée. Les performances sportives et les fonctionnalités avancées en font une voiture de sport élégante.', 5, 3, 'Automatique', 'Essence', 1),
(43, 43, 'La Subaru Impreza est une berline compacte dotée d\'une traction intégrale, offrant une conduite stable et sécurisée dans toutes les conditions météorologiques. Avec son habitacle spacieux et bien équipé, elle offre confort et commodité à tous les occupants. Les performances fiables et la réputation de durabilité en font un choix populaire parmi les conducteurs.', 5, 3, 'Automatique', 'Essence', 1),
(44, 44, 'La Subaru WRX est une berline compacte sportive, offrant des performances excitantes et un style distinctif. Avec son moteur turbo et son châssis sportif, elle offre une expérience de conduite dynamique. L\'intérieur bien équipé et les caractéristiques de sécurité avancées en font une voiture de sport polyvalente.', 5, 3, 'Manuelle', 'Essence', 1),
(45, 45, 'La Volvo S60 est une berline compacte de luxe, offrant un mélange parfait de confort et de performances. Avec son design élégant et son intérieur raffiné, elle offre une expérience de conduite haut de gamme. Les technologies innovantes et les caractéristiques de sécurité avancées en font un choix populaire parmi les conducteurs exigeants.', 5, 3, 'Automatique', 'Essence', 1),
(46, 46, 'La Volvo V60 est une berline compacte polyvalente, offrant confort et commodité à tous les occupants. Avec son habitacle spacieux et bien équipé, elle est idéale pour les voyages en famille ou les trajets quotidiens en ville. Les performances économes en carburant et les caractéristiques de sécurité avancées en font un choix populaire parmi les conducteurs.', 5, 3, 'Automatique', 'Essence', 1),
(47, 47, 'La Volvo V40 Cross Country est une berline compacte robuste, offrant des performances fiables sur route et hors route. Avec son design tout-terrain et son habitacle bien équipé, elle est prête à affronter toutes les aventures. Les caractéristiques de sécurité avancées et la réputation de durabilité en font un choix populaire parmi les conducteurs actifs.', 5, 3, 'Automatique', 'Essence', 1),
(48, 48, 'La Mazda3 est une berline compacte offrant un équilibre parfait entre performances, style et efficacité énergétique. Avec son design élégant et son intérieur bien aménagé, elle offre une expérience de conduite agréable. Les technologies avancées et les caractéristiques de sécurité en font un choix populaire parmi les conducteurs urbains.', 5, 3, 'Automatique', 'Essence', 1),
(49, 49, 'La Mazda2 est une berline compacte économique, offrant des performances fiables et une conduite confortable. Avec son design moderne et son habitacle bien équipé, elle est idéale pour les déplacements urbains. Les caractéristiques de sécurité avancées et la réputation de fiabilité en font un choix populaire parmi les conducteurs.', 5, 3, 'Manuelle', 'Essence', 1),
(50, 50, 'La Honda Civic est une berline compacte réputée pour sa fiabilité et son efficacité énergétique. Avec son design sportif et son habitacle bien équipé, elle offre une conduite confortable et agréable. Les technologies avancées et les caractéristiques de sécurité en font un choix populaire parmi les conducteurs urbains.', 5, 3, 'Automatique', 'Essence', 1),
(51, 51, 'La Honda Fit est une petite berline compacte, offrant polyvalence et efficacité énergétique. Avec son intérieur spacieux et ses sièges Magic Flex, elle offre une grande capacité de chargement et une configuration flexible. Les performances économes en carburant et la réputation de fiabilité en font un choix populaire parmi les conducteurs urbains.', 5, 3, 'Automatique', 'Essence', 1),
(52, 52, 'La Toyota Corolla est une berline compacte légendaire, réputée pour sa fiabilité et son efficacité énergétique. Avec son design moderne et son habitacle bien équipé, elle offre une expérience de conduite confortable et agréable. Les caractéristiques de sécurité avancées et la réputation de durabilité en font un choix populaire parmi les conducteurs.', 5, 3, 'Automatique', 'Essence', 1),
(53, 53, 'La Toyota Yaris est une petite berline compacte, offrant un équilibre parfait entre performances, confort et économie de carburant. Avec son design élégant et son habitacle bien aménagé, elle est idéale pour les déplacements urbains. Les caractéristiques de sécurité avancées et la réputation de fiabilité en font un choix populaire parmi les conducteurs.', 5, 3, 'Automatique', 'Essence', 1),
(54, 54, 'La Volkswagen Golf est une berline compacte polyvalente, offrant confort, performance et efficacité énergétique. Avec son design intemporel et son habitacle bien équipé, elle offre une expérience de conduite agréable et pratique. Les technologies avancées et les caractéristiques de sécurité en font un choix populaire parmi les conducteurs urbains.', 5, 3, 'Automatique', 'Essence', 1),
(55, 55, 'La Volkswagen Polo est une petite berline compacte, offrant un mélange parfait de performance, d\'économie de carburant et de confort. Avec son design moderne et son habitacle bien équipé, elle est idéale pour les déplacements urbains. Les caractéristiques de sécurité avancées et la réputation de fiabilité en font un choix populaire parmi les conducteurs.', 5, 3, 'Automatique', 'Essence', 1),
(56, 56, 'La Nissan Sentra est une berline compacte réputée pour sa fiabilité et son économie de carburant. Avec son design moderne et son habitacle bien aménagé, elle offre une expérience de conduite confortable et agréable. Les technologies avancées et les caractéristiques de sécurité en font un choix populaire parmi les conducteurs urbains.', 5, 3, 'Automatique', 'Essence', 1),
(57, 57, 'La Nissan Versa est une petite berline compacte, offrant un excellent rapport qualité-prix et une économie de carburant exceptionnelle. Avec son design moderne et son habitacle bien équipé, elle est idéale pour les déplacements quotidiens en ville. Les caractéristiques de sécurité avancées et la réputation de fiabilité en font un choix populaire parmi les conducteurs.', 5, 3, 'Automatique', 'Essence', 1),
(58, 58, 'La Ford Focus est une berline compacte polyvalente, offrant un équilibre parfait entre performance, confort et économie de carburant. Avec son design moderne et son habitacle bien équipé, elle offre une expérience de conduite agréable et pratique. Les technologies avancées et les caractéristiques de sécurité en font un choix populaire parmi les conducteurs urbains.', 5, 3, 'Automatique', 'Essence', 1),
(59, 59, 'La Ford Fiesta est une petite berline compacte, offrant agilité, efficacité énergétique et style distinctif. Avec son design moderne et son habitacle bien équipé, elle est idéale pour les déplacements urbains. Les caractéristiques de sécurité avancées et la réputation de fiabilité en font un choix populaire parmi les conducteurs.', 5, 3, 'Automatique', 'Essence', 1),
(60, 60, 'La Renault Clio est une petite berline compacte, offrant confort, économie de carburant et style européen distinctif. Avec son design moderne et son habitacle bien équipé, elle est idéale pour les déplacements quotidiens en ville. Les caractéristiques de sécurité avancées et la réputation de fiabilité en font un choix populaire parmi les conducteurs.', 5, 3, 'Automatique', 'Essence', 1),
(61, 61, 'La Renault Megane est une berline compacte polyvalente, offrant confort, style et performance. Avec son design moderne et son habitacle bien équipé, elle offre une expérience de conduite agréable et pratique. Les caractéristiques de sécurité avancées et la réputation de fiabilité en font un choix populaire parmi les conducteurs.', 5, 3, 'Automatique', 'Essence', 1),
(62, 62, 'L\'Audi A3 Cabriolet est une voiture décapotable élégante et sportive, offrant un mélange parfait de performance et de style. Avec son toit rétractable et son intérieur raffiné, elle offre une expérience de conduite unique. Les technologies avancées et les caractéristiques de sécurité en font un choix populaire parmi les conducteurs à la recherche de sensations fortes.', 4, 2, 'Automatique', 'Essence', 1),
(63, 63, 'L\'Audi A5 Cabriolet est une voiture décapotable de luxe, offrant des performances impressionnantes et un design saisissant. Avec son toit rétractable en toile et son intérieur sophistiqué, elle offre une expérience de conduite élégante et raffinée. Les technologies innovantes et les caractéristiques de sécurité avancées en font une voiture de choix pour ceux qui recherchent le plaisir de conduire.', 4, 2, 'Automatique', 'Essence', 1),
(64, 64, 'La BMW 2 Series Convertible est une voiture décapotable compacte, offrant une expérience de conduite dynamique et un design élégant. Avec son toit rétractable en toile et son intérieur haut de gamme, elle offre un mélange de performances sportives et de confort. Les technologies avancées et les caractéristiques de sécurité en font une voiture de choix pour les amateurs de conduite.', 4, 2, 'Automatique', 'Essence', 1),
(65, 65, 'La BMW 4 Series Convertible est une voiture décapotable haut de gamme, offrant des performances exceptionnelles et un design remarquable. Avec son toit rigide rétractable et son intérieur luxueux, elle offre une expérience de conduite incomparable. Les technologies de pointe et les caractéristiques de sécurité avancées en font une voiture de choix pour ceux qui recherchent le meilleur de l\'automobile.', 4, 2, 'Automatique', 'Essence', 1),
(66, 66, 'La Mercedes-Benz C-Class Cabriolet est une voiture décapotable de luxe, offrant des performances exceptionnelles et un confort haut de gamme. Avec son toit rétractable en toile et son intérieur sophistiqué, elle offre une expérience de conduite élégante et raffinée. Les technologies avancées et les caractéristiques de sécurité en font une voiture de choix pour les connaisseurs.', 4, 2, 'Automatique', 'Essence', 1),
(67, 67, 'La Mercedes-Benz CLE Cabriolet est une voiture décapotable de luxe, offrant une combinaison parfaite de performances haut de gamme et de sophistication. Avec son toit rigide rétractable et son intérieur luxueux, elle offre une expérience de conduite exceptionnelle. Les technologies de pointe et les caractéristiques de sécurité avancées en font une voiture de choix pour les amateurs de grand tourisme.', 4, 2, 'Automatique', 'Essence', 1),
(68, 68, 'La Volkswagen Golf Cabriolet est une voiture décapotable compacte, offrant un design sportif et une conduite agréable. Avec son toit rétractable en toile et son intérieur bien équipé, elle offre une expérience de conduite dynamique et confortable. Les caractéristiques de sécurité avancées et la réputation de fiabilité en font un choix populaire parmi les conducteurs urbains.', 4, 2, 'Automatique', 'Essence', 1),
(69, 69, 'Le Volkswagen T-Roc Cabriolet est un SUV décapotable, offrant un design moderne et des performances impressionnantes. Avec son toit rétractable en toile et son habitacle bien équipé, il offre une expérience de conduite unique et polyvalente. Les caractéristiques de sécurité avancées et la technologie de pointe en font un choix populaire parmi les conducteurs à la recherche d\'aventure.', 4, 2, 'Automatique', 'Essence', 1),
(70, 70, 'L\'Audi Q2 est un crossover compact, offrant une conduite dynamique et un design distinctif. Avec son habitacle bien équipé et ses technologies avancées, il offre une expérience de conduite confortable et pratique. Les caractéristiques de sécurité avancées et la réputation de fiabilité en font un choix populaire parmi les conducteurs urbains.', 5, 3, 'Automatique', 'Essence', 1),
(71, 71, 'L\'Audi Q3 Sportback est un crossover dynamique et élégant, offrant des performances impressionnantes et un design distinctif. Avec son habitacle spacieux et ses technologies innovantes, il offre une expérience de conduite haut de gamme. Les caractéristiques de sécurité avancées et la réputation de fiabilité en font un choix populaire parmi les conducteurs à la recherche de polyvalence.', 5, 3, 'Automatique', 'Essence', 1),
(72, 72, 'L\'Audi Q4 e-tron est un crossover électrique de luxe, offrant des performances écologiques et un design moderne. Avec son habitacle haut de gamme et ses technologies innovantes, il offre une expérience de conduite premium. Les caractéristiques de sécurité avancées et la connectivité avancée en font un choix populaire parmi les conducteurs soucieux de l\'environnement.', 5, 3, 'Automatique', 'Électrique', 1),
(73, 73, 'Le BMW X4 est un crossover sportif et élégant, offrant des performances exceptionnelles et un design dynamique. Avec son habitacle raffiné et ses technologies innovantes, il offre une expérience de conduite haut de gamme. Les caractéristiques de sécurité avancées et la polyvalence en font un choix populaire parmi les conducteurs urbains et les amateurs d\'aventure.', 5, 3, 'Automatique', 'Essence', 1),
(74, 74, 'Le BMW X6 est un crossover de luxe, offrant des performances haut de gamme et un design imposant. Avec son habitacle luxueux et ses technologies avancées, il offre une expérience de conduite exceptionnelle. Les caractéristiques de sécurité avancées et le confort supérieur en font un choix populaire parmi les conducteurs exigeants.', 5, 3, 'Automatique', 'Essence', 1),
(75, 75, 'Le Mercedes-Benz GLC Coupe est un crossover coupé de luxe, offrant des performances impressionnantes et un design élégant. Avec son habitacle haut de gamme et ses technologies innovantes, il offre une expérience de conduite premium. Les caractéristiques de sécurité avancées et le confort supérieur en font un choix populaire parmi les conducteurs exigeants.', 5, 3, 'Automatique', 'Essence', 1),
(76, 76, 'Le Mercedes-Benz GLE Coupe est un crossover coupé de luxe, offrant des performances exceptionnelles et un design imposant. Avec son habitacle luxueux et ses technologies avancées, il offre une expérience de conduite haut de gamme. Les caractéristiques de sécurité avancées et le confort supérieur en font un choix populaire parmi les conducteurs exigeants.', 5, 3, 'Automatique', 'Essence', 1),
(77, 77, 'La Volvo XC60 Recharge est un crossover hybride rechargeable, offrant des performances écologiques et un design scandinave distinctif. Avec son habitacle luxueux et ses technologies avancées, elle offre une expérience de conduite haut de gamme. Les caractéristiques de sécurité avancées et le confort supérieur en font un choix populaire parmi les conducteurs soucieux de l\'environnement.', 5, 3, 'Automatique', 'Hybride rechargeable', 1),
(78, 78, 'La Volvo XC90 Recharge est un crossover de luxe hybride rechargeable, offrant des performances exceptionnelles et un design scandinave élégant. Avec son habitacle haut de gamme et ses technologies innovantes, elle offre une expérience de conduite premium. Les caractéristiques de sécurité avancées et le confort supérieur en font un choix populaire parmi les conducteurs exigeants.', 7, 4, 'Automatique', 'Hybride rechargeable', 1),
(79, 79, 'L\'Audi A6 allroad est une break de luxe, offrant des performances exceptionnelles et une polyvalence remarquable. Avec son habitacle spacieux et ses technologies avancées, elle offre une expérience de conduite premium. Les caractéristiques de sécurité avancées et le confort supérieur en font un choix populaire parmi les conducteurs exigeants.', 5, 5, 'Automatique', 'Essence', 1),
(80, 80, 'L\'Audi RS4 Avant est une break de sport de luxe, offrant des performances exceptionnelles et un design dynamique. Avec son habitacle haut de gamme et ses technologies avancées, elle offre une expérience de conduite haut de gamme. Les caractéristiques de sécurité avancées et les finitions sportives en font un choix populaire parmi les amateurs de conduite sportive.', 5, 5, 'Automatique', 'Essence', 1),
(81, 81, 'La BMW 3 Series Touring est une break sportive de luxe, offrant des performances dynamiques et un design élégant. Avec son habitacle raffiné et ses technologies innovantes, elle offre une expérience de conduite haut de gamme. Les caractéristiques de sécurité avancées et la polyvalence en font un choix populaire parmi les conducteurs exigeants.', 5, 5, 'Automatique', 'Essence', 1),
(82, 82, 'La BMW 6 Series Gran Turismo est une break de luxe, offrant des performances exceptionnelles et un design sophistiqué. Avec son habitacle luxueux et ses technologies avancées, elle offre une expérience de conduite premium. Les caractéristiques de sécurité avancées et le confort supérieur en font un choix populaire parmi les conducteurs exigeants.', 5, 5, 'Automatique', 'Essence', 1),
(83, 83, 'La Mercedes-Benz E-Class Estate est une break de luxe, offrant des performances haut de gamme et un design élégant. Avec son habitacle spacieux et ses technologies avancées, elle offre une expérience de conduite premium. Les caractéristiques de sécurité avancées et le confort supérieur en font un choix populaire parmi les conducteurs exigeants.', 5, 5, 'Automatique', 'Essence', 1),
(84, 84, 'La Mercedes-Benz E-Class All-Terrain est une break tout-terrain de luxe, offrant des performances exceptionnelles sur route et hors route. Avec son habitacle haut de gamme et ses technologies avancées, elle offre une expérience de conduite polyvalente. Les caractéristiques de sécurité avancées et la capacité tout-terrain en font un choix populaire parmi les conducteurs aventuriers.', 5, 5, 'Automatique', 'Essence', 1),
(85, 85, 'La Volvo V90 Cross Country est une break tout-terrain de luxe, offrant des performances robustes et un design audacieux. Avec son habitacle spacieux et ses technologies innovantes, elle offre une expérience de conduite premium. Les caractéristiques de sécurité avancées et la capacité tout-terrain en font un choix populaire parmi les conducteurs aventuriers.', 5, 5, 'Automatique', 'Essence', 1),
(86, 86, 'La Volvo V60 Polestar Engineered est une break de luxe haute performance, offrant des performances exceptionnelles et un design dynamique. Avec son habitacle haut de gamme et ses technologies avancées, elle offre une expérience de conduite sportive de haut niveau. Les caractéristiques de sécurité avancées et les performances exceptionnelles en font un choix populaire parmi les amateurs de conduite sportive.', 5, 5, 'Automatique', 'Essence', 1),
(87, 87, 'L\'Audi A3 est une berline compacte de luxe, offrant des performances dynamiques et un design élégant. Avec son habitacle raffiné et ses technologies innovantes, elle offre une expérience de conduite premium. Les caractéristiques de sécurité avancées et le confort supérieur en font un choix populaire parmi les conducteurs exigeants.', 5, 3, 'Automatique', 'Essence', 1),
(88, 88, 'L\'Audi A4 est une berline de luxe, offrant des performances équilibrées et un design sophistiqué. Avec son habitacle haut de gamme et ses technologies avancées, elle offre une expérience de conduite premium. Les caractéristiques de sécurité avancées et le confort supérieur en font un choix populaire parmi les conducteurs exigeants.', 5, 3, 'Automatique', 'Essence', 1),
(89, 89, 'La BMW 1 Series est une berline compacte de luxe, offrant des performances dynamiques et un design élégant. Avec son habitacle raffiné et ses technologies innovantes, elle offre une expérience de conduite premium. Les caractéristiques de sécurité avancées et le confort supérieur en font un choix populaire parmi les conducteurs exigeants.', 5, 3, 'Automatique', 'Essence', 1),
(90, 90, 'La BMW 7 Series est une berline de luxe, offrant des performances haut de gamme et un design sophistiqué. Avec son habitacle luxueux et ses technologies avancées, elle offre une expérience de conduite premium. Les caractéristiques de sécurité avancées et le confort supérieur en font un choix populaire parmi les conducteurs exigeants.', 5, 3, 'Automatique', 'Essence', 1),
(91, 91, 'La Mercedes-Benz C-Class est une berline de luxe, offrant des performances équilibrées et un design élégant. Avec son habitacle haut de gamme et ses technologies avancées, elle offre une expérience de conduite premium. Les caractéristiques de sécurité avancées et le confort supérieur en font un choix populaire parmi les conducteurs exigeants.', 5, 3, 'Automatique', 'Essence', 1),
(92, 92, 'La Mercedes-Benz S-Class est une berline de luxe, offrant des performances haut de gamme et un design époustouflant. Avec son habitacle luxueux et ses technologies de pointe, elle offre une expérience de conduite exceptionnelle. Les caractéristiques de sécurité avancées et le confort supérieur en font une référence dans le segment des berlines de luxe.', 5, 3, 'Automatique', 'Essence', 1),
(93, 93, 'La Volvo S60 est une berline de luxe, offrant des performances équilibrées et un design élégant. Avec son habitacle haut de gamme et ses technologies avancées, elle offre une expérience de conduite premium. Les caractéristiques de sécurité avancées et le confort supérieur en font un choix populaire parmi les conducteurs exigeants.', 5, 3, 'Automatique', 'Essence', 1),
(94, 94, 'La Honda Civic est une berline compacte fiable, offrant des performances équilibrées et un design moderne. Avec son habitacle confortable et ses fonctionnalités pratiques, elle offre une expérience de conduite agréable. Les caractéristiques de sécurité avancées et la réputation de fiabilité en font un choix populaire parmi les conducteurs.', 5, 3, 'Automatique', 'Essence', 1),
(95, 95, 'La Honda Legend est une berline de luxe haut de gamme, offrant des performances exceptionnelles et un design impressionnant. Avec son habitacle luxueux et ses technologies de pointe, elle offre une expérience de conduite premium. Les caractéristiques de sécurité avancées et le confort supérieur en font un choix exclusif parmi les connaisseurs.', 5, 3, 'Automatique', 'Essence', 1),
(96, 96, 'La Toyota Corolla est une berline compacte fiable, offrant des performances équilibrées et une conduite confortable. Avec son habitacle spacieux et ses fonctionnalités pratiques, elle offre une expérience de conduite agréable au quotidien. Les caractéristiques de sécurité avancées et la réputation de fiabilité en font un choix populaire parmi les conducteurs.', 5, 3, 'Automatique', 'Essence', 1),
(97, 97, 'La Toyota Mirai est une berline à hydrogène révolutionnaire, offrant des performances respectueuses de l\'environnement et une conduite confortable. Avec son habitacle moderne et ses technologies innovantes, elle offre une expérience de conduite unique. Les caractéristiques de sécurité avancées et l\'engagement envers la durabilité en font un choix exclusif parmi les conducteurs soucieux de l\'environnement.', 5, 3, 'Automatique', 'Hydrogène', 1),
(98, 98, 'La Volkswagen Jetta est une berline compacte polyvalente, offrant des performances équilibrées et un design élégant. Avec son habitacle confortable et ses fonctionnalités pratiques, elle offre une expérience de conduite agréable au quotidien. Les caractéristiques de sécurité avancées et la réputation de fiabilité en font un choix populaire parmi les conducteurs.', 5, 3, 'Automatique', 'Essence', 1),
(99, 99, 'La Volkswagen Passat est une berline familiale polyvalente, offrant des performances confortables et un design élégant. Avec son habitacle spacieux et ses fonctionnalités innovantes, elle offre une expérience de conduite agréable pour les trajets longue distance. Les caractéristiques de sécurité avancées et le confort supérieur en font un choix populaire parmi les familles.', 5, 3, 'Automatique', 'Essence', 1),
(100, 100, 'La Nissan Sentra est une berline compacte fiable, offrant des performances équilibrées et un design moderne. Avec son habitacle spacieux et ses fonctionnalités pratiques, elle offre une expérience de conduite agréable au quotidien. Les caractéristiques de sécurité avancées et la réputation de fiabilité en font un choix populaire parmi les conducteurs.', 5, 3, 'Automatique', 'Essence', 1),
(101, 101, 'La Nissan Altima est une berline intermédiaire polyvalente, offrant des performances équilibrées et un design élégant. Avec son habitacle spacieux et ses fonctionnalités pratiques, elle offre une expérience de conduite confortable pour les trajets quotidiens. Les caractéristiques de sécurité avancées et la réputation de fiabilité en font un choix populaire parmi les conducteurs.', 5, 3, 'Automatique', 'Essence', 1),
(102, 102, 'La Ford Focus est une berline compacte fiable, offrant des performances équilibrées et un design moderne. Avec son habitacle spacieux et ses fonctionnalités pratiques, elle offre une expérience de conduite agréable au quotidien. Les caractéristiques de sécurité avancées et la réputation de fiabilité en font un choix populaire parmi les conducteurs.', 5, 3, 'Automatique', 'Essence', 1),
(103, 103, 'La Ford Fusion est une berline intermédiaire polyvalente, offrant des performances équilibrées et un design élégant. Avec son habitacle spacieux et ses fonctionnalités pratiques, elle offre une expérience de conduite confortable pour les trajets longue distance. Les caractéristiques de sécurité avancées et la réputation de fiabilité en font un choix populaire parmi les conducteurs.', 5, 3, 'Automatique', 'Essence', 1),
(104, 104, 'La Renault Megane est une berline compacte polyvalente, offrant des performances équilibrées et un design moderne. Avec son habitacle spacieux et ses fonctionnalités pratiques, elle offre une expérience de conduite agréable au quotidien. Les caractéristiques de sécurité avancées et la réputation de fiabilité en font un choix populaire parmi les conducteurs.', 5, 3, 'Automatique', 'Essence', 1),
(105, 105, 'La Renault Fluence est une berline familiale polyvalente, offrant des performances confortables et un design élégant. Avec son habitacle spacieux et ses fonctionnalités pratiques, elle offre une expérience de conduite agréable pour les trajets longue distance. Les caractéristiques de sécurité avancées et la réputation de fiabilité en font un choix populaire parmi les familles.', 5, 3, 'Automatique', 'Essence', 1),
(106, 106, 'La Renault Latitude est une berline haut de gamme, offrant des performances dynamiques et un design élégant. Avec son habitacle luxueux et ses fonctionnalités haut de gamme, elle offre une expérience de conduite premium. Les caractéristiques de sécurité avancées et le confort supérieur en font un choix exclusif parmi les conducteurs exigeants.', 5, 3, 'Automatique', 'Essence', 1);

-- --------------------------------------------------------

--
-- Table structure for table `marques`
--

DROP TABLE IF EXISTS `marques`;
CREATE TABLE IF NOT EXISTS `marques` (
  `id_marque` int NOT NULL,
  `libelle_marque` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_marque`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `marques`
--

INSERT INTO `marques` (`id_marque`, `libelle_marque`) VALUES
(0, 'audi'),
(1, 'bmw'),
(2, 'mercedes'),
(3, 'subaru'),
(4, 'volvo'),
(5, 'mazda'),
(6, 'honda'),
(7, 'toyota'),
(8, 'volkswagen'),
(9, 'nissan'),
(10, 'toyota');

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
CREATE TABLE IF NOT EXISTS `reservation` (
  `id_reservation` int NOT NULL AUTO_INCREMENT,
  `depart` varchar(100) DEFAULT NULL,
  `arrive` varchar(100) DEFAULT NULL,
  `dateDebut` date DEFAULT NULL,
  `dateFin` date DEFAULT NULL,
  `montantTotal` decimal(10,2) DEFAULT NULL,
  `cnie` varchar(255) DEFAULT NULL,
  `NoPermis` varchar(255) DEFAULT NULL,
  `id_utilisateur` int DEFAULT NULL,
  `id_voiture` int DEFAULT NULL,
  `confirme` tinyint(1) DEFAULT '0',
  `idChauff` int DEFAULT NULL,
  PRIMARY KEY (`id_reservation`),
  KEY `id_utilisateur` (`id_utilisateur`),
  KEY `id_voiture` (`id_voiture`),
  KEY `fk_reservation_chauffeur` (`idChauff`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`id_reservation`, `depart`, `arrive`, `dateDebut`, `dateFin`, `montantTotal`, `cnie`, `NoPermis`, `id_utilisateur`, `id_voiture`, `confirme`, `idChauff`) VALUES
(2, 'Marrakech, Mhamid 9', 'Rabat, Agdal', '2025-01-17', '2025-01-20', 640.00, 'uploads/2_cnie.pdf', 'uploads/2_permis.pdf', 1, 1, 0, NULL),
(3, 'Marrakech, Medina', 'safi', '2025-02-10', '2025-02-13', 560.00, 'uploads/3_cnie.pdf', 'uploads/3_permis.pdf', 1, 6, 1, 1),
(4, 'Agadir', 'Essaouira', '2025-02-16', '2025-02-19', 640.00, 'uploads/4_cnie.pdf', 'uploads/4_permis.pdf', 3, 15, 0, NULL),
(5, 'El jadida', 'Fes', '2025-01-28', '2025-01-31', 600.00, 'uploads/5_cnie.pdf', 'uploads/5_permis.pdf', 3, 9, 0, NULL),
(6, 'Casablanca', 'Meknes', '2025-01-04', '2025-01-07', 800.00, 'uploads/6_cnie.pdf', 'uploads/6_permis.pdf', 3, 7, 0, NULL),
(7, 'Essaouira', 'Tetouane', '2025-02-11', '2025-02-13', 450.00, 'uploads/7_cnie.pdf', 'uploads/7_permis.pdf', 3, 9, 0, NULL),
(8, 'Marrakech, Azli', 'Marrakech, gueliz', '2025-02-04', '2025-02-08', 900.00, 'uploads/8_cnie.pdf', 'uploads/8_permis.pdf', 3, 2, 0, NULL),
(9, 'Casablanca', 'rabat', '2025-02-17', '2025-02-21', 900.00, 'uploads/9_cnie.pdf', 'uploads/9_permis.pdf', 3, 2, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id_utilisateur` int NOT NULL AUTO_INCREMENT,
  `nom_utilisateur` varchar(50) DEFAULT NULL,
  `prenom_utilisateur` varchar(50) DEFAULT NULL,
  `telephone_utilisateur` varchar(15) DEFAULT NULL,
  `email_utilisateur` varchar(100) DEFAULT NULL,
  `motDePasse_utilisateur` varchar(255) DEFAULT NULL,
  `token` varchar(64) DEFAULT NULL,
  `type` varchar(50) DEFAULT 'client',
  PRIMARY KEY (`id_utilisateur`),
  UNIQUE KEY `email_utilisateur` (`email_utilisateur`),
  UNIQUE KEY `token` (`token`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`id_utilisateur`, `nom_utilisateur`, `prenom_utilisateur`, `telephone_utilisateur`, `email_utilisateur`, `motDePasse_utilisateur`, `token`, `type`) VALUES
(1, 'Benseddiq', 'Soufiane', '06847116637', 'soufianebenseddiq8@gmail.com', '$2y$10$.jvF4EjIhMVoQB2YyjvqK.N8fCGpiWQxFnEqXGBjbRkFK75L69Qz.', 'a515b34c8e160453b99139787a065a71989db5772cecd17a305dca7e2b20604d', 'client'),
(2, 'Ali', 'Omar', '0632611886', 'admin@gmail.com', '$2y$10$6J6gepmwMVFc7qsTueAdP.Gc/4jsUIcZEOjp4fu040GiYm/DUVkAS', '04318116b55ae6d626498cce3d1fb9c78675c78e019a5e15807801b18aaa2d12', 'admin'),
(3, 'Mohamed', 'Salah', '0684755993', 'mohamed@gmail.com', '$2y$10$GB0Juv8y6gzeDBtGOj7WFerWaQR04trbHCbhIBSVGlg6gf9HdXzJq', 'a3329ab52bbeddabc1e6be5d6de7ed75e7d891ef1e32dbaa8d8325d78a5cfdf7', 'client'),
(4, 'Adam', 'El Alami', '0635844772', 'adam@gmail.com', '$2y$10$gZN3r/HXW9TFxARoK4av/OkUiIbgow1f5LmUn0AmZZf4Nl8xLObpK', '7dffc8ca7acb19f735c794deb5bb58357be1473d1b6569e11852bd9bdf8f8e53', 'client'),
(5, 'Marmouch', 'Omar', '0694755843', 'omar@gmail.com', '$2y$10$KCPyYfqwCBdrvSzjLc/ACOKtW1AsKmJv9IcN96c1QSoke5zjiaeMq', '6d1172aad9a53b2050a87ec85e5d4ba84741f936b78438885902f99f90ab2f13', 'client');

-- --------------------------------------------------------

--
-- Table structure for table `voitures`
--

DROP TABLE IF EXISTS `voitures`;
CREATE TABLE IF NOT EXISTS `voitures` (
  `id_voiture` int NOT NULL AUTO_INCREMENT,
  `libelle_voiture` varchar(255) NOT NULL,
  `date_achat` date NOT NULL,
  `prix_jour` double NOT NULL,
  `id_marque` int NOT NULL,
  `id_cat` int NOT NULL,
  `chemin` varchar(255) DEFAULT NULL,
  `disponibilite` varchar(255) DEFAULT 'oui',
  PRIMARY KEY (`id_voiture`),
  KEY `id_cat` (`id_cat`),
  KEY `id_marque` (`id_marque`)
) ENGINE=MyISAM AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `voitures`
--

INSERT INTO `voitures` (`id_voiture`, `libelle_voiture`, `date_achat`, `prix_jour`, `id_marque`, `id_cat`, `chemin`, `disponibilite`) VALUES
(1, 'Audi Q5', '2023-07-10', 160, 0, 0, 'suv/audiQ5.jpg', 'oui'),
(2, 'Audi Q7', '2023-08-15', 180, 0, 0, 'suv/audiQ7.jpg', 'oui'),
(3, 'Audi Q3', '2023-09-20', 140, 0, 0, 'suv/audiQ3.jpg', 'oui'),
(4, 'BMW X5', '2023-07-10', 180, 1, 0, 'suv/bmwX5.jpg', 'oui'),
(5, 'BMW X3', '2023-08-15', 160, 1, 0, 'suv/bmwX3.jpg', 'oui'),
(6, 'BMW X1', '2023-09-20', 140, 1, 0, 'suv/bmwX1.jpg', 'oui'),
(7, 'Mercedes-Benz GLE', '2023-07-10', 200, 2, 0, 'suv/mercedesbenzGLE.jpg', 'oui'),
(8, 'Mercedes-Benz GLC', '2023-08-15', 180, 2, 0, 'suv/mercedesbenzGLC.jpg', 'oui'),
(9, 'Mercedes-Benz GLA', '2023-09-20', 150, 2, 0, 'suv/mercedesbenzGLA.jpg', 'oui'),
(10, 'Subaru Forester', '2023-07-10', 150, 3, 0, 'suv/subaruFORESTER.jpg', 'oui'),
(11, 'Subaru Outback', '2023-08-15', 160, 3, 0, 'suv/subaruOUTBACK.jpg', 'oui'),
(12, 'Subaru Crosstrek', '2023-09-20', 140, 3, 0, 'suv/subaruCROSSTREK.jpg', 'oui'),
(13, 'Volvo XC90', '2023-07-10', 200, 4, 0, 'suv/volvoXC90.jpg', 'oui'),
(14, 'Volvo XC60', '2023-08-15', 180, 4, 0, 'suv/volvoXC60.jpg', 'oui'),
(15, 'Volvo XC40', '2023-09-20', 160, 4, 0, 'suv/volvoXC40.jpg', 'oui'),
(16, 'Mazda CX-5', '2023-07-10', 160, 5, 0, 'suv/mazdaCX-5.jpg', 'oui'),
(17, 'Mazda CX-9', '2023-08-15', 180, 5, 0, 'suv/mazdaCX-9.jpg', 'oui'),
(18, 'Mazda CX-30', '2023-09-20', 140, 5, 0, 'suv/mazdaCX-30.jpg', 'oui'),
(19, 'Honda CR-V', '2023-07-10', 150, 6, 0, 'suv/hondaCR-V.jpg', 'oui'),
(20, 'Honda Passport', '2023-08-15', 170, 6, 0, 'suv/hondaPASSPORT.jpg', 'oui'),
(21, 'Honda HR-V', '2023-09-20', 140, 6, 0, 'suv/hondaHR-V.jpg', 'oui'),
(22, 'Toyota RAV4', '2023-07-10', 160, 7, 0, 'suv/toyotaRAV4.jpg', 'oui'),
(23, 'Toyota Highlander', '2023-08-15', 180, 7, 0, 'suv/toyotaHIGHLANDER.jpg', 'oui'),
(24, 'Toyota 4Runner', '2023-09-20', 170, 7, 0, 'suv/toyota4RUNNER.jpg', 'oui'),
(25, 'Volkswagen Tiguan', '2023-07-10', 160, 8, 0, 'suv/volkswagenTIGUAN.jpg', 'oui'),
(26, 'Volkswagen Atlas', '2023-08-15', 180, 8, 0, 'suv/volkswagenATLAS.jpg', 'oui'),
(27, 'Volkswagen Touareg', '2023-09-20', 200, 8, 0, 'suv/volkswagenTOUAREG.jpg', 'oui'),
(28, 'Nissan Rogue', '2023-07-10', 150, 9, 0, 'suv/nissanROGUE.jpg', 'oui'),
(29, 'Nissan Pathfinder', '2023-08-15', 170, 9, 0, 'suv/nissanPATHFINDER.jpg', 'oui'),
(30, 'Ford Explorer', '2023-07-10', 170, 10, 0, 'suv/fordEXPLORER.jpg', 'oui'),
(31, 'Ford Escape', '2023-08-15', 150, 10, 0, 'suv/fordESCAPE.jpg', 'oui'),
(32, 'Ford Edge', '2023-09-20', 160, 10, 0, 'suv/fordEDGE.jpg', 'oui'),
(33, 'Renault Koleos', '2023-07-10', 150, 11, 0, 'suv/renaultKOLEOS.jpg', 'oui'),
(34, 'Renault Arkana', '2023-08-15', 170, 11, 0, 'suv/renaultARKANA.jpg', 'oui'),
(35, 'Renault Kadjar', '2023-09-20', 160, 11, 0, 'suv/renaultKADJAR.jpg', 'oui'),
(36, 'Audi A3', '2023-07-10', 120, 0, 4, 'compacts/audiA3.jpg', 'oui'),
(37, 'Audi RS3', '2023-08-15', 200, 0, 4, 'compacts/audiRS3.jpg', 'oui'),
(38, 'BMW 1 Series', '2023-07-10', 130, 1, 4, 'compacts/bmw-M2.jpg', 'oui'),
(39, 'BMW M2', '2023-08-15', 220, 1, 4, 'compacts/bmw1-Series.jpg', 'oui'),
(40, 'Mercedes-Benz A-Class', '2023-07-10', 130, 2, 4, 'compacts/mercedesA-CLASS.jpg', 'oui'),
(41, 'Mercedes-Benz B-Class', '2023-08-15', 130, 2, 4, 'compacts/mercedesB-CLASS.jpg', 'oui'),
(42, 'Mercedes-Benz CLA-Class', '2023-09-20', 140, 2, 4, 'compacts/mercedesCLA-CLASS.jpg', 'oui'),
(43, 'Subaru Impreza', '2023-07-10', 110, 3, 4, 'compacts/subaruIMPREZA.jpg', 'oui'),
(44, 'Subaru WRX', '2023-08-15', 180, 3, 4, 'compacts/subaruWRX.jpg', 'oui'),
(45, 'Volvo S60', '2023-07-10', 140, 4, 4, 'compacts/volvoS60.jpg', 'oui'),
(46, 'Volvo V60', '2023-08-15', 150, 4, 4, 'compacts/volvoV60.jpg', 'oui'),
(47, 'Volvo V40 Cross Country', '2023-09-20', 130, 4, 4, 'compacts/volvoV40-CROSS-COUNTRY.jpg', 'oui'),
(48, 'Mazda3', '2023-07-10', 120, 5, 4, 'compacts/mazda3.jpg', 'oui'),
(49, 'Mazda2', '2023-08-15', 110, 5, 4, 'compacts/mazda2.jpg', 'oui'),
(50, 'Honda Civic', '2023-07-10', 125, 6, 4, 'compacts/hondaCIVIC.jpg', 'oui'),
(51, 'Honda Fit', '2023-08-15', 100, 6, 4, 'compacts/hondaFIT.jpg', 'oui'),
(52, 'Toyota Corolla', '2023-07-10', 120, 7, 4, 'compacts/toyotaCOROLLA.jpg', 'oui'),
(53, 'Toyota Yaris', '2023-08-15', 110, 7, 4, 'compacts/toyotaYARIS.jpg', 'oui'),
(54, 'Volkswagen Golf', '2023-07-10', 125, 8, 4, 'compacts/volkswagenGOLF.jpg', 'oui'),
(55, 'Volkswagen Polo', '2023-08-15', 110, 8, 4, 'compacts/volkswagenPOLO.jpg', 'oui'),
(56, 'Nissan Sentra', '2023-07-10', 120, 9, 4, 'compacts/nissanSENTRA.jpg', 'oui'),
(57, 'Nissan Versa', '2023-08-15', 110, 9, 4, 'compacts/nissanVERSA.jpg', 'oui'),
(58, 'Ford Focus', '2023-07-10', 115, 10, 4, 'compacts/fordFOCUS.jpg', 'oui'),
(59, 'Ford Fiesta', '2023-08-15', 100, 10, 4, 'compacts/fordFIESTA.jpg', 'oui'),
(60, 'Renault Clio', '2023-07-10', 110, 11, 4, 'compacts/renaultCLIO.jpg', 'oui'),
(61, 'Renault Megane', '2023-08-15', 130, 11, 4, 'compacts/renaultMEGANE.jpg', 'oui'),
(62, 'Audi A3 Cabriolet', '2023-07-10', 150, 0, 1, 'cabriolets/audiA3-CABRIOLET.jpg', 'oui'),
(63, 'Audi A5 Cabriolet', '2023-08-15', 180, 0, 1, 'cabriolets/audiA5-CABRIOLET.jpg', 'oui'),
(64, 'BMW 2 Series Convertible', '2023-07-10', 160, 1, 1, 'cabriolets/bmw2-SERIES-CONVERTIBLE.jpg', 'oui'),
(65, 'BMW 4 Series Convertible', '2023-08-15', 200, 1, 1, 'cabriolets/bmw4-SERIES-CONVERTIBLE.jpg', 'oui'),
(66, 'Mercedes-Benz C-Class Cabriolet', '2023-07-10', 180, 2, 1, 'cabriolets/MazdaMX5.jpg', 'oui'),
(67, 'Mercedes-Benz CLE Cabriolet', '2023-08-15', 220, 2, 1, 'cabriolets/mercedesbenzC-CLASS-CABRIOLET.jpg', 'oui'),
(68, 'Volkswagen Golf Cabriolet', '2023-07-10', 140, 8, 1, 'cabriolets/mercedesbenzCLE-CABRIOLET.jpg', 'oui'),
(69, 'Volkswagen T-Roc Cabriolet', '2023-08-15', 160, 8, 1, 'cabriolets/volkswagenGOLF-CABRIOLET.jpg', 'oui'),
(70, 'Audi Q2', '2023-07-10', 140, 0, 5, 'crossovers/audi-Q4-E-TRON.jpg', 'oui'),
(71, 'Audi Q3 Sportback', '2023-08-15', 160, 0, 5, 'crossovers/audiQ2.jpg', 'oui'),
(72, 'Audi Q4 e-tron', '2023-07-10', 180, 0, 5, 'crossovers/audiQ3.jpg', 'oui'),
(73, 'BMW X4', '2023-08-15', 200, 1, 5, 'crossovers/bmwX4.jpg', 'oui'),
(74, 'BMW X6', '2023-07-10', 220, 1, 5, 'crossovers/bmwX6.jpg', 'oui'),
(75, 'Mercedes-Benz GLC Coupe', '2023-08-15', 240, 2, 5, 'crossovers/FordPuma.jpg', 'oui'),
(76, 'Mercedes-Benz GLE Coupe', '2023-07-10', 260, 2, 5, 'crossovers/mercedesbenzGLC-COUPE.jpg', 'oui'),
(77, 'Volvo XC60 Recharge', '2023-08-15', 280, 4, 5, 'crossovers/mercedesbenzGLE-COUPE.jpg', 'oui'),
(78, 'Volvo XC90 Recharge', '2023-07-10', 300, 4, 5, 'crossovers/volvoXC60-RECHARGE.jpg', 'oui'),
(79, 'Audi A6 allroad', '2023-08-15', 180, 0, 2, 'breaks/audiA6-ALLROAD.jpg', 'oui'),
(80, 'Audi RS4 Avant', '2023-07-10', 220, 0, 2, 'breaks/audiRS4-AVANT.jpg', 'oui'),
(81, 'BMW 3 Series Touring', '2023-08-15', 200, 1, 2, 'breaks/bmw3SERIES-TOURING.jpg', 'oui'),
(82, 'BMW 6 Series Gran Turismo', '2023-07-10', 240, 1, 2, 'breaks/bmw6SSERIES-GRAN-TURISMO.jpg', 'oui'),
(83, 'Mercedes-Benz E-Class Estate', '2023-08-15', 260, 2, 2, 'breaks/mercedesE-CLASS-ALL-TERRAIN.jpg', 'oui'),
(84, 'Mercedes-Benz E-Class All-Terrain', '2023-07-10', 280, 2, 2, 'breaks/mercedesbenzE-CLASS-ESTATE.jpg', 'oui'),
(85, 'Volvo V90 Cross Country', '2023-08-15', 300, 4, 2, 'breaks/volvoV90-CROSS-COUNTRY.jpg', 'oui'),
(86, 'Volvo V60 Polestar Engineered', '2023-07-10', 320, 4, 2, 'breaks/volvoV60-POLESTAR-ENGINEERED.jpg', 'oui'),
(87, 'Audi A3', '2023-08-15', 150, 0, 3, 'berlines/audiA3.jpg', 'oui'),
(88, 'Audi A4', '2023-07-10', 180, 0, 3, 'berlines/audiA4.jpg', 'oui'),
(89, 'BMW 1 Series', '2023-08-15', 140, 1, 3, 'berlines/bmw1SERIES.jpg', 'oui'),
(90, 'BMW 7 Series', '2023-07-10', 300, 1, 3, 'berlines/bmw7SERIES.jpg', 'oui'),
(91, 'Mercedes-Benz C-Class', '2023-08-15', 160, 2, 3, 'berlines/mercedesbenzC-CLASS.jpg', 'oui'),
(92, 'Mercedes-Benz S-Class', '2023-07-10', 400, 2, 3, 'berlines/mercedesbenzS-CLASS.jpg', 'oui'),
(93, 'Volvo S60', '2023-08-15', 170, 4, 3, 'berlines/volvoS60.jpg', 'oui'),
(94, 'Honda Civic', '2023-07-10', 120, 6, 3, 'berlines/hondaCIVIC.jpg', 'oui'),
(95, 'Honda Legend', '2023-08-15', 350, 6, 3, 'berlines/hondaLEGEND.jpg', 'oui'),
(96, 'Toyota Corolla', '2023-07-10', 130, 7, 3, 'berlines/toyotaCOROLLA.jpg', 'oui'),
(97, 'Toyota Mirai', '2023-08-15', 250, 7, 3, 'berlines/toyotaMIRAI.jpg', 'oui'),
(98, 'Volkswagen Jetta', '2023-07-10', 140, 8, 3, 'berlines/volkswagenJETTA.jpg', 'oui'),
(99, 'Volkswagen Passat', '2023-08-15', 180, 8, 3, 'berlines/volkswagenPASSAT.jpg', 'oui'),
(100, 'Nissan Sentra', '2023-07-10', 130, 9, 3, 'berlines/nissanSENTRA.jpg', 'oui'),
(101, 'Nissan Altima', '2023-08-15', 170, 9, 3, 'berlines/nissanALTIMA.jpg', 'oui'),
(102, 'Ford Focus', '2023-07-10', 120, 10, 3, 'berlines/fordFOCUS.jpg', 'oui'),
(103, 'Ford Fusion', '2023-08-15', 160, 10, 3, 'berlines/fordFUSION.jpg', 'oui'),
(104, 'Renault Megane', '2023-07-10', 130, 11, 3, 'berlines/renaultMEGANE.jpg', 'oui'),
(105, 'Renault Fluence', '2023-08-15', 150, 11, 3, 'berlines/renaultFLUENCE.jpg', 'oui'),
(106, 'Renault Latitude', '2023-07-10', 170, 11, 3, 'berlines/renaultLATITUDE.jpg', 'oui');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
