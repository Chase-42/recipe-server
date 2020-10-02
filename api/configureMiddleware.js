const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const BodyParser = require('body-parser');

function logger(req, res, next) {
	console.log(
		`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
			'Origin'
		)}`
	);

	next();
}

module.exports = (server) => {
	server.use(helmet());
	server.use(BodyParser.json());
	server.use(BodyParser.urlencoded({ extended: true }));
	server.use(logger);
	server.use(cors());
};
