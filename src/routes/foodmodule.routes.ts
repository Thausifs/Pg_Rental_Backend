import { Router } from 'express';
import FoodmoduleController from '../controller/foodmodule.controller';

const router = Router({ mergeParams: true });

router.post('/adddishes', FoodmoduleController.addDishes);
router.post('/updatedishes', FoodmoduleController.updateDishes);
router.post('/showdishes', FoodmoduleController.showDishes);
router.post('/adduserdishes', FoodmoduleController.userdishes);
router.post('/updateuserdishes', FoodmoduleController.userdishesupdate);
router.post('/showresdishes', FoodmoduleController.showresdishes);
router.post('/residents', FoodmoduleController.Residents);
router.get('/showallmenus', FoodmoduleController.ShowAllMenus);
router.post('/deletemenu', FoodmoduleController.Deletemenu);
router.post('/showuserdishes', FoodmoduleController.showuserdishes);
router.post('/userupdateorder', FoodmoduleController.Userupdateorder);
router.post('/allordersbydate', FoodmoduleController.Allordersbydate);
router.post('/dishescountbydate', FoodmoduleController.dishescountbydate);
router.post('/dishescountbydateandres', FoodmoduleController.dishescountbydateandres
);

export default router;
