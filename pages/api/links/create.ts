import { getSession } from 'lib/get-session';
import LinkRepository from 'repositories/LinkRepository';
import { checkParameters } from 'lib/RequestHandler';

export default async function handler(req, res) {
    const session = await getSession(req, res);
    if(!session.user) {
        return res.status(500).json({ success: false, message: "You aren't logged in." });
    }

    try {
        checkParameters(['url'], req);
    }
    catch(e) {
        return res.status(500).json({ success: false, message: e.message });
    }

    //user is logged in and url is valid

    const link = await LinkRepository.insertLink(req.body.url);
    
    return res.status(200).json({ success: true, link: link.from });
}