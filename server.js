/*global chrome*/
const express = require('express');
const axios = require('axios');
const { PythonShell } = require('python-shell');
const cors = require('cors'); 

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// API endpoint for scraping
app.post('/scrape', async (req, res) => {
  try {
    const { url } = req.body; //'https://www.notino.ro/*' or any other notino website

    const pythonScriptPath = 'scrape-script.py';

    // Set up the PythonShell with the script path and arguments
    const pyshell = new PythonShell(pythonScriptPath, { args: [url] });

    // Handle Python script output
    pyshell.on('message', (message) => {
      // Parse the scraped data from the Python script output
      const scrapedData = JSON.parse(message);

      res.json(scrapedData);
    });

    // Handle Python script errors
    pyshell.on('error', (error) => {
      console.error('Error scraping:', error);
      res.status(500).json({ error: 'An error occurred while scraping the website.' });
    });

    pyshell.end();
  } catch (error) {
    console.error('Error scraping:', error);
    res.status(500).json({ error: 'An error occurred while scraping the website.' });
  }
});

// Handle root URL
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
