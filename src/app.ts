import express, { Application } from "express";
import userRoutes from "./api/routes/userRoutes";
import authRoutes from "./api/routes/authRoutes";
import teamRoutes from "./api/routes/teamRoutes";

const app: Application = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/api", userRoutes);
app.use('/auth', authRoutes);
app.use('/teams', teamRoutes);


app.listen(3000, () => {
    console.log(`Server running on http://localhost:${port}`);
});
