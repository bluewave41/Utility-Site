import { checkParameters } from 'lib/RequestHandler';
import PasswordHandler from 'lib/PasswordHandler';
import UserRepository from 'repositories/UserRepository';
import { getSession } from 'lib/get-session';

export default async function handler(req, res) {
    const { username, password } = req.body;
    const session = await getSession(req, res);

    try {
        checkParameters(req, ['username', 'password']);
    }
    catch(e) {
        return res.status(500).json({ success: false, message: e.message });
    }

    const user = await UserRepository.getUser(username);

    if(!user) {
        return res.status(500).json({ success: false, message: 'Username or password are invalid.' });
    }

    const comparison = await PasswordHandler.comparePassword(password, user.password);
    if(comparison) {
        session.user = {
            userId: user.userId,
            username: user.username
        }
        return res.status(200).json({ success: true });
    }
    
    res.status(500).json({ success: false, message: 'Username or password are invalid.' });
}