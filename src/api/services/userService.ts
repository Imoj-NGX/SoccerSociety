import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (data: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> => {
    return prisma.user.create({
        data,
    });
};

export const getAllUsers = async (): Promise<User[]> => {
    return prisma.user.findMany();
};

export const getUserByName = async (name: string): Promise<User[]> => {
    return prisma.user.findMany({
        where: {
            OR: [
                { firstName: { contains: name, mode: 'insensitive' } },
                { lastName: { contains: name, mode: 'insensitive' } },
            ],
        },
    });
};

export const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
    return prisma.user.update({
        where: { id },
        data,
    });
};

export const deleteUser = async (id: number): Promise<User> => {
    return prisma.user.delete({
        where: { id },
    });
};
