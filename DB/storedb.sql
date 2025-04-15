/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80040 (8.0.40)
 Source Host           : localhost:3306
 Source Schema         : storedb

 Target Server Type    : MySQL
 Target Server Version : 80040 (8.0.40)
 File Encoding         : 65001

 Date: 13/04/2025 22:37:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for BookImages
-- ----------------------------
DROP TABLE IF EXISTS `BookImages`;
CREATE TABLE `BookImages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `bookId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bookId` (`bookId`),
  CONSTRAINT `bookimages_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `Books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of BookImages
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for Books
-- ----------------------------
DROP TABLE IF EXISTS `Books`;
CREATE TABLE `Books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `isbn` varchar(255) DEFAULT NULL,
  `price` int NOT NULL,
  `condition` enum('全新','良好','一般','破損') NOT NULL DEFAULT '良好',
  `description` text,
  `status` enum('selling','sold','reserved') NOT NULL DEFAULT 'selling',
  `soldAt` datetime DEFAULT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Books
-- ----------------------------
BEGIN;
INSERT INTO `Books` (`id`, `title`, `author`, `isbn`, `price`, `condition`, `description`, `status`, `soldAt`, `userId`, `createdAt`, `updatedAt`) VALUES (1, '數據結構', '作者1', '123456789', 300, '良好', '這是一本關於數據結構的好書', 'selling', NULL, 1, '2025-04-13 18:44:32', '2025-04-13 18:44:32');
INSERT INTO `Books` (`id`, `title`, `author`, `isbn`, `price`, `condition`, `description`, `status`, `soldAt`, `userId`, `createdAt`, `updatedAt`) VALUES (2, '演算法設計', '作者2', '987654321', 400, '全新', '這是一本關於演算法的好書', 'sold', '2025-04-13 13:48:51', 1, '2025-04-13 18:44:32', '2025-04-13 13:48:51');
INSERT INTO `Books` (`id`, `title`, `author`, `isbn`, `price`, `condition`, `description`, `status`, `soldAt`, `userId`, `createdAt`, `updatedAt`) VALUES (3, '書本1', 'ABC', '0123456', 555, '全新', '1111', 'sold', '2025-04-13 14:24:14', 3, '2025-04-13 10:50:59', '2025-04-13 14:24:14');
INSERT INTO `Books` (`id`, `title`, `author`, `isbn`, `price`, `condition`, `description`, `status`, `soldAt`, `userId`, `createdAt`, `updatedAt`) VALUES (4, '測試書籍1', '001', '002', 300, '全新', '777', 'selling', NULL, 3, '2025-04-13 13:50:54', '2025-04-13 13:50:54');
INSERT INTO `Books` (`id`, `title`, `author`, `isbn`, `price`, `condition`, `description`, `status`, `soldAt`, `userId`, `createdAt`, `updatedAt`) VALUES (5, '測試書籍2', '555', '666', 777, '良好', '111', 'selling', NULL, 3, '2025-04-13 13:51:11', '2025-04-13 13:51:11');
INSERT INTO `Books` (`id`, `title`, `author`, `isbn`, `price`, `condition`, `description`, `status`, `soldAt`, `userId`, `createdAt`, `updatedAt`) VALUES (6, '測試書籍3', '333', '444', 741, '良好', '111', 'selling', NULL, 3, '2025-04-13 13:51:25', '2025-04-13 13:51:25');
INSERT INTO `Books` (`id`, `title`, `author`, `isbn`, `price`, `condition`, `description`, `status`, `soldAt`, `userId`, `createdAt`, `updatedAt`) VALUES (7, '測試書籍4', '888', '777', 666, '良好', 'QQ', 'sold', '2025-04-13 13:59:39', 3, '2025-04-13 13:51:50', '2025-04-13 13:59:39');
INSERT INTO `Books` (`id`, `title`, `author`, `isbn`, `price`, `condition`, `description`, `status`, `soldAt`, `userId`, `createdAt`, `updatedAt`) VALUES (8, '測試書籍1', '001', '002', 300, '全新', '777', 'selling', NULL, 3, '2025-04-13 13:50:54', '2025-04-13 13:50:54');
INSERT INTO `Books` (`id`, `title`, `author`, `isbn`, `price`, `condition`, `description`, `status`, `soldAt`, `userId`, `createdAt`, `updatedAt`) VALUES (9, '測試書籍1', '001', '002', 300, '全新', '777', 'selling', NULL, 3, '2025-04-13 13:50:54', '2025-04-13 13:50:54');
INSERT INTO `Books` (`id`, `title`, `author`, `isbn`, `price`, `condition`, `description`, `status`, `soldAt`, `userId`, `createdAt`, `updatedAt`) VALUES (10, '測試書籍1', '001', '002', 300, '全新', '777', 'selling', NULL, 3, '2025-04-13 13:50:54', '2025-04-13 13:50:54');
COMMIT;

