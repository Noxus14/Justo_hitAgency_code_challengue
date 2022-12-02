const { response } = require('express');
const { pool } = require('../database/config');
const Hits = require('../models/Hits');

const queryForMyAssigne = 'SELECT r.name as rol, us.id as id_usuario,us.name as nombre, h.id as id_objetivo, h.hit_name as nombre_objetivo,h.description as descripcion, h.status as estatus, h.manager_name as asigno FROM roles r,users us,hits h ,user_to_hit ustohi WHERE r.id = us.id_role and us.id = ustohi.id_user and h.id = ustohi.id_hit and us.id = $1';
const queryOfAssigneLackeys = 'SELECT r.name as rol, us.id as id_usuario,us.name as nombre, h.id as id_objetivo, h.hit_name as nombre_objetivo,h.description as descripcion, h.status as estatus, h.manager_name as asigno FROM roles r,users us,hits h ,user_to_hit ustohi WHERE r.id = us.id_role and us.id = ustohi.id_user and h.id = ustohi.id_hit and h.manager_id = $1';
const queryOfBoss = 'SELECT r.name as rol, us.id as id_usuario,us.name as nombre, h.id as id_objetivo, h.hit_name as nombre_objetivo,h.description as descripcion, h.status as estatus, h.manager_name as asigno FROM roles r,users us,hits h ,user_to_hit ustohi WHERE r.id = us.id_role and us.id = ustohi.id_user and h.id = ustohi.id_hit';

const listHits = async (req, res = response) => {

    const client = await pool.connect();

    switch (req.rol) {
        case 1: {
            const result = await client.query(queryOfBoss);
            if( result.rowCount === 0 ) {
                return res.status(200).json({});
            }

            return res.status(200).json(result.rows);
        }
        case 2: {
            const resultMyAssigne = await client.query(queryForMyAssigne, [req.id]);
            const resultAssigneLackeys = await client.query(queryOfAssigneLackeys, [req.id]);
            if(resultMyAssigne.rowCount === 0 && resultAssigneLackeys.rowCount === 0) {
                return res.status(200).json({});
            }            
            const result = [];
            result.push(resultMyAssigne.rows);
            result.push(resultAssigneLackeys.rows);

            return res.status(200).json(result);
        }
        case 3: {

            const result = await client.query(queryForMyAssigne, [req.id]);
            if( result.rowCount === 0 ) {
                return res.status(200).json({});
            }

            return res.status(200).json(result.rows);
        }
        default:
            break;

    }

}

const hitsDetail = async (req, res = response) => {
    const client = await pool.connect();

    const hitId = req.params.id;

    const result = await client.query('SELECT * FROM hits where id=$1',[hitId]);
    if( result.rowCount === 0 ) {
        return res.status(200).json({});
    }

    return res.status(200).json(result.rows[0]);

}

const hitsCreate = async (req, res = response) => {
    const client = await pool.connect();
    const {hitMenId, hitName, description} = req.body;

    if(req.rol === 3) { 
        return res.status(401).send('Not Autorized');
    }

    const managerNameDB = await client.query('SELECT name FROM users where id=$1',[req.id]);
    const hits = new Hits();
    hits.hitName = hitName;
    hits.description = description;
    hits.status = 'Assigned';
    hits.managerId = req.id;
    hits.managerName = managerNameDB.rows[0].name;

    const resultsHits = await client.query('INSERT INTO hits(hit_name, description, status, manager_id, manager_name) VALUES($1, $2, $3, $4, $5) RETURNING *'
                                    ,[hits.hitName, hits.description, hits.status, hits.managerId, hits.managerName]);
    
    
                                    
    hits.id = resultsHits.rows[0].id
    await client.query('INSERT INTO user_to_hit(id_user, id_hit) VALUES($1, $2)', [hitMenId, hits.id]);

    return res.status(201).json({
        hitMenId,
        hits
    })
}

const hitsBulk = async (req, res = response) => {
    const client = await pool.connect();
    const { userId, hitId } = req.body;

    if(req.rol === 3) { 
        return res.status(401).send('Not Autorized');
    }

    const managerNameDB = await client.query('SELECT name FROM users where id=$1',[req.id]);
    await client.query('UPDATE user_to_hit SET id_user = $1 WHERE id_hit = $2',[userId, hitId]);
    await client.query('UPDATE hits SET manager_id = $1, manager_name = $2 WHERE id = $3',[req.id, managerNameDB.rows[0].name, hitId]);

    return res.status(200).json({
        msg: 'Reassignment done.'
    })
}

module.exports = {
    listHits,
    hitsDetail,
    hitsCreate,
    hitsBulk
}