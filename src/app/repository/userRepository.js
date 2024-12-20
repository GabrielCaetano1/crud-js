import instanciaPrisma from "../../connection/instanciaPrisma.js";

const prisma = instanciaPrisma.getConnection();

class UserRepository {
    
    async create(name, email, password) {
        try {
            const userExists = await prisma.users.findUnique({where: {email}});
            
            if (userExists === null) {
                const createUser = await prisma.users.create({data: {name, email,  password}})
                return createUser;

            } else {
                throw new Error('Repository: Usuário já criado!')
            
            }

        } catch (error) {
            console.log('Erro no catch!', error);
            throw error;
        }
    }

    async showAll() {
        try {
            const allUser = await prisma.users.findMany();
            return allUser;

        } catch (error) {
            console.log('Erro no catch!', error);
            throw error;
        }
    }

    async showUnique(id) {
        try {
            const userUnique = await prisma.users.findUnique({where: {id}});
            return userUnique;

        } catch (error) {
            console.log('Erro no catch!', error);
            throw error;
        }
    }

    async updateUser(id, name, email, password) {
        try {
            const userId = id;
            const userExists = await prisma.users.findUnique({
                where: {id: userId},
            })

            if (userExists) {
                const updateData = {};
                if (name) updateData.name = name;
                if (email) updateData.email = email;
                if (password) updateData.password = password;



                const userUpdated = await prisma.users.update({
                    where: {id: userId}, 
                    data: updateData
                });

                return {
                    userOld: userExists,
                    userUpdated
                }
            } else {
                throw new Error('Usuário não existe')
            }
        } catch (error) {
            console.log('Erro no catch!', error);
            throw error;
            
        }
    }

    async deleteUser(name, email) {
        try {
            const userExists = await prisma.users.findUnique({where: {name, email}})

            if (userExists === null) {
                throw new Error('ConflictError: Usuário não existe')
            };
            await prisma.users.delete({where: {name, email}});
            
            const message = {message: 'Usuário deletado com sucesso!'};
            return message;
        } catch (error) {
            console.log('Erro no catch!', error);
            throw error;
        }
    }
};

export default UserRepository;