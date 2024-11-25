import UserRepository from "../repository/userRepository.js";

const {create, showAll, showUnique, updateUser, deleteUser} = new UserRepository();

class UserController {

    async create(request, response) {
        try {
            const {name, email, password} = request.body;
            const user = await create(name, email, password);
            response.status(200).json({message: 'Usuário criado com sucesso!'})

        } catch (error) {
            response.status(500).json({
                message: "Controller: Erro interno no servidor!",
                error: error.message
            });
        }
    }

    async showAll(request, response) {
        try {
            const user = await showAll();
            response.json(user)

        } catch (error) {
            console.error(error);

            response.status(500).json({
                message: "Controller: Erro interno no servidor!",
                error: error.message
            });
        }
    }

    async showUnique(request, response) {
        try {
            const {email} = request.body;
            const user = await showUnique(email);
            response.status(200).json(user)

        } catch (error) {
            response.status(500).json({
                message: "Controller: Erro interno no servidor!",
                error: error.message
            });
        }
    }

    async updateUser(request, response) {
        try {
            const {name, email, password} = request.body;
            const {userOld, userUpdated} = await updateUser(name, email, password);
            if (name === null || email === null || password === null) {
                return response.status(400).json({message: 'Todos os campos são obrigatórios!'})
            }

            response.status(200).json({
                message: 'Usuário atualizado com sucesso!',
                userOld, 
                userUpdated
            });

        } catch (error) {
            response.status(500).json({
                message: "Controller: Erro interno no servidor!",
                error: error.message
            });

        }
    }

    async deleteUser(request, response) {
        try {
            const {name, email} = request.body;
            if (name === null || email === null) {
                return response.status(400).json({message: 'Nome e Email obrigatórios!'})
            }

            const user = await deleteUser(name, email);
            response.status(200).json(user.message)

        } catch (error) {
            console.error("Erro no controller: ", error);
            
            response.status(500).json({
                message: 'Não foi possivel deletar o usuário',
                 error: error.message
            });
        }
    }

};

export default UserController;