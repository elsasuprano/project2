const router = require('express').Router();

const userRoutes = require('./userRoutes');
const watchRoutes = require('./watchRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/watch', watchRoutes);

module.exports = router;

