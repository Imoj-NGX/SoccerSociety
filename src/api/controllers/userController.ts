import { Request, Response } from "express";
import * as userService from "../services/userService";

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: "Failed to create user", details: error });
    }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: "Failed to retrieve users", details: error });
    }
};

// Get a user by ID
export const getUserByName = async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
      const user = await userService.getUserByName(name);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get user by name' });
    }
  };

// Update a user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.updateUser(Number(req.params.id), req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: "Failed to update user", details: error });
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.deleteUser(Number(req.params.id));
        res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        res.status(400).json({ error: "Failed to delete user", details: error });
    }
};
