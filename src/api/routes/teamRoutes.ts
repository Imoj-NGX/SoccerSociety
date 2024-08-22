// src/api/routes/teamRoutes.ts
import { Router } from 'express';
import { authenticate } from '../../middleware/authMiddleware';
import { authorize } from '../../middleware/roleMiddleware';
import * as teamController from '../controllers/teamController';
const router = Router();

router.post('/', authenticate, authorize(['ADMIN', 'COACH']), teamController.createTeam);
router.get('/', authenticate, authorize(['ADMIN', 'COACH', 'MANAGER', 'PLAYER']), teamController.getAllTeams);
router.get('/:name', authenticate, authorize(['ADMIN', 'COACH', 'MANAGER', 'PLAYER']), teamController.getTeamByName);
router.put('/:id', authenticate, authorize(['ADMIN', 'COACH']), teamController.updateTeam);
router.put('/:id/players', authenticate, authorize(['ADMIN', 'COACH']), teamController.updateTeamPlayers);
router.delete('/:id', authenticate, authorize(['ADMIN']), teamController.deleteTeam);

export default router;