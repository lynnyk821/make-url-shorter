const express = require('express');
const cors = require('cors');
const axios= require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/shorten-url', async (req, res) => {
    try {
        const response = await axios.post('https://cleanuri.com/api/v1/shorten', {
            url: req.body.url,
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(port, () => {
    console.log(`Proxy server is running on http://localhost:${port}`);
});