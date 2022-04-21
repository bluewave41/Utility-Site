import bcrypt from 'bcryptjs';

const PasswordHandler = {
    hashPassword: async (password: string) => {
        const hashed = await bcrypt.hash(password, 10);
        //TODO: handle error
        return hashed;
    },
    comparePassword: async(password: string, hash: string) => {
        const value = await bcrypt.compare(password, hash);
        //TODO: handle error
        return value;
    }
} 

export default PasswordHandler;