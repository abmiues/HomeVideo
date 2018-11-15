-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: homevideo
-- ------------------------------------------------------
-- Server version	5.7.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bangumi`
--

DROP TABLE IF EXISTS `bangumi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bangumi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `cover` varchar(512) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `group` int(11) NOT NULL DEFAULT '0' COMMENT '属于哪个番剧系列',
  `part` int(11) NOT NULL DEFAULT '0' COMMENT '是所属番剧的第几季',
  `des` varchar(512) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='番剧表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bangumi`
--

LOCK TABLES `bangumi` WRITE;
/*!40000 ALTER TABLE `bangumi` DISABLE KEYS */;
/*!40000 ALTER TABLE `bangumi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bangumi_group`
--

DROP TABLE IF EXISTS `bangumi_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bangumi_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL COMMENT '仅供配置时区分是哪个番剧',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='番剧合集';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bangumi_group`
--

LOCK TABLES `bangumi_group` WRITE;
/*!40000 ALTER TABLE `bangumi_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `bangumi_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bangumi_video`
--

DROP TABLE IF EXISTS `bangumi_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bangumi_video` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(126) DEFAULT NULL COMMENT '名字',
  `des` varchar(512) DEFAULT NULL COMMENT '描述',
  `extension` varchar(16) DEFAULT NULL COMMENT '扩展名，不带‘.’号',
  `path` varchar(512) DEFAULT NULL COMMENT '完整路径',
  `addtime` varchar(20) DEFAULT NULL COMMENT '添加时间',
  `cover` varchar(512) DEFAULT NULL COMMENT '封面路径',
  `size` bigint(20) NOT NULL DEFAULT '0' COMMENT '视频尺寸，kb',
  `belong` int(10) NOT NULL DEFAULT '0' COMMENT '是否是某个番剧的合集',
  `part` int(10) NOT NULL DEFAULT '0' COMMENT '视频序号，合集视频有序号，其他没有',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='番剧视频';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bangumi_video`
--

LOCK TABLES `bangumi_video` WRITE;
/*!40000 ALTER TABLE `bangumi_video` DISABLE KEYS */;
/*!40000 ALTER TABLE `bangumi_video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collection`
--

DROP TABLE IF EXISTS `collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `collection` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '番剧id',
  `name` varchar(128) DEFAULT NULL COMMENT '番剧名称',
  `cover` varchar(512) DEFAULT NULL COMMENT '番剧封面\n',
  `time` varchar(20) DEFAULT NULL COMMENT '最后更新时间\n',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='合集表，区分与番剧表，合集针对非番剧的系列视频集合';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(45) NOT NULL COMMENT '账号',
  `pwd` varchar(64) NOT NULL COMMENT '密码Md5,由客户端计算完成,防止传输过程中显示明文密码',
  `name` varchar(64) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `icon` varchar(512) DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'111','111',NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `video` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(126) DEFAULT NULL COMMENT '名字',
  `des` varchar(512) DEFAULT NULL COMMENT '描述',
  `extension` varchar(16) DEFAULT NULL COMMENT '扩展名，不带‘.’号',
  `path` varchar(512) DEFAULT NULL COMMENT '完整路径',
  `addtime` varchar(20) DEFAULT NULL COMMENT '添加时间',
  `cover` varchar(512) DEFAULT NULL COMMENT '封面路径',
  `size` bigint(20) NOT NULL DEFAULT '0' COMMENT '视频尺寸，kb',
  `belong` int(10) NOT NULL DEFAULT '0' COMMENT '是否是某个番剧的合集',
  `part` int(10) NOT NULL DEFAULT '0' COMMENT '视频序号，合集视频有序号，其他没有',
  `uid` int(11) NOT NULL COMMENT '上传者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='零碎视频或视频合集';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-15 19:09:47
