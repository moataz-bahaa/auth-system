import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import authRoutes from './features/auth/auth.routes.js';
import errorHandler from './midlewares/error-handler.js';

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
  })
);

// routes
app.use('/api/auth', authRoutes);

// error handler
app.use(errorHandler);

const port = process.env.PORT || 5000;

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`server is running on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
