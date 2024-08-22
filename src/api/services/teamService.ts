// src/api/services/teamService.ts
import  prisma  from '../../prismaClient';
import { Prisma } from '@prisma/client';

export const createTeam = async (name: string, userId: number, role: string, playersIds: number[]) => {
  if (role !== 'MANAGER' && role !== 'COACH') {
    throw new Error('Only managers or coaches can create teams.');
  }

  const team = await prisma.team.create({
    data: {
      name,
      managerId: role === 'MANAGER' ? userId : null,
      coachId: role === 'COACH' ? userId : null,
      players: {
        connect: playersIds.map((id) => ({ id })),
      },
    },
  });

  return team;
};

export const getAllTeams = async () => {
  return prisma.team.findMany({
    include: {
      coach: true,
      players: true,
    },
  });
};

// src/api/services/teamService.ts
export const getTeamByName = async (name: string) => {
  const teams = await prisma.team.findMany({
    where: { name },
    include: {
      coach: true,
      players: true,
    },
  });

  if (teams.length === 0) {
    throw new Error(`No teams found with name ${name}`);
  }

  return teams;
};

export const updateTeam = async (id: number, data: Prisma.TeamUpdateInput, playerIds: number[]) => {
  if (!playerIds.length) {
    throw new Error('No player IDs provided');
  }

  const team = await prisma.team.findUnique({ where: { id } });
  if (!team) {
    throw new Error('Team not found');
  }

  if (team.coachId && team.coachId !== data.coach) {
    throw new Error('Only the coach who created the team can update it');
  }

  if (team.managerId && team.managerId !== data.manager) {
    throw new Error('Only the manager who created the team can update it');
  }

  try {
    const updatedTeam = await prisma.team.update({
      where: { id },
      data: {
        ...data,
        players: {
          set: playerIds.map((playerId) => ({ id: playerId })),
        },
      },
    });

    return updatedTeam;
  } catch (error ) {
    throw new Error(`Error updating team: Please try again. ${error}`);
  }
};

// src/api/services/teamService.ts
export const updateTeamPlayers = async (id: number, playerIds: number[]) => {
  const team = await prisma.team.findUnique({ where: { id } });
  if (!team) {
    throw new Error('Team not found');
  }

  const updatedTeam = await prisma.team.update({
    where: { id },
    data: {
      players: {
        set: playerIds.map((playerId) => ({ id: playerId })),
      },
    },
  });

  return updatedTeam;
};
export const deleteTeam = async (id: number) => {
  return prisma.team.delete({
    where: { id },
  });
};
