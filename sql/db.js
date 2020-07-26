
const { Client } = require('pg');
const { dbUser, dbPass } = require('../secrets.json');

const db = new Client({
    user: dbuser,
    host: 'localhost',
    database: 'platecheck',
    password: dbPass,
    port: 5432,
});

db.connect();



module.exports.getMatchingIngredients = function (ingredients, severity) {
    return db.query(
        `
        SELECT title FROM ingredients WHERE severity=$1 AND title IN($2::string[])
        `, [severity, ingredients]
    );
};

