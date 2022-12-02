const { response } = require('express');
const { pool } = require('../database/config');


const listHitmen = async (req, res = response) => {
    const client = await pool.connect();

    if(req.rol === 3) { 
        return res.status(401).send('Not Autorized');
    }

    const result = await client.query('SELECT * FROM users');
    return res.status(200).json(result.rows);
}

const hitmenDetail = async (req, res = response) => {
    const client = await pool.connect();
    const hitmenId = req.params.id;

    if(req.rol === 3) { 
        return res.status(401).send('Not Autorized');
    }

    const result = await client.query('SELECT * FROM users where id =$1', [hitmenId]);

    return res.status(200).json(result.rows[0]);
}

module.exports = {
    listHitmen,
    hitmenDetail
}