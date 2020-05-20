const router = require('express').Router();
const verifyToken = require('../verifyToken');

router.get('/', verifyToken, (req, res) => {
    
});

router.get('/:id', verifyToken, (req, res) => {
    res.json(`getId ${req.params.id}`);
});

router.post('/', verifyToken, (req, res) => {
    res.json('post');
});

router.delete('/', verifyToken, (req, res) => {
    res.json('delete');
});

module.exports = router;