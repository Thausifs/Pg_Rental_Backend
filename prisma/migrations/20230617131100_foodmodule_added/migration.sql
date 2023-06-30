-- CreateTable
CREATE TABLE "Foodmenu" (
    "residentid" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "menuid" TEXT NOT NULL,

    CONSTRAINT "Foodmenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "date" DATE NOT NULL,
    "breakfast" TEXT[],
    "lunch" TEXT[],
    "dinner" TEXT[],
    "id" TEXT NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDishes" (
    "userid" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "foodtype" TEXT NOT NULL,
    "dish" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "residentid" TEXT NOT NULL,

    CONSTRAINT "UserDishes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Foodmenu" ADD CONSTRAINT "Foodmenu_residentid_fkey" FOREIGN KEY ("residentid") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Foodmenu" ADD CONSTRAINT "Foodmenu_menuid_fkey" FOREIGN KEY ("menuid") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDishes" ADD CONSTRAINT "UserDishes_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDishes" ADD CONSTRAINT "UserDishes_residentid_fkey" FOREIGN KEY ("residentid") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
