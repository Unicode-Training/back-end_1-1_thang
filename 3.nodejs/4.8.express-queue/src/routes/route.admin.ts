import express from "express";
import { dashboardController } from "../controllers/admin/dashboard.controller";
import { roleController } from "../controllers/admin/role.controller";
import { productController } from "../controllers/admin/product.controller";
import { roleMiddleware } from "../middlewares/role.middleware";
const router = express.Router();
router.get('/dashboard', roleMiddleware('dashboard.read'), dashboardController.index);

//Permission
router.get('/roles', roleMiddleware('ADMIN'), roleController.index);
router.post('/roles', roleMiddleware('ADMIN'), roleController.create);
router.post('/roles/:roleId/users', roleMiddleware('ADMIN'), roleController.syncUsers);
router.post('/roles/:roleId/permissions', roleMiddleware('ADMIN'), roleController.syncPermissions);
router.delete('/roles/:roleId', roleMiddleware('ADMIN'), roleController.delete);

//Product
router.get('/products', roleMiddleware('products.read'), productController.index);
router.post('/products', roleMiddleware('products.create'), productController.create);
router.put('/products/:id', roleMiddleware('products.update'), productController.update);
router.get('/products/:id', roleMiddleware('products.delete'), productController.delete);
export default router;

//router.get('/products', roleMiddleware('products.read'), productController.index);

//Frontend -> Route -> Middleware -> Page

//Mở rộng: 
// - Phân quyền theo dữ liệu: user nào tạo bài post thì chỉ được xóa và sửa bài post đó
// - Phân quyền theo cột (attribute)