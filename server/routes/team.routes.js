import { Router } from 'express';
import * as TeamController from '../controllers/team.controller';
const router = new Router();

// Get all Teams
router.route('/teams').get(TeamController.getTeams);

// Get one team by cuid
router.route('/teams/:cuid').get(TeamController.getTeam);

// Add a new Team
router.route('/teams').post(TeamController.addTeam);

// Delete a team by cuid
router.route('/teams/:cuid').delete(TeamController.deleteTeam);

export default router;
