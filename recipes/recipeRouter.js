const router = require('express').Router();
const Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost/recipe', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const RecipeModel = Mongoose.model('recipe', {
	recipeName: String,
	recipeURL: String,
});

router.post('/recipe', async (req, res) => {
	try {
		const recipe = new RecipeModel(req.body);
		const result = await recipe.save();
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/recipes', async (req, res) => {
	try {
		const result = await RecipeModel.find().exec();
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/recipes/:id', async (req, res) => {
	try {
		const recipe = await RecipeModel.findById(req.params.id).exec();
		res.send(recipe);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.put('/recipe/:id', async (req, res) => {
	try {
		const recipe = await RecipeModel.findById(req.params.id).exec();
		recipe.set(req.body);
		const result = await recipe.save();
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.delete('/recipe/:id', async (req, res) => {
	try {
		const result = await RecipeModel.deleteOne({ _id: req.params.id }).exec();
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
