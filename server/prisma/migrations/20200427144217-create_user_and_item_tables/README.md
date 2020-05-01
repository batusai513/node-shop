# Migration `20200427144217-create_user_and_item_tables`

This migration has been generated by Richard Roncancio at 4/27/2020, 2:42:17 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `myshopprisma`.`users` (
    `created_at` datetime  DEFAULT CURRENT_TIMESTAMP ,
    `email` varchar(191) NOT NULL  ,
    `id` int NOT NULL  AUTO_INCREMENT,
    `name` varchar(191) NOT NULL  ,
    `updated_at` datetime  DEFAULT CURRENT_TIMESTAMP ,
    PRIMARY KEY (`id`)
) 
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `myshopprisma`.`items` (
    `created_at` datetime  DEFAULT CURRENT_TIMESTAMP ,
    `description` varchar(191) NOT NULL  ,
    `id` int NOT NULL  AUTO_INCREMENT,
    `image` varchar(191)   ,
    `large_image` varchar(191)   ,
    `price` Decimal(65,30) NOT NULL  ,
    `title` varchar(191) NOT NULL  ,
    `updated_at` datetime  DEFAULT CURRENT_TIMESTAMP ,
    `user_id` int  ,
    PRIMARY KEY (`id`)
) 
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

ALTER TABLE `myshopprisma`.`items` ADD FOREIGN KEY (`user_id`) REFERENCES `myshopprisma`.`users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200427144217-create_user_and_item_tables
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,124 @@
+datasource db {
+  provider = "mysql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id          Int                @default(autoincrement()) @id
+  name        String
+  email       String
+  // password    String
+  createdAt   DateTime?           @map("created_at") @default(now())
+  updatedAt   DateTime?           @map("updated_at") @default(now())
+  // permissions users_permissions?
+  // cart_items  cart_items[]
+  // items       items[]
+  // order_items order_items[]
+  // orders      orders[]
+  @@map("users")
+}
+
+model Item {
+  description String
+  id          Int          @default(autoincrement()) @id
+  image       String?
+  largeImage  String?      @map("large_image")
+  price       Float
+  title       String
+  createdAt   DateTime?     @map("created_at") @default(now())
+  updatedAt   DateTime?     @map("updated_at") @default(now())
+  userId      Int?          @map("user_id")
+  user        User?         @relation(fields: [userId], references: [id])
+  
+  @@map("items")
+  // @@index([userId], name: "items_user_id_foreign")
+}
+
+// model cart_items {
+//   created_at DateTime?
+//   id         Int       @default(autoincrement()) @id
+//   item_id    Int?
+//   quantity   Int?      @default(1)
+//   updated_at DateTime?
+//   user_id    Int?
+//   items      items?    @relation(fields: [item_id], references: [id])
+//   users      users?    @relation(fields: [user_id], references: [id])
+
+//   @@index([item_id], name: "cart_items_item_id_foreign")
+//   @@index([user_id], name: "cart_items_user_id_foreign")
+// }
+
+// model items {
+//   created_at  DateTime?
+//   description String
+//   id          Int          @default(autoincrement()) @id
+//   image       String?
+//   large_image String?
+//   price       Float
+//   title       String
+//   updated_at  DateTime?
+//   user_id     Int?
+//   users       users?       @relation(fields: [user_id], references: [id])
+//   cart_items  cart_items[]
+
+//   @@index([user_id], name: "items_user_id_foreign")
+// }
+
+// model order_items {
+//   created_at  DateTime?
+//   description String
+//   id          Int       @default(autoincrement()) @id
+//   image       String
+//   large_image String
+//   order_id    Int
+//   price       Float
+//   quantity    Int       @default(1)
+//   title       String
+//   updated_at  DateTime?
+//   user_id     Int?
+//   orders      orders    @relation(fields: [order_id], references: [id])
+//   users       users?    @relation(fields: [user_id], references: [id])
+
+//   @@index([order_id], name: "order_items_order_id_foreign")
+//   @@index([user_id], name: "order_items_user_id_foreign")
+// }
+
+// model orders {
+//   charge      String?
+//   created_at  DateTime?
+//   id          Int           @default(autoincrement()) @id
+//   total       Float
+//   updated_at  DateTime?
+//   user_id     Int?
+//   users       users?        @relation(fields: [user_id], references: [id])
+//   order_items order_items[]
+
+//   @@index([user_id], name: "orders_user_id_foreign")
+// }
+
+// model users {
+//   created_at  DateTime?
+//   email       String
+//   id          Int                @default(autoincrement()) @id
+//   name        String
+//   password    String
+//   permissions users_permissions?
+//   updated_at  DateTime?
+//   cart_items  cart_items[]
+//   items       items[]
+//   order_items order_items[]
+//   orders      orders[]
+// }
+
+// enum users_permissions {
+//   ADMIN
+//   USER
+//   ITEMCREATE
+//   ITEMUPDATE
+//   ITEMDELETE
+//   PERMISSIONUPDATE
+// }
```

