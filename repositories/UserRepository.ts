import UserModel from 'models/UserModel';
import PasswordHandler from 'lib/PasswordHandler';
import { v4 as uuidv4 } from 'uuid';

const UserRepository = {
    getUser: async (username: string) => {
        const user = await UserModel.query().select('*')    
            .findOne('username', username);
    
        return user;
    },
    insertUser: async (username: string, password: string) => {
        await UserModel.query().insert({
            username: username,
            password: await PasswordHandler.hashPassword(password),
            uuid: uuidv4()
        })
    }
}

export default UserRepository;