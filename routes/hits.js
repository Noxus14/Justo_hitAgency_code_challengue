/**
 *  Hits Routes
 *  hots + /hitsAgency
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateRequest } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');
const { listHits, hitsDetail, hitsCreate, hitsBulk} = require('../controllers/hits');


const router = Router();

router.use( validateJWT );

router.get('/hits', listHits);
router.get('/hits/:id', hitsDetail);

router.post('/hits/create', [
    check('hitMenId', 'The identifier of hitmen is required').not().isEmpty(),
    check('hitName', 'The name of the objective is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    validateRequest
], hitsCreate);

router.post('/hits/bulk',[
    check('userId', 'The identifier of hitmen is required').not().isEmpty(),
    check('hitId', 'The identifier of the objective is required').not().isEmpty(),
    validateRequest
],hitsBulk);

module.exports = router;