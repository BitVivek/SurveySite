import express from 'express';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import shopRoutes from './routes/shop.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import surveyRoutes from './routes/survey.routes.js'; // Import survey routes
import questionRoutes from './routes/question.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// Survey routes
app.use('/', surveyRoutes);

// Other routes
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', shopRoutes);
app.use('/', productRoutes);
app.use('/', orderRoutes);
app.use('/', surveyRoutes);
app.use('/', questionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error": err.name + ": " + err.message});
  } else if (err) {
    res.status(400).json({"error": err.name + ": " + err.message});
    console.log(err);
  } 
});

export default app;
