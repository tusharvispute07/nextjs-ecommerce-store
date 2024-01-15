import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
    const { name, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password,10)
    await mongooseConnect()
    try {
        const newUser = await User.create({
            name: name,
            email: email,
            username: username,
            password: hashedPassword
        });
        console.log("The new user", newUser)
        res.status(200).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}