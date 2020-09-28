const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const { response } = require('express');

const app = Express();

Mongoose.connect('mongodb://localhost/recipe', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

const RecipeModel = Mongoose.model('recipe', {
	recipeName: String,
	recipeURL: String,
});

app.post('/recipe', async (req, res) => {
	try {
		const recipe = new RecipeModel(req.body);
		const result = await recipe.save();
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.get('/recipes', async (req, res) => {
	try {
		const result = await RecipeModel.find().exec();
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.get('/recipes/:id', async (req, res) => {
	try {
		const recipe = await RecipeModel.findById(req.params.id).exec();
		res.send(recipe);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.put('/recipe/:id', async (req, res) => {
	try {
		const recipe = await RecipeModel.findById(req.params.id).exec();
		recipe.set(req.body);
		const result = await recipe.save();
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.delete('/recipe/:id', async (req, res) => {
	try {
		const result = await RecipeModel.deleteOne({ _id: req.params.id }).exec();
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.listen(3000, () => {
	console.log('Listening at :3000....');
});
