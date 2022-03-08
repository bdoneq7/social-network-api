const router = require('express').Router();

const thoughtsRoutes = require('./thought-routes');
const usersRoutes = require('./user-routes');

router.use('/thoughts', thoughtsRoutes);
router.use('/users', usersRoutes);

module.exports = router;
