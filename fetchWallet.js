const { pool } = require('./db-connection');

async function fetchWallets(){
    const result = await pool.query("SELECT * FROM wallets");
    for(let row of result.rows){
        console.log({address: row.address, wallet_key: row.wallet_key})
    }
}

fetchWallets()