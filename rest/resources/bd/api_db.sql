-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: api_db
-- ------------------------------------------------------
-- Server version	5.7.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assistants`
--

DROP TABLE IF EXISTS `assistants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assistants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `id_event` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_event` (`id_event`),
  CONSTRAINT `assistants_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `assistants_ibfk_2` FOREIGN KEY (`id_event`) REFERENCES `events` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assistants`
--

LOCK TABLES `assistants` WRITE;
/*!40000 ALTER TABLE `assistants` DISABLE KEYS */;
INSERT INTO `assistants` VALUES (1,2,1,'2024-04-19 22:43:16','2024-04-19 22:43:16'),(2,3,2,'2024-04-19 22:43:16','2024-04-19 22:43:16'),(3,4,2,'2024-04-20 00:04:02','2024-04-20 00:04:02'),(4,7,4,'2024-04-20 02:39:10','2024-04-20 02:39:10'),(5,7,3,'2024-04-20 14:07:23','2024-04-20 14:07:23'),(6,9,4,'2024-04-20 14:12:20','2024-04-20 14:12:20'),(7,11,4,'2024-04-20 14:12:33','2024-04-20 14:12:33'),(8,12,4,'2024-04-20 14:12:45','2024-04-20 14:12:45'),(9,13,4,'2024-04-20 14:12:49','2024-04-20 14:12:49');
/*!40000 ALTER TABLE `assistants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `id_country` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `city_ibfk_1` (`id_country`),
  CONSTRAINT `city_ibfk_1` FOREIGN KEY (`id_country`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Barranquilla',1),(2,'Bogota',1),(3,'Cali',1),(4,'Medellin',1);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'Colombia');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `id_city` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `location` point NOT NULL,
  `location_name` varchar(255) NOT NULL,
  `date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_city` (`id_city`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`id_city`) REFERENCES `city` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Juegos Olimpicos',1,'2024-04-19 21:00:32','2024-04-20 14:28:07',_binary '\0\0\0\0\0\0\0$óˇê~%@46<ΩûR¿','Estadio Roberto Martinez','2024-04-19 21:01:04'),(2,'Mundial de Futbol',2,'2024-04-19 21:01:04','2024-04-20 14:27:13',_binary '\0\0\0\0\0\0\0)\À«∫∏@L7âA`âR¿','Alcaldia de Bogota','2024-04-19 21:01:04'),(3,'Mundial Ciclismo',2,'2024-04-19 21:01:04','2024-04-20 14:27:13',_binary '\0\0\0\0\0\0\0}?5^∫â@\◊ÚAœÇR¿','Estadio Nemesio Camacho El Campin de Bogota ','2024-04-20 21:01:04'),(4,'Mundial Natacion',1,'2024-04-19 21:09:19','2024-04-20 14:25:50',_binary '\0\0\0\0\0\0\0«∫∏ç0%@ÆG\·zíR¿','Estadio Metropolitano','2024-04-20 14:12:33'),(6,'Mundial Ciclismo',3,'2024-04-19 21:10:41','2024-04-20 14:28:07',_binary '\0\0\0\0\0\0\0ô*ï\‘	\n@Ü\…T¡®S¿','Estadio Pascual Guerrero','2024-04-18 21:01:04'),(7,'Evento de prueba',1,'2024-04-20 00:27:12','2024-04-20 14:28:07',_binary '\0\0\0\0\0\0\0R\'†â∞\·%@<1\Î\≈P≤R¿','Estadio de prueba','2024-04-18 21:01:04'),(8,'Mundial de Yoga',1,'2024-04-20 01:01:01','2024-04-20 14:28:07',_binary '\0\0\0\0\0\0\0∂\\Gf?&@º \"5mµR¿','Hotel Movich Baranquilla','2024-04-19 21:01:04');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'deivis','devis@example.com','2024-04-19 02:59:11','2024-04-19 02:59:11'),(3,'dwivis23','dwvis23@example.com','2024-04-19 03:02:03','2024-04-20 00:07:02'),(4,'dw2ivis233','dw2vis233@example.com','2024-04-19 03:09:30','2024-04-20 00:07:02'),(5,'dw2ivis4','dw2vis4@example.com','2024-04-19 03:10:48','2024-04-20 00:07:02'),(6,'dw2ivis5','dw2vis5@example.com','2024-04-19 03:14:24','2024-04-20 00:07:02'),(7,'dw2ivis6','dw2vis6@example.com','2024-04-19 03:15:30','2024-04-20 00:07:02'),(8,'dw2ivis7','dw2vis7@example.com','2024-04-19 03:15:47','2024-04-20 00:07:02'),(9,'dw2ivis8','dw2vis8@example.com','2024-04-19 03:16:57','2024-04-20 00:07:02'),(10,'davidmartinez','dw2vis@example.com','2024-04-19 13:55:01','2024-04-19 13:55:01'),(11,'davidmartinezb','dw2vis@example.com','2024-04-19 14:46:28','2024-04-19 14:46:28'),(12,'davidmartinezbolivar','dw2vdis@example.com','2024-04-19 16:34:09','2024-04-19 16:34:09'),(13,'davidmartinezbolivar22','dw2vdis@example.com','2024-04-19 16:34:16','2024-04-19 16:34:16');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-20 10:31:38
