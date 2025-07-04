import express from 'express';
import fetch from 'node-fetch';

import env from './config/env.js';
import logger from './config/logger.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/proxy', async (req, res) => {
  const { targetUrl } = req.query;

  if (!targetUrl) {
    logger.error('Error processing \'/proxy\' request', new Error('Failed to parse target URL from request'));
    return res.status(400).json({ error: 'Internal Server Error: Target URL is required' });
  }

  const { method, headers, body } = req;

  // Clean headers
  delete headers['host'];
  delete headers['cookie'];
  delete headers['content-length'];

  // Custom headers
  const newHeaders = {
    ...headers,
    authorization: `Bearer ${env.AUTH_TOKEN}`,
    'content-type': 'application/json',
  };

  try {
    const response = await fetch(targetUrl, {
      method,
      headers: newHeaders,
      body: method !== 'GET' && method !== 'HEAD' ? JSON.stringify(body) : undefined,
      redirect: 'follow',
    });

    // Forward response
    res.status(response.status);
    response.headers.forEach((value, name) => res.setHeader(name, value));

    const data = await response.text();

    res.send(data);
  } catch (error) {
    logger.error('Error in lightweight proxy', error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

app.listen(env.PORT, () => {
  logger.info('Proxy service started', {
    port: env.PORT,
    environment: env.NODE_ENV
  });
});

