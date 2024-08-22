import { Router } from "express";
import * as userController from "../controllers/userController";
import { authenticate } from '../../middleware/authMiddleware';
import { authorize } from '../../middleware/roleMiddleware';

const router = Router();

router.post("/users", userController.createUser);
router.get('/users', authenticate, authorize(['ADMIN', 'COACH', "PLAYER", 'MANAGER']), userController.getAllUsers);
router.get("/users/:name", authenticate, authorize(['ADMIN', 'COACH', "PLAYER", 'MANAGER']), userController.getUserByName);
router.put("/users/:id", authenticate, authorize(['ADMIN']), userController.updateUser);
router.delete("/users/:id", authenticate, authorize(['ADMIN']), userController.deleteUser);

export default router;
