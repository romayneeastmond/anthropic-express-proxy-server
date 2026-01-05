import 'dotenv/config';
import express from 'express';

const app = express();

app.use(express.json({ limit: '20mb' }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

// Health check for Azure
app.get('/', (req, res) => {
    res.send('Anthropic Express Server is running');
});

app.post('/api/anthropic', async (req, res) => {
    try {
        if (!process.env.ANTHROPIC_API_KEY) {
            return res.status(500).json({ error: 'Anthropic API Key not configured.' });
        }

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Anthropic proxy running on port ${port}`);
});
