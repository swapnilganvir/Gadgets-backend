import express from 'express';
import 'dotenv/config';
import gadgetRouter from './routes/gadgetRouter.js';

// app config
const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());

// api endpoints
app.use('/gadgets', gadgetRouter);

app.get('/', async (req, res) => {
  res.send('API Working');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
