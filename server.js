const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...')
  console.log(err.name, err.message);
  process.exit(1)
  
})

dotenv.config({ path: './config.env' });

const app = require('./app');
console.log(process.env.NODE_ENV);

//Connecting to DB
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB connection successful!');
  });

//Server
const port = 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down...')
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1)
  })
})
