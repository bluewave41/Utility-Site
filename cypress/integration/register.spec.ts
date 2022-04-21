import handler from '../../pages/api/auth/register';
import { createRequest, createResponse } from 'node-mocks-http';
import UserRepository from 'repositories/UserRepository';

describe('Register', () => {
    it('Should fail if username missing', async () => {
        const req = createRequest();
        const res = createResponse();
        await handler(req, res);
        const data = JSON.parse(res._getData());
        assert(res.statusCode == 500);
        expect(data).to.eqls({ success: false, message: 'Missing username parameter.' });
    })
    it('Should fail if password missing', async () => {
        const req = createRequest();
        const res = createResponse();
        req.body.username = 'a';
        await handler(req, res);
        const data = JSON.parse(res._getData());
        assert(res.statusCode == 500);
        expect(data).to.eqls({ success: false, message: 'Missing password parameter.' });
    })
    it('Should fail if username greater than 20 characters', async () => {
        const req = createRequest();
        const res = createResponse();
        req.body.username = 'aaaaaaaaaaaaaaaaaaaaaaa';
        req.body.password = 'a';
        await handler(req, res);
        const data = JSON.parse(res._getData());
        assert(res.statusCode == 500);
        expect(data).to.eqls({ success: false, message: 'Usernames must be between 1 and 20 characters.' });
    })
    it('Should pass if valid data given', async () => {
        const req = createRequest();
        const res = createResponse();
        req.body.username = 'a';
        req.body.password = 'a';
        cy.stub(UserRepository, 'getUser');
        cy.stub(UserRepository, 'insertUser');
        await handler(req, res);
        const data = JSON.parse(res._getData());
        assert(res.statusCode == 200);
        expect(data).to.eqls({ success: true });
    })
})