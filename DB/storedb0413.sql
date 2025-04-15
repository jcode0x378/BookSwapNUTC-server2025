/*
 Navicat Premium Dump SQL

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80041 (8.0.41)
 Source Host           : localhost:3306
 Source Schema         : storedb

 Target Server Type    : MySQL
 Target Server Version : 80041 (8.0.41)
 File Encoding         : 65001

 Date: 13/04/2025 17:41:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bookimages
-- ----------------------------
DROP TABLE IF EXISTS `bookimages`;
CREATE TABLE `bookimages`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `bookId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `bookId`(`bookId` ASC) USING BTREE,
  CONSTRAINT `bookimages_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bookimages
-- ----------------------------

-- ----------------------------
-- Table structure for books
-- ----------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isbn` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `price` int NOT NULL,
  `condition` enum('全新','良好','一般','破損') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '良好',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `status` enum('selling','sold','reserved') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'selling',
  `soldAt` datetime NULL DEFAULT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userId`(`userId` ASC) USING BTREE,
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of books
-- ----------------------------

-- ----------------------------
-- Table structure for carousel
-- ----------------------------
DROP TABLE IF EXISTS `carousel`;
CREATE TABLE `carousel`  (
  `carousel_id` int NOT NULL AUTO_INCREMENT,
  `imgPath` char(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `describes` char(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`carousel_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of carousel
-- ----------------------------
INSERT INTO `carousel` VALUES (1, 'public/imgs/cms_1.jpg', '1');
INSERT INTO `carousel` VALUES (2, 'public/imgs/cms_2.jpg', '1');
INSERT INTO `carousel` VALUES (3, 'public/imgs/cms_3.jpg', '1');
INSERT INTO `carousel` VALUES (4, 'public/imgs/cms_4.jpg', '1');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` char(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`category_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '網頁開發');
INSERT INTO `category` VALUES (2, 'IT鐵人賽');
INSERT INTO `category` VALUES (3, '前後端開發');
INSERT INTO `category` VALUES (4, '筆記軟體');
INSERT INTO `category` VALUES (5, '開學書籍');
INSERT INTO `category` VALUES (6, '資訊管理用書');
INSERT INTO `category` VALUES (7, '暢銷書籍');
INSERT INTO `category` VALUES (8, '計算機概論');

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` char(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `category_id` int NOT NULL,
  `product_title` char(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `product_intro` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `product_picture` char(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `product_price` double NOT NULL,
  `product_selling_price` double NOT NULL,
  `product_num` int NOT NULL,
  `product_sales` int NOT NULL,
  PRIMARY KEY (`product_id`) USING BTREE,
  INDEX `FK_product_category`(`category_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (1, '前端開發測試入門｜現在知道也還不遲的自動化測試策略必備知識', 1, '現在的Web應用程式都需要在畫面上提供越來越高階的功能', 'UI元件測試 / 視覺回歸測試 / E2E測試 / 提升無障礙性 / 在持續整合環境執行測試', 'public/imgs/web/picture/web1.webp', 458, 458, 10, 0);
INSERT INTO `product` VALUES (2, '用 ChatGPT 詠唱來點亮 React ＆ 前端技能樹', 1, '改寫自第15屆iThome鐵人賽自我挑戰組熱門文章', 'ChatGPT / JavaScript / TypeScript / React', 'public/imgs/web/picture/web2.webp', 880, 880, 10, 0);
INSERT INTO `product` VALUES (3, '今晚來點 Web 前端效能優化大補帖', 1, '一次搞定指標工具技巧打造超高速網站', 'Core Web Vitals / RAIL Model / Lighthouse', 'public/imgs/web/picture/web3.webp', 650, 507, 20, 0);
INSERT INTO `product` VALUES (4, 'Beyond XSS：探索網頁前端資安宇宙', 1, '相信我前端工程師所接觸到的前端只是整個網頁前端的冰山一角', 'Vue / JavaScript / TypeScript', 'public/imgs/web/picture/web4.webp', 880, 695, 20, 0);
INSERT INTO `product` VALUES (5, 'Type Script + Vue.js 一氣呵成', 1, '前端開發大白到大神', 'Vue / JavaScript / TypeScript', 'public/imgs/web/picture/web5.webp', 900, 711, 20, 0);
INSERT INTO `product` VALUES (6, 'React 思維進化', 1, '一次打破常見的觀念誤解躍升專業前端開發者', 'JavaScript / TypeScript / React', 'public/imgs/web/picture/web6.webp', 750, 563, 20, 0);
INSERT INTO `product` VALUES (7, '前端測試指南：策略與實踐', 1, '深入介紹前端網頁測試的基本概念測試技術', '測試入門 / 單元測試 / 整合測試 / 端對端測試 / 視覺測試', 'public/imgs/web/picture/web7.webp', 650, 507, 20, 0);
INSERT INTO `product` VALUES (8, '前端開發資安入門｜你不能忽視的漏洞對策必備知識', 1, '建立Web應用程式資安壁壘必備知識集大成', 'Web資安 / HTTP / XXS', 'public/imgs/web/picture/web8.webp', 520, 411, 20, 0);
INSERT INTO `product` VALUES (9, '金魚都能懂的 CSS 必學屬性', 1, '金網頁設計必備寶典', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 009', 'public/imgs/web/picture/web9.webp', 720, 562, 10, 0);
INSERT INTO `product` VALUES (10, '跨框架提昇開發高度', 1, '前端高級架構師應具備的思想及技能', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 010', 'public/imgs/web/picture/web10.webp', 880, 695, 10, 0);
INSERT INTO `product` VALUES (11, '看完這本就會懂！帶你無痛提升 JavaScript 面試力', 1, '精選 55道前端工程師的核心問題 × 求職加分模擬試題解析', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 011', 'public/imgs/web/picture/web11.webp', 680, 530, 10, 0);
INSERT INTO `product` VALUES (12, '0 陷阱！0 誤解！8 天重新認識 JavaScript！', 1, '一起重新認識：「世界上最被人誤解的程式語言」', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 012', 'public/imgs/web/picture/web12.webp', 550, 429, 10, 0);
INSERT INTO `product` VALUES (13, 'WordPress 超圖解 + No-code 7堂課', 2, '不只打造優質專業網站，還要帶你經營獲利與擁抱社群', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 013', 'public/imgs/ITHome/ITHome1.jpg', 650, 507, 10, 0);
INSERT INTO `product` VALUES (14, '不可不知的 Flutter App 自動化測試實戰攻略', 2, '從設計到測試、維持產品品質的高效實踐', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 014', 'public/imgs/ITHome/ITHome2.jpg', 650, 507, 10, 0);
INSERT INTO `product` VALUES (15, 'dbt 與 Analytics Engineering 實戰手冊', 2, '從零打造現代資料分析架構及專業職涯', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 015', 'public/imgs/ITHome/ITHome3.jpg', 650, 507, 10, 0);
INSERT INTO `product` VALUES (16, '翻轉職涯！雲端 / DevOps / SRE 工程師轉職必殺技', 3, '四大步驟帶你找出職能優勢、成功精準轉職的規劃指南', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 016', 'public/imgs/ITHome/ITHome4.jpg', 650, 507, 20, 10);
INSERT INTO `product` VALUES (17, 'Redmine 專案管理無痛攻略', 3, '70個問題集 x 專屬教學影片，從入門到精通一本全搞定！', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 017', 'public/imgs/ITHome/ITHome5.jpg', 650, 507, 20, 8);
INSERT INTO `product` VALUES (18, '資深 PM 的十堂產品煉金術', 4, '從面試到 AI 應用的全方位指南，外商思維', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 018', 'public/imgs/ITHome/ITHome6.jpg', 650, 507, 20, 7);
INSERT INTO `product` VALUES (19, 'ChatGPT × Ionic × Angular 全方位技術整合實戰', 5, '輕鬆打造跨平台 AI 英語口說導師 APP', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 019', 'public/imgs/ITHome/ITHome7.jpg', 650, 507, 20, 10);
INSERT INTO `product` VALUES (20, '即學即用！精選 30招辦公室超高效 AI 生產術', 5, '使用ChatGPTCopilotWordExcelGamma', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 020', 'public/imgs/ITHome/ITHome8.jpg', 650, 507, 20, 10);
INSERT INTO `product` VALUES (21, '多團隊高效協作密技', 6, '大規模敏捷開發方法 Large Scale Scrum', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 021', 'public/imgs/ITHome/ITHome9.jpg', 650, 507, 20, 9);
INSERT INTO `product` VALUES (22, 'Web3 專業開發者教你如何守護數位資產', 6, '30種詐騙攻防手法全面解析', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 022', 'public/imgs/ITHome/ITHome10.jpg', 650, 507, 20, 9);
INSERT INTO `product` VALUES (23, '可觀測性入門指南', 7, 'Logs、Metrics、Traces 三大實戰應用', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 023', 'public/imgs/ITHome/ITHome11.jpg', 650, 507, 20, 8);
INSERT INTO `product` VALUES (24, '營養師不開菜單後的 Next.js 全端轉職攻略', 7, '從專案規劃、畫面設計、資安到 SEO', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 024', 'public/imgs/ITHome/ITHome12.jpg', 650, 507, 20, 8);
INSERT INTO `product` VALUES (25, 'SRE 工作現場直擊!', 7, '維運起點 x 實戰經驗 x 職涯規劃面面觀', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 025', 'public/imgs/ITHome/ITHome13.jpg', 650, 507, 20, 0);
INSERT INTO `product` VALUES (26, 'LLM 大型語言模型的絕世祕笈', 7, '27路獨步劍法，帶你闖蕩生成式 AI 的五湖四海', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 026', 'public/imgs/ITHome/ITHome14.jpg', 650, 507, 20, 0);
INSERT INTO `product` VALUES (27, '顧問教你做 Odoo 在台教戰手冊', 7, '完整圖解流程與實戰案例', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 027', 'public/imgs/ITHome/ITHome15.jpg', 650, 507, 20, 0);
INSERT INTO `product` VALUES (28, '從零開始 OCS Inventory', 7, '打造資訊資產管理 × 資安 CVE 漏洞通報', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 028', 'public/imgs/ITHome/ITHome16.jpg', 650, 507, 20, 0);
INSERT INTO `product` VALUES (29, 'Notion 全方位管理術', 7, '任務管理 × 收支記帳 × 知識筆記', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 029', 'public/imgs/ITHome/ITHome17.jpg', 650, 507, 20, 0);
INSERT INTO `product` VALUES (30, 'OpenTelemetry 入門指南', 8, '建立全面可觀測性架構', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 030', 'public/imgs/ITHome/ITHome18.jpg', 650, 507, 20, 8);
INSERT INTO `product` VALUES (31, '職涯履歷進化論', 5, '探索職涯轉型與 App 重新設計的奇幻之旅', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 031', 'public/imgs/ITHome/ITHome19.jpg', 650, 507, 20, 0);
INSERT INTO `product` VALUES (32, '打通 RxJS 任督二脈', 5, '從菜雞前進老鳥必學的關鍵知識', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 032', 'public/imgs/ITHome/ITHome20.jpg', 650, 507, 20, 0);
INSERT INTO `product` VALUES (33, '全端網站開發筆記', 5, '活用 MERN 技術，打造制霸全球的動態網站', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 033', 'public/imgs/ITHome/ITHome21.jpg', 650, 507, 20, 0);
INSERT INTO `product` VALUES (34, 'React 思維進化', 5, '一次打破常見的觀念誤解，躍升專業前端開發者', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 034', 'public/imgs/ITHome/ITHome22.jpg', 650, 507, 20, 0);
INSERT INTO `product` VALUES (35, '從異世界歸來發現只剩自己不會 Kubernetes', 5, '初心者進入雲端世界的實戰攻略！', '商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 商品內容 / 035', 'public/imgs/ITHome/ITHome23.jpg', 650, 507, 20, 0);

-- ----------------------------
-- Table structure for product_picture
-- ----------------------------
DROP TABLE IF EXISTS `product_picture`;
CREATE TABLE `product_picture`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `product_picture` char(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `intro` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_product_id`(`product_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 111 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of product_picture
-- ----------------------------
INSERT INTO `product_picture` VALUES (1, 1, 'public/imgs/web/picture/web1-1.webp', NULL);
INSERT INTO `product_picture` VALUES (2, 1, 'public/imgs/web/picture/web1-2.webp', NULL);
INSERT INTO `product_picture` VALUES (3, 2, 'public/imgs/web/picture/web2-1.webp', NULL);
INSERT INTO `product_picture` VALUES (4, 2, 'public/imgs/web/picture/web2-2.webp', NULL);
INSERT INTO `product_picture` VALUES (5, 3, 'public/imgs/web/picture/web3-1.webp', NULL);
INSERT INTO `product_picture` VALUES (6, 3, 'public/imgs/web/picture/web3-2.png', NULL);
INSERT INTO `product_picture` VALUES (7, 4, 'public/imgs/web/picture/web4-1.png', NULL);
INSERT INTO `product_picture` VALUES (8, 4, 'public/imgs/web/picture/web4-2.png', NULL);
INSERT INTO `product_picture` VALUES (9, 5, 'public/imgs/web/picture/web5-1.png', NULL);
INSERT INTO `product_picture` VALUES (10, 5, 'public/imgs/web/picture/web5-2.png', NULL);
INSERT INTO `product_picture` VALUES (11, 6, 'public/imgs/web/picture/web6-1.png', NULL);
INSERT INTO `product_picture` VALUES (12, 6, 'public/imgs/web/picture/web6-2.png', NULL);
INSERT INTO `product_picture` VALUES (13, 7, 'public/imgs/web/picture/web7-1.png', NULL);
INSERT INTO `product_picture` VALUES (14, 7, 'public/imgs/web/picture/web7-2.png', NULL);
INSERT INTO `product_picture` VALUES (15, 8, 'public/imgs/web/picture/web8-1.png', NULL);
INSERT INTO `product_picture` VALUES (16, 8, 'public/imgs/web/picture/web8-2.png', NULL);
INSERT INTO `product_picture` VALUES (17, 9, 'public/imgs/web/picture/web9-1.png', NULL);
INSERT INTO `product_picture` VALUES (18, 9, 'public/imgs/web/picture/web9-2.png', NULL);
INSERT INTO `product_picture` VALUES (19, 10, 'public/imgs/web/picture/web10-1.png', NULL);
INSERT INTO `product_picture` VALUES (20, 10, 'public/imgs/web/picture/web10-2.png', NULL);
INSERT INTO `product_picture` VALUES (21, 11, 'public/imgs/web/picture/web11-1.png', NULL);
INSERT INTO `product_picture` VALUES (22, 11, 'public/imgs/web/picture/web11-2.png', NULL);
INSERT INTO `product_picture` VALUES (23, 12, 'public/imgs/web/picture/web12-1.png', NULL);
INSERT INTO `product_picture` VALUES (24, 12, 'public/imgs/web/picture/web12-2.png', NULL);

-- ----------------------------
-- Table structure for shoppingcart
-- ----------------------------
DROP TABLE IF EXISTS `shoppingcart`;
CREATE TABLE `shoppingcart`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `num` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_user_id`(`user_id` ASC) USING BTREE,
  INDEX `FK_shoppingCart_id`(`product_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of shoppingcart
-- ----------------------------
INSERT INTO `shoppingcart` VALUES (2, 1, 1, 1);

-- ----------------------------
-- Table structure for transactions
-- ----------------------------
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `bookId` int NOT NULL,
  `sellerId` int NOT NULL,
  `buyerId` int NOT NULL,
  `status` enum('pending','completed','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `bookId`(`bookId` ASC) USING BTREE,
  INDEX `sellerId`(`sellerId` ASC) USING BTREE,
  INDEX `buyerId`(`buyerId` ASC) USING BTREE,
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`sellerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`buyerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of transactions
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `department` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
