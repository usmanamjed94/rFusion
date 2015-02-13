# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.17)
# Database: rFusion
# Generation Time: 2014-06-08 18:17:47 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Comments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Comments`;

CREATE TABLE `Comments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `diaryID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Diaries
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Diaries`;

CREATE TABLE `Diaries` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `story` text NOT NULL,
  `image` int(11) DEFAULT NULL,
  `userID` int(11) unsigned NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK Diaries` (`userID`),
  CONSTRAINT `FK Diaries` FOREIGN KEY (`userID`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table User
# ------------------------------------------------------------

DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(50) NOT NULL DEFAULT '',
  `bloodgroup` varchar(11) NOT NULL DEFAULT 'Nill',
  `willingness` varchar(50) NOT NULL DEFAULT 'Yes',
  `role` varchar(40) NOT NULL DEFAULT 'User',
  `name` varchar(50) NOT NULL DEFAULT '',
  `phone` varchar(50) NOT NULL DEFAULT '',
  `longitude` double NOT NULL DEFAULT '33.689401',
  `lattitude` double NOT NULL DEFAULT '33.689401',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_uniquer` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;

INSERT INTO `User` (`id`, `email`, `password`, `bloodgroup`, `willingness`, `role`, `name`, `phone`, `longitude`, `lattitude`)
VALUES
	(14,'usmanamjed94@gmail.com','Hello123','A+','Yes','User','Usman Amjed','03235952091',72.9888854,33.6461599),
	(15,'jen.khakwani19@gmail.com','Hello121','B+','Yes','User','Zainab Kainat','03335617775',72.989255,33.646121),
	(17,'jinxed4eve@hotmail.com','Hello121','A+','Yes','User','Usman Second','03335617775',72.990345,33.683574),
	(18,'11beseuamjed@seecs.edu.pk','Hello121','A+','Yes','User','Usman Second','03335617775',72.999201,33.709247),
	(29,'rayanamjed@gmail.com','HiBeta','A+','Yes','User','Rayan Amjed','03235647892',73.006382,33.690638),
	(31,'raheen@hotmail.com','Hello1','A+','No','User','Raheen Amjed','031212812',73.006382,33.690638);

/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
