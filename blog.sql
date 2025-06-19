-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `about`
--

DROP TABLE IF EXISTS `about`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `self` varchar(1000) DEFAULT NULL,
  `work` varchar(1000) DEFAULT NULL,
  `life` varchar(1000) DEFAULT NULL,
  `game` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about`
--

LOCK TABLES `about` WRITE;
/*!40000 ALTER TABLE `about` DISABLE KEYS */;
INSERT INTO `about` VALUES (1,'性别：男，年龄90后，地址：安徽，爱好游戏电影打牌还有刷抖音。','毕业后一直从事前端开发这份工作，从大学开始接触到编程认识了计算机语言，最后选择了JavaScript，并且一直喜欢这个语言。JavaScript具有无穷的活力可以从事任何领域，从一开始的Web到现在的后端、桌面端甚至是嵌入式，JavaScript无时无刻不在展示着他的惊人力量。我喜欢JavaScript我希望能利用他创造无限的可能。','好像没什么生活细节，性格内向，喜欢独处，也不喜欢独处。','喜欢打游戏，但好像总是缺少游戏的最高配置：朋友。喜欢游戏中的每一个有血有肉的人物，矢志不渝的爱情荡气回肠，侠之大者的气概拯救苍生，坚持不懈的勇气锲而不舍，惊险刺激的冒险流连忘返。');
/*!40000 ALTER TABLE `about` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL COMMENT '姓名',
  `comment_data` varchar(100) DEFAULT NULL COMMENT '评论',
  `self_id` bigint DEFAULT NULL COMMENT 'self表的id',
  `is_del` varchar(100) DEFAULT '0' COMMENT '是否删除',
  `datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='朋友圈评论';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (36,'1','1',1,'0','2025-05-09 16:05:34'),(37,'2','2',1,'0','2025-05-09 16:05:38'),(38,'3','3',1,'0','2025-05-09 16:05:41'),(39,'4','4',1,'0','2025-05-09 16:06:20'),(40,'5','5',1,'0','2025-05-09 16:14:31'),(41,'45','45',15,'0','2025-05-09 16:37:07');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `article` text,
  `datetime` datetime DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `subtitle` varchar(1000) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `is_del` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
INSERT INTO `content` VALUES (1,'# 好好学习\n\n-- 只有我才能带领我走向胜利','2025-01-22 15:01:49','我的内容','好好学习天天向上','/images/1746769299169_9999.jpg','0'),(2,'# 喜欢一个人就是','2025-01-23 12:05:04','我的长标题文章内容数据','好好佛号发哈分红好烦好好烦好烦哦发分红哈佛啊哈好啊好啊后方好烦好啊好啊发好烦好好好烦好合法','/images/1746769309336_DeSC_7232 (7).jpg','0'),(3,'# 喜欢一个人就是','2025-01-23 12:05:11','我的长标题文章内容数据1','好好佛号发哈分红好烦好好烦好烦哦发分红哈佛啊哈好啊好啊后方好烦好啊好啊发好烦好好好烦好合法','/images/1746769291855_111223305296__dsf0428_tomiaaa (19).jpg','0'),(4,'# 喜欢一个人就是','2025-01-23 12:05:14','我的长标题文章内容数据2','好好佛号发哈分红好烦好好烦好烦哦发分红哈佛啊哈好啊好啊后方好烦好啊好啊发好烦好好好烦好合法','/images/1746769283596_789.jpg','0'),(5,'# 喜欢一个人就是','2025-01-23 12:05:17','我的长标题文章内容数据3','好好佛号发哈分红好烦好好烦好烦哦发分红哈佛啊哈好啊好啊后方好烦好啊好啊发好烦好好好烦好合法','/images/1746769276419_1DSC_1973 (5).jpg','0'),(6,'# 有图有真相\n\n![IMG_20250413_125928.jpg](/blog/images/1746769666217_IMG_20250413_125928.jpg){:height=\"50%\" width=\"50%\"}','2025-01-23 13:07:56','有图片','好好的图片','/images/1746769252955_c5064ee16ad29d116ac4d59065d8c68ba8692899-700.jpg','0');
/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home`
--

DROP TABLE IF EXISTS `home`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image` varchar(100) DEFAULT NULL COMMENT '图像',
  `text` varchar(100) DEFAULT NULL COMMENT '文本',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home`
--

LOCK TABLES `home` WRITE;
/*!40000 ALTER TABLE `home` DISABLE KEYS */;
INSERT INTO `home` VALUES (2,'/images/1746769444046_【哲风壁纸】乡村道路-安逸风景.png','羽化自在仙');
/*!40000 ALTER TABLE `home` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `msg` varchar(1000) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  `color` varchar(100) DEFAULT NULL,
  `is_del` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'羽化自在仙','你好啊123','2025-01-22 15:02:07','#FFF7DF','0'),(2,'羽化自在仙','会好起来的','2025-01-22 17:27:57','#EFE4FD','0'),(3,'羽化自在仙','只有我才能带领我走向胜利','2025-01-22 17:28:52','#DEF7FC','0'),(4,'羽化自在仙','维修自己','2025-01-22 19:18:32','#FEE7E3','0'),(5,'羽化自在仙','希望好好的','2025-01-22 19:18:45','#EFE4FD','0'),(6,'羽化自在仙','我会成功的吗？','2025-01-22 19:19:36','#FEE7E3','0'),(7,'羽化自在仙','胜利会站在我这一边的吗？','2025-01-22 19:20:09','#FFF7DF','0'),(8,'4545','4545','2025-05-08 13:43:08','#FEE7E3','0');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `self`
--

DROP TABLE IF EXISTS `self`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `self` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` int DEFAULT NULL COMMENT '1文本2图片3视频4音频',
  `text` text COMMENT '文本',
  `content` text COMMENT '图片音频视频',
  `datetime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '时间',
  `is_del` varchar(100) DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='朋友圈';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `self`
--

LOCK TABLES `self` WRITE;
/*!40000 ALTER TABLE `self` DISABLE KEYS */;
INSERT INTO `self` VALUES (1,1,'我的第一条朋友圈',NULL,'2025-05-08 09:12:43','0'),(15,1,'第二','','2025-05-09 16:35:32','0'),(16,1,'','','2025-06-03 16:25:28','0'),(17,1,'而且','/images/1748939172893_1DSC_1973 (10).jpg,/images/1748939172896_1DSC_1973 (12) - 副本.jpg,/images/1748939172898_9e30be504fc2d5622d2b75b9e41190ef76c66c4f.jpg','2025-06-03 16:26:18','0'),(18,2,'好的','/images/1748939356347_1-1410230S546.jpg,/images/1748939356351_1-141015103404.jpg,/images/1748939356353_1ad1ca94ccf1a066d1b5f73755a413dac1cfd637-700.jpg','2025-06-03 16:29:20','0');
/*!40000 ALTER TABLE `self` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL COMMENT '用户名',
  `password` varchar(100) DEFAULT NULL COMMENT '密码',
  `nickname` varchar(100) DEFAULT NULL COMMENT '昵称',
  `age` int DEFAULT NULL COMMENT '年龄',
  `sex` varchar(100) DEFAULT NULL COMMENT '性别',
  `address` varchar(100) DEFAULT NULL COMMENT '地址',
  `avatar` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','12341234','明月照彩云',19,'男','安徽合肥','/images/1746685389136_mmexport1737354248207.png');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'blog'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-19 12:14:28