-- ----------------------------
-- Table structure for carousel
-- ----------------------------
DROP TABLE IF EXISTS `carousel`;
CREATE TABLE `carousel` (
  `carousel_id` int NOT NULL AUTO_INCREMENT,
  `imgPath` char(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `describes` char(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`carousel_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of carousel
-- ----------------------------
BEGIN;
INSERT INTO `carousel` (`carousel_id`, `imgPath`, `describes`) VALUES (1, 'public/imgs/cms_1.jpg', '1');
INSERT INTO `carousel` (`carousel_id`, `imgPath`, `describes`) VALUES (2, 'public/imgs/cms_2.jpg', '1');
INSERT INTO `carousel` (`carousel_id`, `imgPath`, `describes`) VALUES (3, 'public/imgs/cms_3.jpg', '1');
INSERT INTO `carousel` (`carousel_id`, `imgPath`, `describes`) VALUES (4, 'public/imgs/cms_4.jpg', '1');
COMMIT;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` char(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`category_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of category
-- ----------------------------
BEGIN;
INSERT INTO `category` (`category_id`, `category_name`) VALUES (1, '網頁開發');
INSERT INTO `category` (`category_id`, `category_name`) VALUES (2, 'IT鐵人賽');
INSERT INTO `category` (`category_id`, `category_name`) VALUES (3, '前後端開發');
INSERT INTO `category` (`category_id`, `category_name`) VALUES (4, '筆記軟體');
INSERT INTO `category` (`category_id`, `category_name`) VALUES (5, '開學書籍');
INSERT INTO `category` (`category_id`, `category_name`) VALUES (6, '資訊管理用書');
INSERT INTO `category` (`category_id`, `category_name`) VALUES (7, '暢銷書籍');
INSERT INTO `category` (`category_id`, `category_name`) VALUES (8, '計算機概論');
COMMIT;

-- ----------------------------
-- Table structure for Orders
-- ----------------------------
DROP TABLE IF EXISTS `Orders`;
CREATE TABLE `Orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderNo` varchar(255) DEFAULT NULL,
  `bookId` int NOT NULL,
  `buyerId` int NOT NULL,
  `sellerId` int NOT NULL,
  `totalAmount` int NOT NULL,
  `status` enum('pending','paid','cancelled') DEFAULT 'pending',
  `paymentAmount` int DEFAULT NULL,
  `paymentDate` datetime DEFAULT NULL,
  `paymentType` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orderNo` (`orderNo`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Orders
-- ----------------------------
BEGIN;
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (1, 'BOOK1744550154401970', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:15:54', '2025-04-13 13:15:54');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (2, 'BOOK1744550158453158', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:15:58', '2025-04-13 13:15:58');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (3, 'BOOK1744550179445208', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:16:19', '2025-04-13 13:16:19');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (4, 'BOOK1744550321624989', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:18:41', '2025-04-13 13:18:41');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (5, 'BOOK1744550335086324', 3, 4, 3, 555, 'paid', 555, '2025-04-13 14:24:14', 'CREDIT', '2025-04-13 13:18:55', '2025-04-13 14:24:14');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (6, 'BOOK1744550368725971', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:19:28', '2025-04-13 13:19:28');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (7, 'BOOK1744550375519635', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:19:35', '2025-04-13 13:19:35');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (8, 'BOOK1744550479323229', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:21:19', '2025-04-13 13:21:19');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (9, 'BOOK1744550485245346', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:21:25', '2025-04-13 13:21:25');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (10, 'BOOK174455055322314', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:22:33', '2025-04-13 13:22:33');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (11, 'BOOK1744550597957108', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:23:17', '2025-04-13 13:23:17');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (12, 'BOOK1744550612708933', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:23:32', '2025-04-13 13:23:32');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (13, 'BOOK1744550659270445', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:24:19', '2025-04-13 13:24:19');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (14, 'BOOK1744550663278696', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:24:23', '2025-04-13 13:24:23');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (15, 'BOOK1744550710763641', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:25:10', '2025-04-13 13:25:10');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (16, 'BOOK1744550802647259', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:26:42', '2025-04-13 13:26:42');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (17, 'BOOK1744550819542351', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:26:59', '2025-04-13 13:26:59');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (18, 'BOOK1744551052033220', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:30:52', '2025-04-13 13:30:52');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (19, 'BOOK1744551063296451', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:31:03', '2025-04-13 13:31:03');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (20, 'BOOK1744551123033725', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:32:03', '2025-04-13 13:32:03');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (21, 'BOOK1744551139133951', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:32:19', '2025-04-13 13:32:19');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (22, 'BOOK174455115439373', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:32:34', '2025-04-13 13:32:34');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (23, 'BOOK1744551167548787', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:32:47', '2025-04-13 13:32:47');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (24, 'BOOK174455121210220', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:33:32', '2025-04-13 13:33:32');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (25, 'BOOK1744551259558791', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:34:19', '2025-04-13 13:34:19');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (26, 'BOOK1744551276568534', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:34:36', '2025-04-13 13:34:36');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (27, 'BOOK1744551288798335', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:34:48', '2025-04-13 13:34:48');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (28, 'BOOK1744551327397295', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:35:27', '2025-04-13 13:35:27');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (29, 'BOOK1744551353217251', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:35:53', '2025-04-13 13:35:53');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (30, 'BOOK174455136486043', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:36:04', '2025-04-13 13:36:04');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (31, 'BOOK1744551522593744', 3, 4, 3, 555, 'pending', NULL, NULL, NULL, '2025-04-13 13:38:42', '2025-04-13 13:38:42');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (32, 'BOOK1744551682043408', 3, 4, 3, 555, 'paid', 555, '2025-04-13 13:41:32', 'CREDIT', '2025-04-13 13:41:22', '2025-04-13 13:41:32');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (33, 'BOOK1744552125531452', 2, 4, 1, 400, 'paid', 400, '2025-04-13 13:48:51', 'CREDIT', '2025-04-13 13:48:45', '2025-04-13 13:48:51');
INSERT INTO `Orders` (`id`, `orderNo`, `bookId`, `buyerId`, `sellerId`, `totalAmount`, `status`, `paymentAmount`, `paymentDate`, `paymentType`, `createdAt`, `updatedAt`) VALUES (34, 'BOOK1744552763801464', 7, 4, 3, 666, 'paid', 666, '2025-04-13 13:59:39', 'CREDIT', '2025-04-13 13:59:23', '2025-04-13 13:59:39');
COMMIT;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` char(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `category_id` int NOT NULL,
  `product_title` char(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `product_intro` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `product_picture` char(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `product_price` double NOT NULL,
  `product_selling_price` double NOT NULL,
  `product_num` int NOT NULL,
  `product_sales` int NOT NULL,
  PRIMARY KEY (`product_id`) USING BTREE,
  KEY `FK_product_category` (`category_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of product
-- ----------------------------
BEGIN;
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (1, '前端開發測試入門｜現在知道也還不遲的自動化測試策略必備知識', 1, '現在的Web應用程式都需要在畫面上提供越來越高階的功能', 'UI元件測試 / 視覺回歸測試 / E2E測試 / 提升無障礙性 / 在持續整合環境執行測試', 'public/imgs/web/picture/web1.webp', 458, 458, 10, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (2, '用 ChatGPT 詠唱來點亮 React ＆ 前端技能樹', 1, '改寫自第15屆iThome鐵人賽自我挑戰組熱門文章', 'ChatGPT / JavaScript / TypeScript / React', 'public/imgs/web/picture/web2.webp', 880, 880, 10, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (3, '今晚來點 Web 前端效能優化大補帖', 1, '一次搞定指標工具技巧打造超高速網站', 'Core Web Vitals / RAIL Model / Lighthouse', 'public/imgs/web/picture/web3.webp', 650, 507, 20, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (4, 'Beyond XSS：探索網頁前端資安宇宙', 1, '相信我前端工程師所接觸到的前端只是整個網頁前端的冰山一角', 'Vue / JavaScript / TypeScript', 'public/imgs/web/picture/web4.webp', 880, 695, 20, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (5, 'Type Script + Vue.js 一氣呵成', 1, '前端開發大白到大神', 'Vue / JavaScript / TypeScript', 'public/imgs/web/picture/web5.webp', 900, 711, 20, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (6, 'React 思維進化', 1, '一次打破常見的觀念誤解躍升專業前端開發者', 'JavaScript / TypeScript / React', 'public/imgs/web/picture/web6.webp', 750, 563, 20, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (7, '前端測試指南：策略與實踐', 1, '深入介紹前端網頁測試的基本概念測試技術', '測試入門 / 單元測試 / 整合測試 / 端對端測試 / 視覺測試', 'public/imgs/web/picture/web7.webp', 650, 507, 20, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (8, '前端開發資安入門｜你不能忽視的漏洞對策必備知識', 1, '建立Web應用程式資安壁壘必備知識集大成', 'Web資安 / HTTP / XXS', 'public/imgs/web/picture/web8.webp', 520, 411, 20, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (9, '金魚都能懂的 CSS 必學屬性', 1, '金網頁設計必備寶典', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 009', 'public/imgs/web/picture/web9.webp', 720, 562, 10, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (10, '跨框架提昇開發高度', 1, '前端高級架構師應具備的思想及技能', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 010', 'public/imgs/web/picture/web10.webp', 880, 695, 10, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (11, '看完這本就會懂！帶你無痛提升 JavaScript 面試力', 1, '精選 55道前端工程師的核心問題 × 求職加分模擬試題解析', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 011', 'public/imgs/web/picture/web11.webp', 680, 530, 10, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (12, '0 陷阱！0 誤解！8 天重新認識 JavaScript！', 1, '一起重新認識：「世界上最被人誤解的程式語言」', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 012', 'public/imgs/web/picture/web12.webp', 550, 429, 10, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (13, 'WordPress 超圖解 + No-code 7堂課', 2, '不只打造優質專業網站，還要帶你經營獲利與擁抱社群', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 013', 'public/imgs/ITHome/ITHome1.jpg', 650, 507, 10, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (14, '不可不知的 Flutter App 自動化測試實戰攻略', 2, '從設計到測試、維持產品品質的高效實踐', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 014', 'public/imgs/ITHome/ITHome2.jpg', 650, 507, 10, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (15, 'dbt 與 Analytics Engineering 實戰手冊', 2, '從零打造現代資料分析架構及專業職涯', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 015', 'public/imgs/ITHome/ITHome3.jpg', 650, 507, 10, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (16, '翻轉職涯！雲端 / DevOps / SRE 工程師轉職必殺技', 3, '四大步驟帶你找出職能優勢、成功精準轉職的規劃指南', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 016', 'public/imgs/ITHome/ITHome4.jpg', 650, 507, 20, 10);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (17, 'Redmine 專案管理無痛攻略', 3, '70個問題集 x 專屬教學影片，從入門到精通一本全搞定！', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 017', 'public/imgs/ITHome/ITHome5.jpg', 650, 507, 20, 8);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (18, '資深 PM 的十堂產品煉金術', 4, '從面試到 AI 應用的全方位指南，外商思維', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 018', 'public/imgs/ITHome/ITHome6.jpg', 650, 507, 20, 7);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (19, 'ChatGPT × Ionic × Angular 全方位技術整合實戰', 5, '輕鬆打造跨平台 AI 英語口說導師 APP', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 019', 'public/imgs/ITHome/ITHome7.jpg', 650, 507, 20, 10);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (20, '即學即用！精選 30招辦公室超高效 AI 生產術', 5, '使用ChatGPTCopilotWordExcelGamma', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 020', 'public/imgs/ITHome/ITHome8.jpg', 650, 507, 20, 10);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (21, '多團隊高效協作密技', 6, '大規模敏捷開發方法 Large Scale Scrum', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 021', 'public/imgs/ITHome/ITHome9.jpg', 650, 507, 20, 9);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (22, 'Web3 專業開發者教你如何守護數位資產', 6, '30種詐騙攻防手法全面解析', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 022', 'public/imgs/ITHome/ITHome10.jpg', 650, 507, 20, 9);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (23, '可觀測性入門指南', 7, 'Logs、Metrics、Traces 三大實戰應用', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 023', 'public/imgs/ITHome/ITHome11.jpg', 650, 507, 20, 8);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (24, '營養師不開菜單後的 Next.js 全端轉職攻略', 7, '從專案規劃、畫面設計、資安到 SEO', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 024', 'public/imgs/ITHome/ITHome12.jpg', 650, 507, 20, 8);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (25, 'SRE 工作現場直擊!', 7, '維運起點 x 實戰經驗 x 職涯規劃面面觀', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 025', 'public/imgs/ITHome/ITHome13.jpg', 650, 507, 20, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (26, 'LLM 大型語言模型的絕世祕笈', 7, '27路獨步劍法，帶你闖蕩生成式 AI 的五湖四海', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 026', 'public/imgs/ITHome/ITHome14.jpg', 650, 507, 20, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (27, '顧問教你做 Odoo 在台教戰手冊', 7, '完整圖解流程與實戰案例', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 027', 'public/imgs/ITHome/ITHome15.jpg', 650, 507, 20, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (28, '從零開始 OCS Inventory', 7, '打造資訊資產管理 × 資安 CVE 漏洞通報', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 028', 'public/imgs/ITHome/ITHome16.jpg', 650, 507, 20, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (29, 'Notion 全方位管理術', 7, '任務管理 × 收支記帳 × 知識筆記', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 029', 'public/imgs/ITHome/ITHome17.jpg', 650, 507, 20, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (30, 'OpenTelemetry 入門指南', 8, '建立全面可觀測性架構', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 030', 'public/imgs/ITHome/ITHome18.jpg', 650, 507, 20, 8);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (31, '職涯履歷進化論', 5, '探索職涯轉型與 App 重新設計的奇幻之旅', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 031', 'public/imgs/ITHome/ITHome19.jpg', 650, 507, 20, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (32, '打通 RxJS 任督二脈', 5, '從菜雞前進老鳥必學的關鍵知識', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 032', 'public/imgs/ITHome/ITHome20.jpg', 650, 507, 20, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (33, '全端網站開發筆記', 5, '活用 MERN 技術，打造制霸全球的動態網站', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 033', 'public/imgs/ITHome/ITHome21.jpg', 650, 507, 20, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (34, 'React 思維進化', 5, '一次打破常見的觀念誤解，躍升專業前端開發者', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 034', 'public/imgs/ITHome/ITHome22.jpg', 650, 507, 20, 0);
INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `product_title`, `product_intro`, `product_picture`, `product_price`, `product_selling_price`, `product_num`, `product_sales`) VALUES (35, '從異世界歸來發現只剩自己不會 Kubernetes', 5, '初心者進入雲端世界的實戰攻略！', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 035', 'public/imgs/ITHome/ITHome23.jpg', 650, 507, 20, 0);
COMMIT;

-- ----------------------------
-- Table structure for product_picture
-- ----------------------------
DROP TABLE IF EXISTS `product_picture`;
CREATE TABLE `product_picture` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `product_picture` char(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `intro` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_product_id` (`product_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of product_picture
-- ----------------------------
BEGIN;
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (1, 1, 'public/imgs/web/picture/web1-1.webp', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (2, 1, 'public/imgs/web/picture/web1-2.webp', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (3, 2, 'public/imgs/web/picture/web2-1.webp', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (4, 2, 'public/imgs/web/picture/web2-2.webp', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (5, 3, 'public/imgs/web/picture/web3-1.webp', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (6, 3, 'public/imgs/web/picture/web3-2.png', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (7, 4, 'public/imgs/web/picture/web4-1.png', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (8, 4, 'public/imgs/web/picture/web4-2.png', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (9, 5, 'public/imgs/web/picture/web5-1.png', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (10, 5, 'public/imgs/web/picture/web5-2.png', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (11, 6, 'public/imgs/web/picture/web6-1.png', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (12, 6, 'public/imgs/web/picture/web6-2.png', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (13, 7, 'public/imgs/web/picture/web7-1.png', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (14, 7, 'public/imgs/web/picture/web7-2.png', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (15, 8, 'public/imgs/web/picture/web8-1.png', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (16, 8, 'public/imgs/web/picture/web8-2.png', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (17, 9, 'public/imgs/web/picture/web9-1.png', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (18, 9, 'public/imgs/web/picture/web9-2.png', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (19, 10, 'public/imgs/web/picture/web10-1.png', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (20, 10, 'public/imgs/web/picture/web10-2.png', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (21, 11, 'public/imgs/web/picture/web11-1.png', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (22, 11, 'public/imgs/web/picture/web11-2.png', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (23, 12, 'public/imgs/web/picture/web12-1.png', NULL);
INSERT INTO `product_picture` (`id`, `product_id`, `product_picture`, `intro`) VALUES (24, 12, 'public/imgs/web/picture/web12-2.png', NULL);
COMMIT;

-- ----------------------------
-- Table structure for Transactions
-- ----------------------------
DROP TABLE IF EXISTS `Transactions`;
CREATE TABLE `Transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bookId` int NOT NULL,
  `sellerId` int NOT NULL,
  `buyerId` int NOT NULL,
  `status` enum('pending','completed','cancelled') NOT NULL DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bookId` (`bookId`),
  KEY `sellerId` (`sellerId`),
  KEY `buyerId` (`buyerId`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `Books` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`sellerId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`buyerId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Transactions
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for Users
-- ----------------------------
DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `bio` text,
  `avatar` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Users
-- ----------------------------
BEGIN;
INSERT INTO `Users` (`id`, `username`, `email`, `password`, `phone`, `department`, `bio`, `avatar`, `createdAt`, `updatedAt`) VALUES (1, 'test_user', 'test@example.com', '$2a$10$YOUR_HASHED_PASSWORD', NULL, NULL, NULL, NULL, '2025-04-13 18:44:32', '2025-04-13 18:44:32');
INSERT INTO `Users` (`id`, `username`, `email`, `password`, `phone`, `department`, `bio`, `avatar`, `createdAt`, `updatedAt`) VALUES (3, 'test1', 'test1@gmail.com', '$2a$10$p8Nm9zk6X69nzSypEwE.8OwLE/lrxnM3PHDSFnS9KbVvs2cibaz9S', NULL, NULL, NULL, NULL, '2025-04-13 10:48:33', '2025-04-13 10:48:33');
INSERT INTO `Users` (`id`, `username`, `email`, `password`, `phone`, `department`, `bio`, `avatar`, `createdAt`, `updatedAt`) VALUES (4, 'test2', 'test2@gmail.com', '$2a$10$qMj3ErghRn6sUrZGNE9xoel2xukMnB/2xuk/rmALsGUyN1mz0jtJO', NULL, NULL, NULL, NULL, '2025-04-13 10:52:02', '2025-04-13 10:52:02');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
