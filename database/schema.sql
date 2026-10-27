-- LUMIÈRE HAUTE JOAILLERIE - DATABASE SCHEMA
-- Database: lumiere_jewelry

CREATE DATABASE IF NOT EXISTS `lumiere_jewelry` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `lumiere_jewelry`;

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `role` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Products Table
CREATE TABLE IF NOT EXISTS `products` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `category_name` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `original_price` DECIMAL(10,2) NULL,
  `rating` DECIMAL(3,1) DEFAULT 5.0,
  `reviews_count` INT DEFAULT 0,
  `badge` VARCHAR(100) NULL,
  `is_new` TINYINT(1) DEFAULT 0,
  `is_featured` TINYINT(1) DEFAULT 0,
  `metals_json` TEXT NOT NULL,
  `default_metal` VARCHAR(100) NOT NULL,
  `images_json` TEXT NOT NULL,
  `short_desc` TEXT NOT NULL,
  `description` LONGTEXT NOT NULL,
  `specs_json` TEXT NOT NULL,
  `sizes_json` TEXT NOT NULL,
  `in_stock` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS `orders` (
  `id` VARCHAR(50) PRIMARY KEY,
  `customer` VARCHAR(255) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(50) NULL,
  `address` TEXT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  `items_count` INT DEFAULT 1,
  `status` VARCHAR(100) DEFAULT 'In Atelier Inspection',
  `shipping_method` VARCHAR(100) DEFAULT 'Armored Overnight',
  `payment_status` VARCHAR(50) DEFAULT 'Paid',
  `items_json` LONGTEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Appointments / Salon Inquiries Table
CREATE TABLE IF NOT EXISTS `appointments` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(50) NULL,
  `boutique` VARCHAR(100) NOT NULL,
  `preferred_date` VARCHAR(50) NULL,
  `service_type` VARCHAR(150) NOT NULL,
  `message` TEXT NULL,
  `status` VARCHAR(50) DEFAULT 'Pending Review',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Default Admin: admin@lumiere.com / admin123
INSERT INTO `admins` (`email`, `password`, `name`, `role`)
VALUES ('admin@lumiere.com', 'admin123', 'Eleanor Moreau', 'Head Gemologist & Atelier Director')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- Seed Initial Orders
INSERT INTO `orders` (`id`, `customer`, `email`, `total`, `items_count`, `status`, `shipping_method`, `payment_status`, `items_json`)
VALUES 
('LUM-849201', 'Duchess Caroline Spencer', 'c.spencer@mayfair.co.uk', 7750.00, 2, 'In Atelier Inspection', 'Armored Overnight', 'Paid', '[{"name":"Seraphina Chandelier Drop Earrings","metal":"18K Rose Gold","price":3400,"qty":1},{"name":"Verdant Empress Emerald & Diamond Ring","metal":"18K Yellow Gold","price":4100,"qty":1}]'),
('LUM-792105', 'Jonathan Sterling Esq.', 'j.sterling@sterlingholdings.com', 4900.00, 1, 'Shipped', 'White-Glove VIP Courier', 'Paid', '[{"name":"Luxe Rivière Diamond Tennis Bracelet","metal":"Platinum","price":4900,"qty":1}]'),
('LUM-684210', 'Lady Giselle Beaumont', 'g.beaumont@beaumont.fr', 2850.00, 1, 'Delivered', 'Armored Overnight', 'Paid', '[{"name":"The Celestial Solitaire Ring","metal":"18K Yellow Gold","price":2850,"qty":1}]')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);

-- Seed Initial Appointments
INSERT INTO `appointments` (`id`, `name`, `email`, `phone`, `boutique`, `preferred_date`, `service_type`, `message`, `status`)
VALUES
('APT-101', 'Princess Natalia Romanova', 'natalia.r@monaco.mc', '+377 98 06 20 00', 'Paris Flagship (Place Vendôme)', '2026-09-24', 'Bespoke Engagement Ring', 'Seeking a 4ct D-Flawless emerald-cut diamond mounted on platinum with baguette side-stones.', 'Confirmed'),
('APT-102', 'Lord Arthur Kensington', 'arthur.k@kensington.uk', '+44 20 7123 4567', 'London Mayfair (Old Bond St)', '2026-09-26', 'High Jewelry Suite', 'Anniversary acquisition — interested in reviewing the Ceylon royal sapphire necklace suite.', 'Pending Review'),
('APT-103', 'Sophia Laurent', 'sophia@laurentdesign.com', '+1 (212) 555-8902', 'New York Salon (Madison Ave)', '2026-09-28', 'Custom Redesign & Heirloom Resetting', 'Looking to remount grandmother’s Art Deco Colombian emerald into a modern signet ring.', 'Confirmed')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);
