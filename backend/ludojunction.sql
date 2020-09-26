-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2020 at 03:29 AM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ludojunction`
--

-- --------------------------------------------------------

--
-- Table structure for table `challenges`
--

CREATE TABLE `challenges` (
  `id` int(11) NOT NULL,
  `sender` int(11) NOT NULL,
  `receiver` int(11) DEFAULT NULL,
  `winner` int(11) DEFAULT NULL,
  `amount` double NOT NULL,
  `room` varchar(255) DEFAULT NULL,
  `state` enum('PENDING','ACTIVE','COMPLETED','REJECTED','ACCEPTED') NOT NULL DEFAULT 'PENDING',
  `postedOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `screenshot` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `challenges`
--

INSERT INTO `challenges` (`id`, `sender`, `receiver`, `winner`, `amount`, `room`, `state`, `postedOn`, `screenshot`) VALUES
(19, 11, 9, 11, 10, '251352', 'COMPLETED', '2020-09-20 18:58:49', '../assets/19.jpg'),
(20, 11, 9, 9, 10, '25235120', 'COMPLETED', '2020-09-21 17:04:05', '../assets/20.jpg'),
(21, 11, 9, 11, 50, '23536', 'COMPLETED', '2020-09-21 17:12:13', '../assets/21.jpg'),
(22, 9, NULL, NULL, 10, NULL, 'PENDING', '2020-09-22 18:49:54', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `postedOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `fromUser` int(11) NOT NULL,
  `toUser` int(11) NOT NULL,
  `amount` double DEFAULT 0,
  `description` text NOT NULL,
  `fromBalance` double NOT NULL,
  `toBalance` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `postedOn`, `fromUser`, `toUser`, `amount`, `description`, `fromBalance`, `toBalance`) VALUES
(12, '2020-09-20 18:56:09', 11, 1, 10, 'New Challenge Created #0', 90, 10),
(13, '2020-09-20 18:57:16', 9, 1, 10, 'New Challenge Created #0', 90, 20),
(14, '2020-09-20 18:57:44', 9, 1, 10, 'New Challenge Created #0', 80, 30),
(15, '2020-09-20 18:58:49', 11, 1, 10, 'New Challenge Created #19', 80, 40),
(16, '2020-09-20 18:59:35', 9, 1, 10, 'Accepted Challenge #19', 70, 50),
(17, '2020-09-20 19:02:49', 1, 11, 19, 'Won Challenge #19', 89, -57),
(18, '2020-09-21 17:04:05', 11, 1, 10, 'New Challenge Created #20', 79, -47),
(19, '2020-09-21 17:04:11', 9, 1, 10, 'Accepted Challenge #20', 60, -37),
(20, '2020-09-21 17:04:57', 1, 9, 19, 'Won Challenge #20', 79, -56),
(21, '2020-09-21 17:12:13', 11, 1, 50, 'New Challenge Created #21', 29, -6),
(22, '2020-09-21 17:12:27', 9, 1, 50, 'Accepted Challenge #21', 29, 44),
(23, '2020-09-21 17:13:14', 1, 11, 95, 'Won Challenge #21', 124, -51),
(24, '2020-09-22 18:49:54', 9, 1, 10, 'New Challenge Created #22', 19, -41);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `mobile` char(10) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` char(64) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `state` enum('ACTIVE','INACTIVE','BANNED') NOT NULL DEFAULT 'INACTIVE',
  `balance` double NOT NULL DEFAULT 0,
  `token` char(32) DEFAULT NULL,
  `generatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `referrer` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `title`, `mobile`, `email`, `password`, `isAdmin`, `state`, `balance`, `token`, `generatedOn`, `referrer`) VALUES
(1, 'Prateek kher', '9425760707', 'prateek.kher@gmail.com', '38dc247ac87f947df93138e185a6f68ce7762293f00bf90f9c9c29bfa3a48d82', 1, 'ACTIVE', -41, 'ffaf399f07ec935d069957815dd07487', '2020-09-23 17:00:05', NULL),
(9, 'Demo User', '9144268770', 'demo@demo.com', 'befc9d76f470561584a50976294323e05f13577b63b74ac0f7c93d0abe5d2ac5', 0, 'ACTIVE', 19, 'bb51da345be495553a7772689cadbb97', '2020-09-23 17:01:07', NULL),
(11, 'Prateek 2', '9826286879', 'prateek@gmail.com', '38dc247ac87f947df93138e185a6f68ce7762293f00bf90f9c9c29bfa3a48d82', 0, 'ACTIVE', 124, '49d7fbfea59c5e7dfe6bf536da48d6aa', '2020-09-22 18:21:31', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_request`
--

CREATE TABLE `user_request` (
  `id` int(11) NOT NULL,
  `otp` char(8) NOT NULL,
  `generatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_request`
--

INSERT INTO `user_request` (`id`, `otp`, `generatedOn`) VALUES
(0, '3efc4bfd', '2020-09-20 10:07:22'),
(11, '201c4d94', '2020-09-20 10:07:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `challenges`
--
ALTER TABLE `challenges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender` (`sender`),
  ADD KEY `receiver` (`receiver`),
  ADD KEY `winner` (`winner`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fromUser` (`fromUser`),
  ADD KEY `toUser` (`toUser`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile` (`mobile`),
  ADD KEY `referrer` (`referrer`);

--
-- Indexes for table `user_request`
--
ALTER TABLE `user_request`
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `otp` (`otp`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `challenges`
--
ALTER TABLE `challenges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `challenges`
--
ALTER TABLE `challenges`
  ADD CONSTRAINT `challenges_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `challenges_ibfk_2` FOREIGN KEY (`receiver`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `challenges_ibfk_3` FOREIGN KEY (`winner`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`referrer`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
