const { Model } = require('objection');
const Knex = require('knex');
require('dotenv').config({ path: '.env' });

// Initialize knex.
const knex = Knex({
    client: 'pg',
    connection: {
		database: process.env.database,
		user: process.env.user,
		password: process.env.password
    }
});

Model.knex(knex);