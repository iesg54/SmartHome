-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: SmartHome
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ac`
--

DROP TABLE IF EXISTS `ac`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ac` (
  `t_atual` double DEFAULT NULL,
  `t_max` double DEFAULT NULL,
  `t_min` double DEFAULT NULL,
  `id` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FKrpa9vbirduqwoicsr0ndcjn6c` FOREIGN KEY (`id`) REFERENCES `dispositivo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ac`
--

LOCK TABLES `ac` WRITE;
/*!40000 ALTER TABLE `ac` DISABLE KEYS */;
/*!40000 ALTER TABLE `ac` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alerta`
--

DROP TABLE IF EXISTS `alerta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alerta` (
  `id` int NOT NULL,
  `mensagem` varchar(255) NOT NULL,
  `sensor` varchar(255) NOT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  `valor` double NOT NULL,
  `id_divisao` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKly5lw30ev4fhbw6s3rvv6tvi2` (`id_divisao`),
  CONSTRAINT `FKly5lw30ev4fhbw6s3rvv6tvi2` FOREIGN KEY (`id_divisao`) REFERENCES `divisao` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alerta`
--

LOCK TABLES `alerta` WRITE;
/*!40000 ALTER TABLE `alerta` DISABLE KEYS */;
/*!40000 ALTER TABLE `alerta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alerta_seq`
--

DROP TABLE IF EXISTS `alerta_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alerta_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alerta_seq`
--

LOCK TABLES `alerta_seq` WRITE;
/*!40000 ALTER TABLE `alerta_seq` DISABLE KEYS */;
INSERT INTO `alerta_seq` VALUES (1);
/*!40000 ALTER TABLE `alerta_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `casa`
--

DROP TABLE IF EXISTS `casa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `casa` (
  `id` int NOT NULL,
  `morada` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_dpeed42aw30mviipypb9q6i5h` (`morada`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `casa`
--

LOCK TABLES `casa` WRITE;
/*!40000 ALTER TABLE `casa` DISABLE KEYS */;
/*!40000 ALTER TABLE `casa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `casa_seq`
--

DROP TABLE IF EXISTS `casa_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `casa_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `casa_seq`
--

LOCK TABLES `casa_seq` WRITE;
/*!40000 ALTER TABLE `casa_seq` DISABLE KEYS */;
INSERT INTO `casa_seq` VALUES (1);
/*!40000 ALTER TABLE `casa_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumo_cozinha`
--

DROP TABLE IF EXISTS `consumo_cozinha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumo_cozinha` (
  `id` int NOT NULL,
  `dia` date DEFAULT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  `valor` double DEFAULT NULL,
  `id_div` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtf3n9drlmnb6g03x6yoq05m94` (`id_div`),
  CONSTRAINT `FKtf3n9drlmnb6g03x6yoq05m94` FOREIGN KEY (`id_div`) REFERENCES `divisao` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumo_cozinha`
--

LOCK TABLES `consumo_cozinha` WRITE;
/*!40000 ALTER TABLE `consumo_cozinha` DISABLE KEYS */;
/*!40000 ALTER TABLE `consumo_cozinha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumo_cozinha_seq`
--

DROP TABLE IF EXISTS `consumo_cozinha_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumo_cozinha_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumo_cozinha_seq`
--

LOCK TABLES `consumo_cozinha_seq` WRITE;
/*!40000 ALTER TABLE `consumo_cozinha_seq` DISABLE KEYS */;
INSERT INTO `consumo_cozinha_seq` VALUES (1);
/*!40000 ALTER TABLE `consumo_cozinha_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumo_externo`
--

DROP TABLE IF EXISTS `consumo_externo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumo_externo` (
  `id` int NOT NULL,
  `dia` date DEFAULT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  `valor` double DEFAULT NULL,
  `id_div` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlpate87q5hp6wqso2hpykloy0` (`id_div`),
  CONSTRAINT `FKlpate87q5hp6wqso2hpykloy0` FOREIGN KEY (`id_div`) REFERENCES `divisao` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumo_externo`
--

LOCK TABLES `consumo_externo` WRITE;
/*!40000 ALTER TABLE `consumo_externo` DISABLE KEYS */;
/*!40000 ALTER TABLE `consumo_externo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumo_externo_seq`
--

DROP TABLE IF EXISTS `consumo_externo_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumo_externo_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumo_externo_seq`
--

LOCK TABLES `consumo_externo_seq` WRITE;
/*!40000 ALTER TABLE `consumo_externo_seq` DISABLE KEYS */;
INSERT INTO `consumo_externo_seq` VALUES (1);
/*!40000 ALTER TABLE `consumo_externo_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumo_quarto`
--

DROP TABLE IF EXISTS `consumo_quarto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumo_quarto` (
  `id` int NOT NULL,
  `dia` date DEFAULT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  `valor` double DEFAULT NULL,
  `id_div` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtajdeowp6gcagper0nsv1xhbu` (`id_div`),
  CONSTRAINT `FKtajdeowp6gcagper0nsv1xhbu` FOREIGN KEY (`id_div`) REFERENCES `divisao` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumo_quarto`
--

LOCK TABLES `consumo_quarto` WRITE;
/*!40000 ALTER TABLE `consumo_quarto` DISABLE KEYS */;
/*!40000 ALTER TABLE `consumo_quarto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumo_quarto_seq`
--

DROP TABLE IF EXISTS `consumo_quarto_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumo_quarto_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumo_quarto_seq`
--

LOCK TABLES `consumo_quarto_seq` WRITE;
/*!40000 ALTER TABLE `consumo_quarto_seq` DISABLE KEYS */;
INSERT INTO `consumo_quarto_seq` VALUES (1);
/*!40000 ALTER TABLE `consumo_quarto_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumo_sala`
--

DROP TABLE IF EXISTS `consumo_sala`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumo_sala` (
  `id` int NOT NULL,
  `dia` date DEFAULT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  `valor` double DEFAULT NULL,
  `id_div` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcwvwe4w313ol5mmqwneqgeo3q` (`id_div`),
  CONSTRAINT `FKcwvwe4w313ol5mmqwneqgeo3q` FOREIGN KEY (`id_div`) REFERENCES `divisao` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumo_sala`
--

LOCK TABLES `consumo_sala` WRITE;
/*!40000 ALTER TABLE `consumo_sala` DISABLE KEYS */;
/*!40000 ALTER TABLE `consumo_sala` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumo_sala_seq`
--

DROP TABLE IF EXISTS `consumo_sala_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumo_sala_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumo_sala_seq`
--

LOCK TABLES `consumo_sala_seq` WRITE;
/*!40000 ALTER TABLE `consumo_sala_seq` DISABLE KEYS */;
INSERT INTO `consumo_sala_seq` VALUES (1);
/*!40000 ALTER TABLE `consumo_sala_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dispositivo`
--

DROP TABLE IF EXISTS `dispositivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dispositivo` (
  `id` int NOT NULL,
  `consumo_energy` double NOT NULL,
  `estado` bit(1) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `id_divisao` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKc5tesiy4nfpu29qhttx7u5l9a` (`id_divisao`),
  CONSTRAINT `FKc5tesiy4nfpu29qhttx7u5l9a` FOREIGN KEY (`id_divisao`) REFERENCES `divisao` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispositivo`
--

LOCK TABLES `dispositivo` WRITE;
/*!40000 ALTER TABLE `dispositivo` DISABLE KEYS */;
/*!40000 ALTER TABLE `dispositivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dispositivo_seq`
--

DROP TABLE IF EXISTS `dispositivo_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dispositivo_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispositivo_seq`
--

LOCK TABLES `dispositivo_seq` WRITE;
/*!40000 ALTER TABLE `dispositivo_seq` DISABLE KEYS */;
INSERT INTO `dispositivo_seq` VALUES (1);
/*!40000 ALTER TABLE `dispositivo_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `divisao`
--

DROP TABLE IF EXISTS `divisao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `divisao` (
  `id` int NOT NULL,
  `nome` varchar(255) NOT NULL,
  `id_casa` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKj4awjxssbhlvnmx22qomxsquu` (`id_casa`),
  CONSTRAINT `FKj4awjxssbhlvnmx22qomxsquu` FOREIGN KEY (`id_casa`) REFERENCES `casa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `divisao`
--

LOCK TABLES `divisao` WRITE;
/*!40000 ALTER TABLE `divisao` DISABLE KEYS */;
/*!40000 ALTER TABLE `divisao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `divisao_seq`
--

DROP TABLE IF EXISTS `divisao_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `divisao_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `divisao_seq`
--

LOCK TABLES `divisao_seq` WRITE;
/*!40000 ALTER TABLE `divisao_seq` DISABLE KEYS */;
INSERT INTO `divisao_seq` VALUES (1);
/*!40000 ALTER TABLE `divisao_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lampada`
--

DROP TABLE IF EXISTS `lampada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lampada` (
  `end_time` datetime(6) DEFAULT NULL,
  `luminosidade` double NOT NULL,
  `start_time` datetime(6) DEFAULT NULL,
  `id` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK9en0kckfgskkxsksjj5mdf5x6` FOREIGN KEY (`id`) REFERENCES `dispositivo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lampada`
--

LOCK TABLES `lampada` WRITE;
/*!40000 ALTER TABLE `lampada` DISABLE KEYS */;
/*!40000 ALTER TABLE `lampada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regador`
--

DROP TABLE IF EXISTS `regador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regador` (
  `end_time` datetime(6) DEFAULT NULL,
  `start_time` datetime(6) DEFAULT NULL,
  `id` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FKsokiemasmqs363gtjloevc99t` FOREIGN KEY (`id`) REFERENCES `dispositivo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regador`
--

LOCK TABLES `regador` WRITE;
/*!40000 ALTER TABLE `regador` DISABLE KEYS */;
/*!40000 ALTER TABLE `regador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_cozinha`
--

DROP TABLE IF EXISTS `sensor_cozinha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensor_cozinha` (
  `id` int NOT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `valor` double DEFAULT NULL,
  `id_div` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4wa40qbtqurlwyvms5p8tqsai` (`id_div`),
  CONSTRAINT `FK4wa40qbtqurlwyvms5p8tqsai` FOREIGN KEY (`id_div`) REFERENCES `divisao` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor_cozinha`
--

LOCK TABLES `sensor_cozinha` WRITE;
/*!40000 ALTER TABLE `sensor_cozinha` DISABLE KEYS */;
/*!40000 ALTER TABLE `sensor_cozinha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_cozinha_seq`
--

DROP TABLE IF EXISTS `sensor_cozinha_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensor_cozinha_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor_cozinha_seq`
--

LOCK TABLES `sensor_cozinha_seq` WRITE;
/*!40000 ALTER TABLE `sensor_cozinha_seq` DISABLE KEYS */;
INSERT INTO `sensor_cozinha_seq` VALUES (1);
/*!40000 ALTER TABLE `sensor_cozinha_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_externo`
--

DROP TABLE IF EXISTS `sensor_externo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensor_externo` (
  `id` int NOT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `valor` double DEFAULT NULL,
  `id_div` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKs8vp9orpna65xcuhbc9hfaq6y` (`id_div`),
  CONSTRAINT `FKs8vp9orpna65xcuhbc9hfaq6y` FOREIGN KEY (`id_div`) REFERENCES `divisao` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor_externo`
--

LOCK TABLES `sensor_externo` WRITE;
/*!40000 ALTER TABLE `sensor_externo` DISABLE KEYS */;
/*!40000 ALTER TABLE `sensor_externo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_externo_seq`
--

DROP TABLE IF EXISTS `sensor_externo_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensor_externo_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor_externo_seq`
--

LOCK TABLES `sensor_externo_seq` WRITE;
/*!40000 ALTER TABLE `sensor_externo_seq` DISABLE KEYS */;
INSERT INTO `sensor_externo_seq` VALUES (1);
/*!40000 ALTER TABLE `sensor_externo_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_quarto`
--

DROP TABLE IF EXISTS `sensor_quarto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensor_quarto` (
  `id` int NOT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `valor` double DEFAULT NULL,
  `id_div` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmgxqmpim5ttygpxlh1hxif53e` (`id_div`),
  CONSTRAINT `FKmgxqmpim5ttygpxlh1hxif53e` FOREIGN KEY (`id_div`) REFERENCES `divisao` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor_quarto`
--

LOCK TABLES `sensor_quarto` WRITE;
/*!40000 ALTER TABLE `sensor_quarto` DISABLE KEYS */;
/*!40000 ALTER TABLE `sensor_quarto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_quarto_seq`
--

DROP TABLE IF EXISTS `sensor_quarto_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensor_quarto_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor_quarto_seq`
--

LOCK TABLES `sensor_quarto_seq` WRITE;
/*!40000 ALTER TABLE `sensor_quarto_seq` DISABLE KEYS */;
INSERT INTO `sensor_quarto_seq` VALUES (1);
/*!40000 ALTER TABLE `sensor_quarto_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_sala`
--

DROP TABLE IF EXISTS `sensor_sala`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensor_sala` (
  `id` int NOT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `valor` double DEFAULT NULL,
  `id_div` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK42orx6146krwq47je3mnvn6kp` (`id_div`),
  CONSTRAINT `FK42orx6146krwq47je3mnvn6kp` FOREIGN KEY (`id_div`) REFERENCES `divisao` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor_sala`
--

LOCK TABLES `sensor_sala` WRITE;
/*!40000 ALTER TABLE `sensor_sala` DISABLE KEYS */;
/*!40000 ALTER TABLE `sensor_sala` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_sala_seq`
--

DROP TABLE IF EXISTS `sensor_sala_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensor_sala_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor_sala_seq`
--

LOCK TABLES `sensor_sala_seq` WRITE;
/*!40000 ALTER TABLE `sensor_sala_seq` DISABLE KEYS */;
INSERT INTO `sensor_sala_seq` VALUES (1);
/*!40000 ALTER TABLE `sensor_sala_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tomada`
--

DROP TABLE IF EXISTS `tomada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tomada` (
  `tipo` varchar(255) NOT NULL,
  `id` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK1tq5dupss78s3scep7mpsjxi8` FOREIGN KEY (`id`) REFERENCES `dispositivo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tomada`
--

LOCK TABLES `tomada` WRITE;
/*!40000 ALTER TABLE `tomada` DISABLE KEYS */;
/*!40000 ALTER TABLE `tomada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilizador`
--

DROP TABLE IF EXISTS `utilizador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilizador` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_admin` bit(1) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_casa` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_eougu510uft70icifeafv6cll` (`email`),
  KEY `FKs869r2e0pk8ym2ceos208xepd` (`id_casa`),
  CONSTRAINT `FKs869r2e0pk8ym2ceos208xepd` FOREIGN KEY (`id_casa`) REFERENCES `casa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilizador`
--

LOCK TABLES `utilizador` WRITE;
/*!40000 ALTER TABLE `utilizador` DISABLE KEYS */;
/*!40000 ALTER TABLE `utilizador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilizador_seq`
--

DROP TABLE IF EXISTS `utilizador_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilizador_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilizador_seq`
--

LOCK TABLES `utilizador_seq` WRITE;
/*!40000 ALTER TABLE `utilizador_seq` DISABLE KEYS */;
INSERT INTO `utilizador_seq` VALUES (1);
/*!40000 ALTER TABLE `utilizador_seq` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-02 20:48:42
