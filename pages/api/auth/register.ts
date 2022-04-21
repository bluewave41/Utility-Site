import { checkParameters } from 'lib/RequestHandler';
import UserRepository from 'repositories/UserRepository';

export default async function handler(req, res) {
    const { username, password } = req.body;

    try {
        checkParameters(req, ['username', 'password']);
    }
    catch(e) {
        return res.status(500).json({ success: false, message: e.message });
    }

    if(username.length > 20) {
        return res.status(500).json({ success: false, message: 'Usernames must be between 1 and 20 characters.' });
    }

    const user = await UserRepository.getUser(username);

    if(user) {
        res.status(500).json({ success: false, message: 'That username is already in use.' });
    }

    await UserRepository.insertUser(username, password);

    res.status(200).json({ success: true });
}