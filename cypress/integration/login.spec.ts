import handler from '../../pages/api/auth/login';
import { createRequest, createResponse } from 'node-mocks-http';
import UserRepository from 'repositories/UserRepository';
import PasswordHandler from 'lib/PasswordHandler';

describe('Login', () => {
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
    it('Should fail if no user exists', async () => {
        const req = createRequest();
        const res = createResponse();
        req.body.username = 'a';
        req.body.password = 'a';
        cy.stub(UserRepository, 'getUser').returns(null);
        await handler(req, res);
        const data = JSON.parse(res._getData());
        assert(res.statusCode == 500);
        expect(data).to.eqls({ success: false, message: 'Username or password are invalid.' });
    })
    it("Should fail if passwords don't match", async () => {
        const req = createRequest();
        const res = createResponse();
        req.body.username = 'a';
        req.body.password = 'a';
        cy.stub(UserRepository, 'getUser').returns({});
        cy.stub(PasswordHandler, 'comparePassword').returns(false);
        await handler(req, res);
        const data = JSON.parse(res._getData());
        assert(res.statusCode == 500);
        expect(data).to.eqls({ success: false, message: 'Username or password are invalid.' });
    })
    it("Should pass if passwords match", async () => {
        const req = createRequest();
        const res = createResponse();
        req.body.username = 'a';
        req.body.password = 'a';
        cy.stub(UserRepository, 'getUser').returns({});
        cy.stub(PasswordHandler, 'comparePassword').returns(true);
        await handler(req, res);
        const data = JSON.parse(res._getData());
        assert(res.statusCode == 200);
        expect(data).to.eqls({ success: true });
    })
})