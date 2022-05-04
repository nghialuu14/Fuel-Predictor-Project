const express = require('express')
const crypto = require('crypto')
const router = express.Router()
const pool = require('./creds');

router.get('/:user/:pw', async (req, res) => {
    console.log('Logging in...');
    const {user, pw} = req.params;
    console.log(`Login - User: ${user}`)
    console.log(`Login - Password: ${pw}`)
    hash = crypto.createHash('sha256').update(pw).digest('hex')

    const checkUser = await pool.query(`SELECT * FROM usercredentials WHERE username = '${user}' AND password = '${hash}'`);
    if (checkUser.rows.length > 0){
        console.log('Valid....');
        const deleteUser = await pool.query(`DELETE FROM usercredentials WHERE username = '${user}'`);
        const insertUser = await pool.query(`INSERT INTO usercredentials (username, password) 
        VALUES ($1, $2) RETURNING *`, [user, hash]);
        res.json(checkUser);
    }
    else {
        console.log('Invalid....');
        res.json(checkUser);
    }
})

router.get('/:user', async (req, res) => {
    console.log('Checking username exists...');
    const {user} = req.params;
    console.log(`Checking - User: ${user}`)
    const checkUser = await pool.query(`SELECT * FROM usercredentials WHERE username = '${user}'`);
    if (checkUser.rows.length > 0){
        console.log('Username exists! Invalid!....');
        res.json(checkUser);
    }
    else {
        console.log('Username does not exist! Valid!....');
        res.json(checkUser);
    }
})

module.exports = router