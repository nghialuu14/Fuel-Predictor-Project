const express = require('express')
const router = express.Router()
const pool = require('./creds');


router.post('/:fullName/:address1/:address2/:city/:state/:zipcode', async (req, res) => {
    const{fullName, address1, address2, city, state, zipcode} = req.params;
    console.log(`Client Profile - Full Name: ${fullName}`)
    console.log(`Client Profile - Address 1: ${address1}`)
    console.log(`Client Profile - Address 2: ${address2}`)
    console.log(`Client Profile - City: ${city}`)
    console.log(`Client Profile - State: ${state}`)
    console.log(`Client Profile - Zip Code: ${zipcode}`) 

    const allUsers = await pool.query(`SELECT * FROM usercredentials;`);
    const lastUser = allUsers.rows[allUsers.rows.length-1];
    console.log(lastUser);

    const dup = await pool.query(`SELECT * FROM clientinformation WHERE username = '${lastUser.username}';`);
    if (dup.rows.length == 0){
        var newProfile = await pool.query(`INSERT INTO clientinformation (username, fullname, address1, address2, city, state, zipcode) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [lastUser.username, fullName, address1, address2, city, state, zipcode]);
    }
    else{
        var newProfile = await pool.query(`UPDATE clientinformation 
        SET fullname = '${fullName}', address1 = '${address1}', address2 = '${address2}', city = '${city}', state = '${state}', zipcode = '${zipcode}'
        WHERE username ='${lastUser.username}';`);
    }
    res.json();
})

module.exports = router