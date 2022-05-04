const express = require('express')
const router = express.Router()
const pool = require('./creds')
var util = require('util')



router.post('/:galreq/:datereq/:total', async (req, res) => {
    const{galreq, datereq, total} = req.params;
    console.log(`Quote - Gallon Request: ${galreq}`)
    console.log(`Quote - Date Request: ${datereq}`)
    console.log(`Quote - Total: ${total}`)

    const tmp = await pool.query(`SELECT * FROM fuelquote`);
    const quote_id = tmp.rows.length + 1;

    const allUsers = await pool.query(`SELECT * FROM usercredentials;`);
    const lastUser = allUsers.rows[allUsers.rows.length-1];
    const lastUserProfile = await pool.query(`SELECT * FROM clientinformation WHERE username = '${lastUser.username}';`);

    var address = lastUserProfile.rows[0].address1;
    if (lastUserProfile.rows[0].address2 != "NA") address += lastUserProfile.rows[0].address2;
    console.log(address);
    var newQuote = await pool.query(`INSERT INTO fuelquote (id, username, galreqs, deladdr, deldate, price, total) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [quote_id, lastUser.username, galreq, address, datereq, (total/galreq).toFixed(2), total]);
    //console.log(newQuote);

    res.json(total);
})

router.get('/', async (req, res) => {
    const allUsers = await pool.query(`SELECT * FROM usercredentials;`);
    const lastUser = allUsers.rows[allUsers.rows.length-1];
    const lastUserQuoteHistory = await pool.query(`SELECT * FROM fuelquote WHERE username = '${lastUser.username}';`);
    console.log("There are " + lastUserQuoteHistory.rows.length + " quote(s) for this user...");
    res.json(lastUserQuoteHistory);
})


module.exports = router



