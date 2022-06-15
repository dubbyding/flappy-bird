const express = require('express');
const dotenv = require('dotenv');

const flappyServing = require('./middleware/flappyBirdServe');

dotenv.config();
const app = express();

app.use(express.static(__dirname + '/static'));

app.get('/', flappyServing);

app.listen(process.env.PORT || 3000, (err, done) => {
	if (err) {
		console.log('Error starting the server');
	} else {
		console.log('Server is started on port 3000');
	}
});
