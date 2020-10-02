const router = require('express').Router();

const recipeRouter = require('../recipes/recipeRouter');

router.use(recipeRouter);

router.get('/', (req, res) => {
	res.json({ message: 'API is up and running!' });
});

module.exports = router;
