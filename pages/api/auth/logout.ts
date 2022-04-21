import { getSession } from 'lib/get-session';

export default async function handler(req, res) {
    const session = await getSession(req, res);
    await session.destroy();

    res.setHeader('Location', '/');
    res.status(302);
    return res.end();
}