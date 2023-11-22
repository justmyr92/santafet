const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "dyasmir",
    host: "localhost",
    port: 5432,
    database: "sfm",
});

module.exports = pool;
