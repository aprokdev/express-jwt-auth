/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_author_id_author_firstname_author_lastname_fkey`;

-- DropTable
DROP TABLE `post`;
