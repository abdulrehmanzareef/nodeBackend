const express = require('express');
const mockfaxRouter = require('./modules/mockfax/router');

const app = express();

app.use(express.json());

app.use('/', mockfaxRouter);

app.listen(6000, (err) => {
	console.log("Listening you at port 6000", err);
});
