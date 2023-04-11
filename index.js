/* eslint-disable no-console */
import express from 'express';
import plugins from './plugins/index.js';
import 'dotenv/config';

const app = express();

await plugins({ app });

// Global Error Handler
app.use((err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const server = app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server running on port : ${process.env.PORT}`);
});

export default server;
