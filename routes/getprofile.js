const express = require('express')
const router = express.Router()
const pool = require('./creds');
const crypto = require('crypto')

router.get('/', async (req, res) => {
    console.log('Getting last user profile...');

    const allUsers = await pool.query(`SELECT * FROM usercredentials;`);
    const lastUser = allUsers.rows[allUsers.rows.length-1];
    console.log(lastUser);
    const lastUserProfile = await pool.query(`SELECT * FROM clientinformation WHERE username = '${lastUser.username}';`);
    res.json(lastUserProfile);
})

router.get('/:user/:full/:zip', async (req, res) => {
    console.log('Checking valid information...');
    const {user, full, zip} = req.params;
    console.log(`Checking - User: ${user}`)
    console.log(`Checking - Full name: ${full}`)
    console.log(`Checking - Zip Code: ${zip}`)

    const userinfo = await pool.query(`SELECT * FROM clientinformation WHERE username = '${user}' AND fullname = '${full}' AND zipcode = '${zip}';`);
   
    res.json(userinfo);
})

router.post('/:user/:password', async (req, res) => {
    console.log('Resetting password....')
    const {user, password} = req.params;
    hash = crypto.createHash('sha256').update(password).digest('hex')

    const userinfo = await pool.query(`UPDATE usercredentials SET password = '${hash}' WHERE username = '${user}'`);
    res.json(userinfo);
})

module.exports = router
