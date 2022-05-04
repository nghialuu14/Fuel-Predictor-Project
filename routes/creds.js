const { Pool } = require('pg');

const pool = new Pool({
    "host": "hansken.db.elephantsql.com",
    "user": "oapcxsts",
    "database": "oapcxsts",
    "password": "cNHeVmY_a-9jZ9VhWzxJ-pNGNWOqZ31Y",
    "port": 5432
});

module.exports = pool;