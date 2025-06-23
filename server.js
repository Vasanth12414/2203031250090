const express = require('express');
const { customAlphabet } = require('nanoid');

const app = express();
const PORT = 8000;
app.use(express.json());
const urlStore = new Map();
const generateShortCode = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

app.post('/shorturls', (req, res) => {
    const { url, validity } = req.body;

    if (typeof url !== 'string' || typeof validity !== 'number') {
        return res.status(400).json({ error: 'Invalid input. Expecting { url: string, validity: number }' });
    }

    const shortCode = generateShortCode();
    const expiryTimestamp = Date.now() + validity * 60 * 1000;

    urlStore.set(shortCode, {
        originalUrl: url,
        expiresAt: expiryTimestamp
    });

    res.status(201).json({
        shortLink: `http://localhost:${PORT}/${shortCode}`,
        expiry: new Date(expiryTimestamp).toISOString()
    });
});

app.get('/:shortCode', (req, res) => {
    const { shortCode } = req.params;
    const entry = urlStore.get(shortCode);

    if (!entry) {
        return res.status(404).send(' Short URL not found');
    }

    if (Date.now() > entry.expiresAt) {
        urlStore.delete(shortCode); 
        return res.status(410).send('Link has expired');
    }

    res.redirect(entry.originalUrl);
});


app.listen(PORT, () => {
    console.log(`URL Shortener service is running at http://localhost:${PORT}`);
});
