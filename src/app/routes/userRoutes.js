import express from "express";
import UserController from "../controller/userController.js";

const userRoute = express.Router();
const { create, showAll, showUnique, updateUser, deleteUser} = new UserController;

userRoute.post('/cadastrar', create);
userRoute.get('/mostrar-usuarios', showAll);
userRoute.get('/mostrar-unico/:id', showUnique);
userRoute.patch('/atualizar-usuario', updateUser);
userRoute.delete('/deletar-usuario', deleteUser);

export default userRoute;