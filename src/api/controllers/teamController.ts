import { Request, Response } from 'express';
import  * as teamService  from '../services/teamService';

export const createTeam = async (req: Request, res: Response) => {
  const { name, players } = req.body;

  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const team = await teamService.createTeam(name, req.user.id, req.user.role, players);
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: "Failed to create team" });
  }
};

export const getAllTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await teamService.getAllTeams();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve teams' });
  }
};

// src/api/controllers/teamController.ts
export const getTeamByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const team = await teamService.getTeamByName(String(req.params.name));
    res.status(200).json(team);
  } catch (error) {
    if (error.message.includes('No teams found')) {
      res.status(404).json({ error: 'Team not found' });
    } else {
      res.status(500).json({ error: 'Failed to retrieve team' });
    }
  }
};

export const updateTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const team = await teamService.updateTeam(Number(req.params.id), req.body, req.body.players);
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update team' });
  }
};

// src/api/controllers/teamController.ts
export const updateTeamPlayers = async (req: Request, res: Response): Promise<void> => {
  try {
    const team = await teamService.updateTeamPlayers(Number(req.params.id), req.body.players);
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update team players' });
  }
};

export const deleteTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    await teamService.deleteTeam(Number(req.params.id));
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
};
