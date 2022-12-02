/**
 *  Hitmen Routes
 *  hots + /hitsAgency
 */
const { Router } = require('express');
const { listHitmen, hitmenDetail } = require('../controllers/hitmen');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.use( validateJWT );

router.get('/hitmen', listHitmen);
router.get('/hitmen/:id', hitmenDetail);


module.exports = router;