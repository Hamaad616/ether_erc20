const { Pool } = require('pg')

const pool = new Pool({
    user : 'postgres',
    database: 'beatbidder_bo',
    password: 'root',
    port: 5432,
    host: 'localhost'
})

module.exports = { pool };