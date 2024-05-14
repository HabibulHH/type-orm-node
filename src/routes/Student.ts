import { Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const router = Router();

const userRepo = () => AppDataSource.getRepository(User);

router.get('/users', async (req, res) => {
    const users = await userRepo().find();
    res.send(users);
});

router.post('/user', async (req, res) => {
    const { firstName, lastName, age } = req.body;
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.age = age;

    try {
        const savedUser = await userRepo().save(user);
        res.status(201).send(savedUser);
    } catch (error) {
        res.status(500).send("Failed to create a new student.");
    }
});
